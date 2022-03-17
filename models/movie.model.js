const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Movie = sequelize.define('movie', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Movie };
