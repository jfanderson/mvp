var async = require('async');
var request = require('request');
var Q = require('q');
var Product = require('./productModel.js');
var api = require('../config.js');

module.exports = {
  getProducts: function(req, res, next) {
    var url = 'https://' + api.key + ':' + api.pw + '@' + api.domain + '/admin/products.json';
    
    // make GET request to shopify for all products
    request(url, function(error, response, body) {
      if (error) {
        console.log('Error getting products from shopify: ', error);
      }
    
      // promisify Mongoose findOne functions
      var findProduct = Q.nbind(Product.findOne, Product);
      
      var products = JSON.parse(body).products;

      async.each(products, function(product, callback) {
        findProduct({_id: product.id})
          .then(function(match) {
            if (match) {
              // if product already in db, then update quantity
              match.quantity = product.variants[0].inventory_quantity;
              match.save(function() {
                callback();
              });
            } else {
              // if product not in db, then insert it
              var newProduct = {
                _id: product.id,
                title: product.title,
                quantity: product.variants[0].inventory_quantity,
                variant_id: product.variants[0].id,
                created_at: product.created_at
              };

              Product.create(newProduct, function(error) {
                if (error) {
                  console.log('Error creating product: ', error);
                }
                callback();
              });
            }
          })
          .catch (function(error) {
            if (error) {
              console.log('Error updating single product entry: ', error);
            }
          });
      }, function(error) {
        if (error) {
          console.log('Error updating products: ', error);
        }

        // Once db updated, respond with list of products
        Product.find({}, function(error, result) {
          res.send(result);
        });        
      });
    });        
  } 
  
};
