// Artists
var json = fs.readFileSync(__dirname + '/../data/artists.json', 'utf8');
var artists = JSON.parse(json);
artists.forEach(function (item) {
  request('https://api.spotify.com/v1/artists/' + item.spotifyId, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body)
      var data = JSON.parse(body);
      var imageUrl;

      if (data.images[1] == undefined) { // fallback URL
        imageUrl = 'http://4.bp.blogspot.com/-HexAc5BkACA/UITppjQqdXI/AAAAAAAAAUU/i3C3DWHVveY/s1600/artist-placeholder.gif';
      } else {
        imageUrl = data.images[1].url;
      }

      Artist.create(
        {
          'name' : item.name,
          'spotifyId' : item.spotifyId,
          'imageUrl' : imageUrl,
          'stageId' : item.stageId,
          'startTime' : new Date(item.startTime.replace('T', ' ')),
          'endTime' : new Date(item.endTime.replace('T', ' '))
        }
      ).then(function(createdArtist) {
         console.log('name ' + item.name + ' inserted!');
      });
    }
  })
});

// Top Songs
Artist.findAll({attributes:{exclude: ['createdAt', 'updatedAt'] }})
.then(function(artists) {
  if (artists) {
    artists.forEach(function (artist) {
      request('https://api.spotify.com/v1/artists/' + artist.spotifyId + '/top-tracks?country=US', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          var tracks = data.tracks;
          var imageUrl;

          tracks.forEach(function (song) {
            if (song.album.images[0] == undefined) { // fallback URL
              imageUrl = 'http://geniusmindsystem.org/music_portal/movies/album-placeholder.png';
            } else {
              imageUrl = song.album.images[0].url;
            }

            Song.create(
              {
                'name' : song.name,
                'imageUrl' : imageUrl,
                'artistId' : artist.id
              }
            ).then(function(createdSong) {
               console.log('name ' + song.name + ' inserted!');
            });
          });
        }
      });
    });
  }
});

// Stages
var json = fs.readFileSync(__dirname + '/../data/stages.json', 'utf8');
var stages = JSON.parse(json);
stages.forEach(function (item) {
  Stage.create(
    {
      'name' : item.name,
    }
  ).then(function(createdArtist) {
     console.log('stage name ' + item.name + ' inserted!');
  });
})
