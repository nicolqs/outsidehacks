"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define('artist', {
    name: {
      type: Sequelize.STRING
    },
    spotifyID: {
      type: Sequelize.STRING
    }
  });

  return Artist;
};