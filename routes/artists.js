var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Artist.findAll(
    {
      attributes:
        { exclude: ['createdAt', 'updatedAt'] },
        // [sequelize.fn('date_format', sequelize.col('startTime'), '%Y-%m-%d'), 'startTime']
    })
  .then(function(artists) {
    if (artists) {
      res.json({ 'artists': artists });
    }
    console.log('error');
  });
});

module.exports = router;
