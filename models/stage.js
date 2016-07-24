"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Stage = sequelize.define('stage', {
    name: {
      type: Sequelize.STRING
    }
  });

  return Stage;
};