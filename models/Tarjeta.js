const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tarjeta = sequelize.define('Tarjeta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Tarjeta;