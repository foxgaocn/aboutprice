angular.module('myodControllers')
  .controller('ReportCtrl', ['$scope', '$window', '$modal','OrderService',
    function($scope, $window, $modal, OrderService) {
      $scope.title = "财务报表"

  }]);