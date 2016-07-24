var express = require('express');
var router = express.Router();

/* Database */
var Sequelize = require('sequelize');
var models    = require('../models');

/* GET home page. */
router.post('/:songId', function(req, res, next) {
  var songId = Math.abs(req.params.songId); // absolute int

  if (songId) {
    /* @TODO Need to implement the User verification check before couting vote in */

    models.Vote.create(
      {
        'userId' : Math.ceil(Math.random()*100), // random userId for now
        'songId' : songId
      }
    ).then(function(createdVote) {
       console.log('vote for song ' + songId + ' inserted!');
       res.status(201).send();
    });
  } else {
    res.status(400).send({"success": false, "data": { "message": 'Missing song ID' }});
  }
});

module.exports = router;
