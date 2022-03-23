const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { process_params } = require('express/lib/router');

dotenv.config({ path: './config.env' });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.createNewUser = catchAsync(
  async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(
        new AppError(
          400,
          'Must provide a valid email and password'
        )
      );
    }

    const newUser = await User.create({
      username,
      email,
      password
    });

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { newUser }
    });
  }
);

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // find user given an email and has status active
  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  // Compare ented password vs hashed password
  if (
    !user ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return next(
      new AppError(400, 'Credentials are invalid')
    );
  }

  // Create JWT
  const token = await jwt.sign(
    { id: user.id }, // token payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: process.env.JWT_EXPIRED_IN }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
