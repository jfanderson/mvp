angular.module('reinvent.products', [])
  
.controller('ProductsCtrl', function($scope, Products) {
  $scope.data = {};

  $scope.getProducts = function() {
    Products.getAll().then(function(data) {
      $scope.data.products = data;
    });
  };

  $scope.setProduct = function(id) {
    $scope.productToChange = id;
  };

  $scope.changeQuantity = function() {
    console.log($scope.productToChange);
    console.log($scope.amount);
  };

  $scope.getProducts();
});
