angular.module('reinvent.services', [])

.factory('Products', function($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/products'
    })
    .then(function(res) {
      return res.data;
    });
  };

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
