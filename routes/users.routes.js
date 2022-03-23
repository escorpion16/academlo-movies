const express = require('express');

const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser
} = require('../controllers/users.controller');

// Middlewares
const {
  validateSession
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', createNewUser);

router.patch('/login', loginUser);

module.exports = { usersRouter: router };
