var async = require('async');
var request = require('request');
var Q = require('q');
var Product = require('./productModel.js');
var api = require('../config.js');

// promisify Mongoose findOne function
var findProduct = Q.nbind(Product.findOne, Product);

module.exports = {

  getProducts: function(req, res, next) {
    /*  
    *   Update db with quantity changes and new products, based on info
    *   from Shopify GET request. Respond with list of products.
    */
    var url = 'https://' + api.key + ':' + api.pw + '@' + api.domain + '/admin/products.json';
    
    // make GET request to shopify for all products
    request(url, function(error, response, body) {
      if (error) {
        console.log('Error getting products from shopify: ', error);
      }
          
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
                product_type: product.product_type,
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
  },

  updateInventory: function(req, res, next) {
    /*
    *  Send PUT request to shopify API to update product quantity in store
    */
    console.log(req.body);
    var url = 'https://' + api.key + ':' + api.pw + '@' + api.domain +
              '/admin/variant/' + req.body.id + '.json';
    var id = req.body.id;
    var changeAmount = req.body.num;

    request({
      url: url,
      method: 'PUT',
      json: {
        "variant": {
            "id": id,
            "inventory_quantity_adjustment": changeAmount
        }
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error in PUT to Shopify API', error);
      }

      findProduct({_id: id})
        .then(function(match) {
          match.quantity += changeAmount;
          match.save(function() {
            res.sendStatus(204);
          });
        })
        .catch(function(error) {
          if (error) {
            console.log('Error finding product after PUT request', error);
          }
        });
    });
  }
};
