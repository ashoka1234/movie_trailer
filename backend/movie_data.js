// NodeJS module dependencies
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var events = require('events');

// module exports needed to be executed everytime itis called
// and therefore we pass functions as exports
module.exports.getMovieData = function(genre, count) {

  // URL to mongodb database that hold movie information
  var dburl = 'mongodb://localhost:27017/movie_titles';

  // a function that connects to the mongodb collection and once query results
  // are received format the movie page and indicate that results are ready
  // via callback
  var getDataFromDatabase = function(db, mgenre, callback) {
    // Get the collection
    var col = db.collection('movies');
    // If genre is random we send animation movies for time being
    if (mgenre === 'recommended') {
      mgenre = "animation";
    };
    // Find movies of particular genre
    col.find({genre:mgenre}).limit(2).toArray(function(err, docs) {
      // if err stop here
      assert.equal(null, err);
      // movie page is ready and therefore call callback
      callback(docs);
    });
  }

  return new Promise((resolve,reject) => {
    // Use connect method to connect to the mongodb server
    MongoClient.connect(dburl, {native_parser:true}, function(err, db) {
      // if database connection fails execute reject callback
      if (err) {
        console.log(`Database connection error in movie_data.js: ${err}`);
        reject(err);
      };
      console.log("Connected successfully to database server in movie_data.js");
      // database is connected and now ready to construct HTML movie page
      // once result page is ready resolve callback is called to finalise the
      // http reqest
      getDataFromDatabase(db, genre, function(result) {
        resolve(result);
      });
    });
  });
}
