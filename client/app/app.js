angular.module('reinvent', [
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/products', {
      templateUrl: 'app/products/products.html',
      controller: 'ProductsCtrl'
    })
    .otherwise({
      redirectTO: '/products'
    });
});
