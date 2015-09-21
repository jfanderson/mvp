var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var api = require('./config');

var app = express();

mongoose.connect('mongodb://localhost/reinvent');

// route for testing shopify api and db
app.get('/', function(req, res) {
  var url = 'https://' + api.key + ':' + api.pw + '@' + api.domain + '/admin/products.json';
  
  request(url, function(err, response, body) {
    res.end(body);
  });
});

app.listen(8000);
console.log('Server listening on port 8000...');
