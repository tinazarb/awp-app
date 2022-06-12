//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Photo = require('./models/Photo');
const Favorites = './models/Favorites';

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Photo,
    Favorites,
  },
};
