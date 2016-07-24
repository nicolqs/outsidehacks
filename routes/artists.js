var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Artist.findAll(
    {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: models.Stage,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })
  .then(function(artists) {
    if (artists) {
      res.json({ 'artists': artists });
    }
  });
});

router.get('/:artistId', function(req, res, next) {
  models.Artist.findAll(
    {
      where: { 'id' : req.params.artistId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: models.Stage,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })
  .then(function(artist) {
    if (artist && artist[0] != undefined) {
      res.json({ 'artist': artist });
    } else {
      res.status(404).send({"success": false, "data": { "message": 'Artist not found' }});
    }
  });
});


module.exports = router;
