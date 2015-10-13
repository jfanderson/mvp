angular.module('reinvent.services', [])

.factory('Products', function($http) {
  // retrieve product info from server
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/products'
    })
    .then(function(res) {
      return res.data;
    });
  };

  // update product quantity on server
  var changeQuantity = function(id, num) {
    return $http({
      method: 'PUT',
      url: '/products',
      data: {
        id: id,
        num: num
      }
    });
  };

  return {
    getAll: getAll,
    changeQuantity: changeQuantity
  };
});
