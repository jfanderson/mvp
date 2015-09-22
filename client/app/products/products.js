angular.module('reinvent.products', [])
  
.controller('ProductsCtrl', function($scope, Products) {
  $scope.data = {};

  $scope.getProducts = function() {
    Products.getAll().then(function(data) {
      $scope.data.products = data;
    });
  };

  $scope.getProducts();
  setInterval($scope.getProducts.bind(this), 3000);
});
