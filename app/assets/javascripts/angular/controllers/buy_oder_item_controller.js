angular.module('myodControllers')
  .controller('BuyOrderItemCtrl', ['$scope', '$window', 'OrderService', '$modalInstance', 'details',
    function($scope, $window, OrderService, $modalInstance, details) {
      $scope.details = details;
      $scope.bought = [];
      //initialize the bought item list and construct the value list for html select
      for (var i = 0; i < details.length; i++) {
        $scope.details[i].values = [];
        for(j = 0; j<=$scope.details[i].item_quantity; j++){$scope.details[i].values.push(j)}
        $scope.bought[i] = {item_id: details[i].item_id, quantity: details[i].item_quantity}
      };

      $scope.ok = function ($event) {
        var form = $('#bought-form');
        if(form.hasClass('ng-invalid')){
          $window.alert('数据有误，请核对')
          return;
        }
        OrderService.bought({bought: $scope.bought},
          function(){
            $modalInstance.close($scope.bought);
          }, function(){
            $window.alert('抱歉，出错了');
          });

        
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


      $scope.$watch(
        function() { 
          return $scope.bought[0].buy_price 
        },function(newValue, oldValue) {
          for(i = 1; i<$scope.bought.length; i++){
            if($scope.bought[i].buy_price == oldValue || $scope.bought[i].buy_price == undefined){
              $scope.bought[i].buy_price = newValue;
            }
          }
        }
      );
  }]);