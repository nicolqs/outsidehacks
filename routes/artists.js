var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Artist.findAll(
    {
      attributes:
        { exclude: ['createdAt', 'updatedAt'] },
    })
  .then(function(artists) {
    if (artists) {
      res.json({ 'artists': artists });
    }
  });
});

module.exports = router;
