const { ref, uploadBytes } = require('firebase/storage');
const { validationResult } = require('express-validator');

// Model
const { Movie } = require('../models/movie.model');
const {
  ActorInMovie
} = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { storage } = require('../util/firebase');

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
      genre,
      actors
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsg = errors
        .array()
        .map(({ msg }) => msg)
        .join('. ');
      return next(new AppError(400, errorMsg));
    }
    // Upload img to firebase
    const fileExtension =
      req.file.originalname.split('.')[1];

    const imgRef = ref(
      storage,
      `imgs/movies/${title}-${Date.now()}.${fileExtension}`
    );

    const imgUploaded = await uploadBytes(
      imgRef,
      req.file.buffer
    );

    const newMovie = await Movie.create({
      title,
      description,
      duration,
      rating,
      img: imgUploaded.metadata.fullPath,
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
