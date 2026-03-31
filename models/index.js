const sequelize = require('../config/db');
const User = require('./User');
const Tablero = require('./Tablero');
const Lista = require('./Lista');
const Tarjeta = require('./Tarjeta');

// Relaciones
User.hasMany(Tablero, { foreignKey: 'userId', onDelete: 'CASCADE' });
Tablero.belongsTo(User, { foreignKey: 'userId' });

Tablero.hasMany(Lista, { foreignKey: 'tableroId', onDelete: 'CASCADE' });
Lista.belongsTo(Tablero, { foreignKey: 'tableroId' });

Lista.hasMany(Tarjeta, { foreignKey: 'listaId', onDelete: 'CASCADE' });
Tarjeta.belongsTo(Lista, { foreignKey: 'listaId' });

module.exports = {
  sequelize,
  User,
  Tablero,
  Lista,
  Tarjeta
};