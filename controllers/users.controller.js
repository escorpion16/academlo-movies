// Utils
const { catchAsync } = require('../util/catchAsync');
const { User } = require('../models/user.model');

exports.getAllUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getUserById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id, status: 'active' }
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Cant user found, invalid ID'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.createNewUser = catchAsync(() => {});

exports.updateUser = catchAsync(() => {});

exports.deleteUser = catchAsync(() => {});
