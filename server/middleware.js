var products = require('./products/productRoutes.js');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express) {

  app.use(morgan('dev')); // request logging
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  // only one route for now, can easily add more in future
  app.use('/products', products);
};
