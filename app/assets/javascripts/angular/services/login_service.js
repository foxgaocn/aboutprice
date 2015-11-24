angular.module('myodServices')
  .factory('LoginService', ['$resource', function($resource){
    return $resource('/users/sign_out.json', {},{
      delete: { method: 'DELETE', 
                headers:{'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')} 
              }
    })
}]);