var products = require('./products/productRoutes.js');

module.exports = function(app, express) {

  // app.use(express.static(__dirname + '/../client'));

  app.use('/products', products);
};
