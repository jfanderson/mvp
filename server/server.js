var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/reinvent');

// route for testing shopify api and db
app.get('/', function(req, res) {

});

app.listen(8000);
console.log('Server listening on port 8000...');