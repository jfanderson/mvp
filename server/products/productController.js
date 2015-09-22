var request = require('request');
var Q = require('q');
var Product = require('./productModel.js');
var api = require('../config.js');

module.exports = {
  getProducts: function (req, res, next) {
    var url = 'https://' + api.key + ':' + api.pw + '@' + api.domain + '/admin/products.json';
    
    // make GET request to shopify for all products
    request(url, function (error, response, body) {
      if (error) {
        console.log('Error getting products: ', error);
      }
      
      // promisify Mongo findOne and create functions
      var findProduct = Q.nbind(Product.findOne, Product);
      var createProduct = Q.nbind(Product.create, Product);

      JSON.parse(body).forEach(function (product) {
        findProduct({title: product.title})
          .then(function (match) {
            if (match) {
              // if product already in db, then update quantity
              match.quantity = product.variants[0].inventory_quantity;
            } else {
              // if product not in db, then insert it into db
              var newProduct = {
                _id: product.id,
                title: product.title,
                quantity: product.variants[0].inventory_quantity,
                variant_id: product.variants[0].id,
                created_at: product.created_at
              };

              return createProduct(newProduct);
            }
          })
          .then(function() {
            // send all products back in response
            
          })
          .catch (function(error) {
            if (error) {
              console.log('Error updating db: ', error);
            }
          });
      });
    });
  } 
  
};
