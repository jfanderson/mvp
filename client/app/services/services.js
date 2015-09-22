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

  return {
    getAll: getAll
  };
});
