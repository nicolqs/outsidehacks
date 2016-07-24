'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

var Artist = sequelize.define('artist', {
  name: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  }
});

var Song = sequelize.define('song', {
    name: {
    type: Sequelize.STRING
  }
});

Song.belongsTo(Artist); // eager loading
Artist.hasMany(Song, {foreignKey: 'artistId'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
