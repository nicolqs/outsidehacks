
var json = fs.readFileSync(__dirname + '/../data/artists.json', 'utf8');
var artists = JSON.parse(json);
console.log(artists);
artists.forEach(function (item) {
  Artist.create(
    {
      'name' : item.name,
      'spotifyId' : item.spotifyID
    }
  ).then(function(createdArtist) {
     console.log('name ' + item.name + ' inserted!');
  });
})
