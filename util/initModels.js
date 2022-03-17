//Models
const { Actor } = require('../models/actor.model');
const {
  ActorInMovie
} = require('../models/actorInMovie.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

const initModels = () => {
  // 1 User --> M Review
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 Movie --> M ActorInMovie
  Movie.hasMany(ActorInMovie);
  ActorInMovie.belongsTo(Movie);

  // 1 ActorInMovie--> M Movie
  ActorInMovie.hasMany(Movie);
  Movie.belongsTo(ActorInMovie);

  // 1 Movie --> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);
};
