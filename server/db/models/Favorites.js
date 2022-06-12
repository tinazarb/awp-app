const Sequelize = require('sequelize');
const db = require('../db');

const Favorites = db.define('favorites', {
  quantity: {
    type: Sequelize.INTEGER,
    default: 1,
  },
});

module.exports = Favorites;
