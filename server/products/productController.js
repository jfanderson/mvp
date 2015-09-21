
module.exports = {
  getProducts: function(req, res, next) {
    var url = 'https://' + api.key + ':' + api.pw + '@' + api.domain + '/admin/products.json';
    
    request(url, function(err, response, body) {
      if (err) {
        console.log('Error getting products: ', err);
      }
      res.send(body);
    });
  } 
  
};
