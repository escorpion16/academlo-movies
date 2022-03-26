const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

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
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});

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
  const { user } = req;

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.createNewUser = catchAsync(
  async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return next(
        new AppError(
          400,
          'Must provide a valid email and password'
        )
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { newUser }
    });
  }
);

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { email, username } = req.body;

  await user.update({ username, email });

  res.status(204).json({
    status: 'success'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'deleted' });

  res.status(204).json({
    status: 'success'
  });
});
