var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Song.findAll(
    {
      attributes:
        { exclude: ['createdAt', 'updatedAt'] },
    })
  .then(function(songs) {
    if (songs) {
      res.json({ 'songs': songs });
    }
    console.log('error');
  });
});

router.get('/:artistId', function(req, res, next) {
  models.Song.findAll(
    {
      where: { 'artistId' : req.params.artistId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
  .then(function(songs) {
    if (songs) {
      res.json({ 'songs': songs });
    }
    console.log('error');
  });
});

module.exports = router;
