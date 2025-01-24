const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Spreadsheet = sequelize.define('Spreadsheet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cells: {
    type: DataTypes.JSON, // Store cell data as JSON
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Spreadsheet;
