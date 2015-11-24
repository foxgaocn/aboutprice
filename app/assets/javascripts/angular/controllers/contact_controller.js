angular.module('myodControllers')
  .controller('ContactCtrl', ['$scope', '$window', '$modal','OrderService',
    function($scope, $window, $modal, OrderService) {
      $scope.title = "联系我们"

  }]);