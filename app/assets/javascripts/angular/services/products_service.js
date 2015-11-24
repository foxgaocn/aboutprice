angular.module('myodServices').factory('ProductService', ['$resource', function($resource){
  return $resource('/products/suggestions.json', {},{
    suggestions: { method: 'GET', isArray: true }
  })
}]);