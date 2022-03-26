const express = require('express');

const {
  getAllMovies,
  getMoviesById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

const router = express.Router();

router.route('/').get(getAllMovies).post(createNewMovie);

router
  .route('/:id')
  .get(getMoviesById)
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = { moviesRouter: router };
