"use strict";

var Sequelize = require('sequelize');
var Artist = require('./artist');

module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('song', {
    name: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    }
  });

  return Song;
};