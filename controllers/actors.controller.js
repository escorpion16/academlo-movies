const { validationResult } = require('express-validator');
const {
  ref,
  uploadBytes,
  getDownloadURL
} = require('firebase/storage');

//Models
const { Actor } = require('../models/actor.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');
const { AppError } = require('../util/appError');
const { storage } = require('../util/firebase');

exports.getAllActors = catchAsync(async (req, res) => {
  const actors = await Actor.findAll({
    where: { status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: { actors }
  });
});

exports.getActorById = catchAsync(async (req, res) => {
  const { actor } = req;

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.createNewActor = catchAsync(async (req, res) => {
  const { name, country, rating, age } = req.body;

  // validate req.body
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');
    return next(new AppError(400, errorMsg));
  }

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now}.${fileExtension}`
  );
  const imgUploaded = await uploadBytes(
    imgRef,
    req.file.buffer
  );

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic: imgUploaded.metadata.fullPath
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});

exports.updateActor = catchAsync(async (req, res) => {
  const { actor } = req;

  const data = filterObj(
    req.body,
    'name',
    'country',
    'rating',
    'age'
  );

  await actor.update({ ...data });

  res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async (req, res) => {
  const { actor } = req;

  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
