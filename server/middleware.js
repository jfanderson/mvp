var products = require('./products/productRoutes.js');
var morgan = require('morgan');

module.exports = function(app, express) {

  // app.use(morgan('dev')); // request logging
  app.use(express.static(__dirname + '/../client'));

  app.use('/products', products);
};
