var express = require('express');
var mongoose = require('mongoose');

var app = express();

// setup mongo database
mongoose.connect('mongodb://localhost/reinvent');

// all routing for the app
require('./middleware.js')(app, express);

app.listen(8000);
console.log('Server listening on port 8000...');
