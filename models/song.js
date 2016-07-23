"use strict";

var Sequelize = require('sequelize');
var Artist = require('./artist');
console.log(Artist.associate);
module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('song', {
    name: {
      type: Sequelize.STRING
    },
    artistId: {
      type: Sequelize.INTEGER
    }
  });
  // Song.belongsTo(Artist); // eager loading
  Song.hasMany(Artist);

  return Song;
};