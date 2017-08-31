const express = require('express')
const ms = express()
// backend root directory
const backend = "./backend";
// frontend root directory
const frontend = ".";

// NodeJS existing module dependencies
var fs = require('fs');

// NodeJS project module that access a mongodb database which stores
// movie infomation
const movie_data = require(`${backend}/movie_data`);

ms.get('/', function (req, res) {
  // This is the index HTML file
  let content = fs.readFileSync(`${frontend}/dist/index.html`);
  let type = 'text/html';
  res.writeHead(200, {'Content-Type': type});
  res.end(content);
})

ms.get('/index.html', function (req, res) {
  // This is the index HTML file
  let content = fs.readFileSync(`${frontend}/dist/index.html`);
  let type = 'text/html';
  res.writeHead(200, {'Content-Type': type});
  res.end(content);
})

ms.get('/*.js', function (req, res) {
  // This is the index HTML file
  console.log(req.url);
  let path = require('url').parse(req.url).pathname;
  let content = fs.readFileSync(`${frontend}/dist${path}`);
  let type = 'application/javascript';
  res.writeHead(200, {'Content-Type': type});
  res.end(content);
  console.log(req.url);
})

ms.get('/*.jpg', function (req, res) {
  // Process image file requests
  let imageFileMatch = req.url.match(/[\w-]+.jpg/);
  let imageFile = `${frontend}/dist/assets/${imageFileMatch[0]}`;
  let content = fs.readFileSync(imageFile);
  let type = 'image/jpeg';
  res.writeHead(200, {'Content-Type': type});
  res.end(content);
  console.log(req.url);
})

ms.get('/*.ico', function (req, res) {
  // Process ico file requests
  let imageFile = `${frontend}/dist/${req.url}`;
  let content = fs.readFileSync(imageFile);
  let type = 'image/x-icon';
  res.writeHead(200, {'Content-Type': type});
  res.end(content);
})

ms.get('/movies/:genre/:count', function (req, res) {
  let type = 'json';
  movie_data.getMovieData(req.params.genre, req.params.count).then(function(content) {
    // Complete the response when promise to title page is fulfilled
    let currenttime = Date.now();
    res.writeHead(200, {'Content-Type': type, 'timestamp': currenttime});
    res.end(JSON.stringify(content));
    console.log(req.url);
  }).catch(function(err) {
    console.log(`Movie data access error occured in movie_trailer_server.js: ${err}`);
  });
})

ms.get('/null', function(req, res) {
  res.writeHead(200, {'Content-Type': 'json'});
  res.end();
  console.log(req.url);
})

ms.listen(4200, function () {
  console.log('Media station listening on port http://127.0.0.1:4200/')
})
