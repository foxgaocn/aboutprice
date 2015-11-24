angular.module('myodServices').factory('OrderService', ['$resource', function($resource){
  return $resource('/order_items.json', {},{
    save: { method: 'POST', headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} },
    bought: { method: 'PUT', url:'/order_items/bought.json',  headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}},
    to_be_purchased: { method: 'GET', url: 'order_items/to_be_purchased.json', isArray: true},
    to_be_delivered: { method: 'GET', url: 'order_items/to_be_delivered.json', isArray: true},
    get: {method: 'GET', isArray: true},
    get_order: {method: 'GET', url: 'order_items/:id.json', params: {id: '@id'}},
    update: {method: 'PUT', url: 'order_items/:id.json', params: {id: '@id'},  headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}},
  })
}]);