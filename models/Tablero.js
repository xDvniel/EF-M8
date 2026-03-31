const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tablero = sequelize.define('Tablero', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Tablero;