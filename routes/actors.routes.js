const express = require('express');

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const router = express.Router();

router.route('/').get(getAllUsers).post(createNewUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { actorsRouter: router };
