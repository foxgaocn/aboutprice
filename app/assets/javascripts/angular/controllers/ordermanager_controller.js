angular.module('myodControllers')
  .controller('OrderManagerCtrl', ['$scope', '$window', '$modal', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.title = '订单管理'
      $scope.hideDetail = [];
      $scope.query = {date:1, status:1, client_id: -1}
      $scope.dates=[{code:1, title:"最近1月"},
                    {code:3, title:"最近3月"},
                    {code:6, title:"最近6月"},
                    {code:12, title:"最近1年"},
                    {code:-1, title:"所有"}];
      $scope.statuses=[{code:1, title:"未完成"},
                    {code:2, title:"已完成"},
                    {code:-1, title:"所有"}];

      ClientService.info(function(data){
        $scope.clients = data;
        $scope.clients.push({id: -1, name: '所有' })
      });

      OrderService.get($scope.query, function(data){
        $scope.data = data;
        for (var i = data.length - 1; i >= 0; i--) {
          $scope.hideDetail[i] = [];
          for (var j = data[i].main_items.length - 1; j >= 0; j--) {
            $scope.hideDetail[i][j] = true;
          };
        };
      });

      $scope.query_order = function(){
        OrderService.get($scope.query, function(data){
        $scope.data = data;
        for (var i = data.length - 1; i >= 0; i--) {
          $scope.hideDetail[i] = [];
          for (var j = data[i].main_items.length - 1; j >= 0; j--) {
            $scope.hideDetail[i][j] = true;};
          };
        });

      };

      $scope.toggleDetail = function(i,j){
        $scope.hideDetail[i][j] = false;
      }

      $scope.getStatusString = function(statusCode){
        return OrderItemStatus.filter(function(p){return p.code == statusCode})[0].title
      }

      $scope.edit = function(id, grouped_id, main_item_id, sub_item_id){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/edit_order',
          controller: 'EditOrderCtrl',
          size: 'lg',
          resolve: {
            order_id: function () {
              return id;
            }
          }
        });

        modalInstance.result.then(function (order_item) {
            var previousTotal = $scope.data[grouped_id].main_items[main_item_id].total_quantity;
            item = $scope.data[grouped_id].main_items[main_item_id];
            if(sub_item_id != undefined){item = item.subitems[sub_item_id]}
            var delta = item.quantity - order_item.quantity;
            item.quantity = order_item.quantity;
            $scope.data[grouped_id].main_items[main_item_id].total_quantity = previousTotal - delta;
            }, function () {}
        );
      }

  }]);