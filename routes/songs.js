var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Song.findAll(
    {
      attributes:
        { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: models.Artist,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
    })
  .then(function(songs) {
    if (songs) {
      res.json({ 'songs': songs });
    }
  });
});

router.get('/:artistId', function(req, res, next) {
  models.Song.findAll(
    {
      where: { 'artistId' : req.params.artistId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: models.Artist,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })
  .then(function(songs) {
    if (songs && songs[0] != undefined) {
      res.json({ 'songs': songs });
    } else {
      res.status(400).send({"success": false, "data": { "message": 'Songs from that artist ID does not exist' }});
    }
  });
});

module.exports = router;
