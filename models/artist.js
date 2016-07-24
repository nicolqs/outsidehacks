"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
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

  return Artist;
};