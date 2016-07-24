'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var request   = require('request');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

/*
 * All models
 */
var Artist = sequelize.define('artist', {
  name: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  }
});

var Song = sequelize.define('song', {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

var Stage = sequelize.define('stage', {
  name: {
    type: Sequelize.STRING
  }
});

var Vote = sequelize.define('vote', {
  userId: {
    type: Sequelize.INTEGER
  }
});

/*
 * Models relationships
 */
Artist.belongsTo(Stage); // eager loading
Stage.hasMany(Artist, {foreignKey: 'stageId'})

Song.belongsTo(Artist); // eager loading
Artist.hasMany(Song, {foreignKey: 'artistId'});

Vote.belongsTo(Song); // eager loading
Song.hasMany(Vote, {foreignKey: 'songId'});

db['Artist'] = Artist;
db['Song'] = Song;
db['Stage'] = Stage;
db['Vote'] = Vote;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
