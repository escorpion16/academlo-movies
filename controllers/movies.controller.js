// Model
const { Movie } = require('../models/movie.model');
const {
  ActorInMovie
} = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllMovies = catchAsync(
  async (req, res, next) => {
    const movies = await Movie.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'success',
      data: { movies }
    });
  }
);

exports.getMoviesById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const movie = await movies.findOne({
      where: { id, status: 'active' }
    });

    if (!movie) {
      return next(new AppError(404, 'Not found movie'));
    }

    res.status(200).json({
      status: 'success',
      data: {}
    });
  }
);

exports.createNewMovie = catchAsync(
  async (req, res, next) => {
    const {
      title,
      description,
      duration,
      rating,
      img,
      genre,
      actors
    } = req.body;

    const newMovie = await Movie.create({
      title,
      description,
      duration,
      rating,
      img: 'img.png',
      genre
    });

    const actorsInMoviesPromises = actors.map(
      async (actorId) => {
        return await ActorInMovie.create({
          actorId,
          movieId: newMovie.id
        });
      }
    );

    await Promise.all(actorsInMoviesPromises);

    res.status(200).json({
      status: 'success',
      data: { newMovie }
    });
  }
);

exports.updateMovie = catchAsync(
  async (req, res, next) => {}
);

exports.deleteMovie = catchAsync(
  async (req, res, next) => {}
);
