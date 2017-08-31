var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var dburl = 'mongodb://localhost:27017/movie_titles';
// Use connect method to connect to the server
MongoClient.connect(dburl, function(err, db) {
  // if database failed to connect stop here
  assert.equal(null, err);
  console.log("Connected successfully to server");

  // Lets do some clean up tasks of the database
  db.collection('movies').deleteMany({genre:"animation"}, function(err, r) {
    assert.equal(null, err);
  });
  db.collection('movies').deleteMany({genre:"scifi"}, function(err, r) {
    assert.equal(null, err);
  });

  // Add entries
  db.collection('movies').insertMany([{
    "title" : "emoji movie",
    "genre" : "animation",
    "poster_image_url" : "Emoji-movie-poster.jpg",
    "youtube_url" : "https://www.youtube.com/watch?v=o_nfdzMhmrA"
  }, {
    "title" : "The Lion King",
    "genre" : "animation",
    "poster_image_url" : "Lion-king-poster.jpg",
    "youtube_url" : "https://www.youtube.com/watch?v=4sj1MT05lAA"
  }, {
    "title" : "The Matrix",
    "genre" : "scifi",
    "poster_image_url" : "The-Matrix-poster.jpg",
    "youtube_url" : "https://www.youtube.com/watch?v=vKQi3bBA1y8"
  }, {
    "title" : "Star Wars: The Last Jedi",
    "genre" : "scifi",
    "poster_image_url" : "star-wars-last-jedi.jpg",
    "youtube_url" : "https://www.youtube.com/watch?v=zB4I68XVPzQ"
  }], function(err, r) {
    assert.equal(null, err);
    console.log("All done");
    db.close();
  });
});
