//Models
const { Actor } = require('../models/actor.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObj');

exports.getAllActors = catchAsync(async (req, res) => {
  try {
    const actors = await Actor.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'success',
      data: { actors }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getAllActorById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const actor = await Actor.findOne({ where: { id } });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Actor not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        actor
      }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.createNewActor = catchAsync(async (req, res) => {
  try {
    const { name, country, age } = req.body;

    if (!name || !country || !age || !profilePic) {
      res.status(400).json({
        status: 'error',
        message:
          'MUst provide a valid name, country and age'
      });
      return;
    }

    const newActor = await Actor.create({
      name,
      country,
      age
    });

    res.status(201).json({
      status: 'success',
      data: { newActor }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.updateActor = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const data = filterObj(
      req.body,
      'name',
      'country',
      'age'
    );

    const actor = await Actor.findOne({
      where: { id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'success',
        message: 'Cant update actor, invalid ID'
      });
      return;
    }

    await actor.update({ ...data });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});

exports.deleteActor = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const actor = await Actor.findOne({
      where: { id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete actor, invalid ID'
      });
      return;
    }

    await actor.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});
