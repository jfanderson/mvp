var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var api = require('./config');

var app = express();

mongoose.connect('mongodb://localhost/reinvent');

// all routing for the app
require('./middleware.js')(app, express);

app.listen(8000);
console.log('Server listening on port 8000...');
