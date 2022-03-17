const express = require('express');

const {
  getAllMovies,
  getMoviesById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMoviesById);

router.post('/', createNewMovie);

router.patch('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
