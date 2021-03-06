const { sequelize } = require('../util/database');
const { DataTypes } = require('sequelize');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Actor };
