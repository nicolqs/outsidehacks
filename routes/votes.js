var express = require('express');
var router = express.Router();

/* Database */
var Sequelize = require('sequelize');
var models    = require('../models');

/* GET */
router.get('/most_voted', function(req, res, next) {
  models.Vote.findAll({
    attributes: [[models.sequelize.fn('COUNT', 'songId'), 'voteCount']],
    group: 'songId',
    order: 'voteCount DESC',
    include: [
       {
        model: models.Song,
        required: true,
        include: [
          {
            model: models.Artist,
            attributes: { exclude: ['createdAt', 'updatedAt', 'stageId'] },
            include: [
              {
                model: models.Stage,
                attributes: { exclude: ['createdAt', 'updatedAt', 'stageId'] },
              }
            ]
          }
        ]
      }
    ]
  }).then(function(songs) {
    res.json({ 'votes': songs });
  });
});

router.get('/my', function(req, res, next) {

    /* @TODO Need to implement the User verification check (auth token) before couting vote in */
    token = true;
    userId = 75; // hardcoded, out of time :/

    if (token) {
      models.Vote.findAll(
        {
          where: { 'userId' : userId },
          attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'userId'] }
        }
      ).then(function(votes) {
        var songs = [];
        votes.forEach(function(vote) {
          songs.push(vote.songId)
        });

        models.Song.findAll(
          {
            where: { 'id' : songs },
            attributes: { exclude: ['createdAt', 'updatedAt', 'artistId'] },
            include: [
              {
                model: models.Artist,
                attributes: { exclude: ['createdAt', 'updatedAt', 'stageId'] },
                include: [
                  {
                    model: models.Stage,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'stageId'] },
                  }
                ]
              }
            ]
          }
        ).then(function(songs) {
          res.json({ 'songs': songs });
        });
      });
    }
});

/* POST */
router.post('/:songId', function(req, res, next) {
  var songId = Math.abs(req.params.songId); // absolute int

  /* @TODO Need to implement the User verification check (auth token) before couting vote in */
  token = true;
  userId = 75; // hardcoded, out of time :/

  if (songId < 803 && token && songId) {
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
