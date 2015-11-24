angular.module('myodControllers')
  .controller('EditOrderCtrl', ['$scope', '$window', 'OrderService', 'PriceUnits', '$modalInstance','order_id',
    function($scope, $window, OrderService, PriceUnits, $modalInstance, order_id) {
      OrderService.get_order({id: order_id}, function(data){
        $scope.order = data;
      })

      $scope.getPriceUnit = function(code){
        if(code == undefined) {return}
        return PriceUnits.filter(function(p){return p.code == code})[0].title;
      }

      $scope.ok = function ($event) {
        var form = $('#edit-order');
        if(form.hasClass('ng-invalid')){
          $window.alert('请输入正确数据')
          return;
        }
        OrderService.update({id: order_id}, {order_item: $scope.order}, 
          function(data) {
            $modalInstance.close(data);
          }, 
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
          );
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.delete = function () {
        var r = $window.confirm("确定要删除吗");
        if(!r) { return; }
        $scope.order.quantity = 0;
        OrderService.update({id: order_id}, {order_item: $scope.order}, 
          function(data) {
            $modalInstance.close(data);
          }, 
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
        );
      };
    }
  ])
