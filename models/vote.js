"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('vote', {
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Vote;
};