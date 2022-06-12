const Sequelize = require('sequelize');
const db = require('../db');

const Photo = db.define('photo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://publicdelivery.org/wp-content/uploads/2019/08/Diane-Arbus-Identical-Twins-Roselle-New-Jersey-1967-teaser.jpg',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Photo;
