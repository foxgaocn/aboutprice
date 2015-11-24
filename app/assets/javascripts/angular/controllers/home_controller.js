angular.module('myodControllers')
  .controller('HomeCtrl', ['$scope', 'LoginService',
    function($scope, LoginService) {
      $scope.title = '代购本'
      
      $scope.signout = function(){
        LoginService.delete(function(){
          window.location='/'
        });
    }
  }]);