const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Lista = sequelize.define('Lista', {
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

module.exports = Lista;