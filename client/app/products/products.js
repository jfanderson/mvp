angular.module('reinvent.products', [])
  
.controller('ProductsCtrl', function($scope, Products) {
  $scope.data = {};

  $scope.getProducts = function() {
    Products.getAll().then(function(data) {
      $scope.data.products = data;
    });
  };

  $scope.changeQuantity = function(id, num) {
    Products.changeQuantity(id, num);

    _.find($scope.data.products, function(product) {
      return product._id === id;
    })
    .quantity += num;

    $scope.amount = 0;
  };

  $scope.getProducts();
});
