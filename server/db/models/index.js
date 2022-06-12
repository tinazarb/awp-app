const User = require('./User');
const Photo = require('./Photo');
const Favorites = require('./Favorites');

Favorites.belongsTo(Photo);
Photo.hasMany(Favorites);

Favorites.belongsTo(User);
User.hasOne(Favorites);

module.exports = {
  User,
  Photo,
  Favorites,
};
