var express = require('express');
var router = express.Router();

/* Database */
var Sequelize = require('sequelize');
var models    = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
