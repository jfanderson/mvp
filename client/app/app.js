angular.module('reinvent', [
  'reinvent.products',
  'reinvent.services',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/products', {
      templateUrl: 'app/products/products.html',
      controller: 'ProductsCtrl'
    })
    .otherwise({
      redirectTo: '/products'
    });
});
