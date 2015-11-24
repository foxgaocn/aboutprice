angular.module('myodControllers')
  .controller('BuyCtrl', ['$scope', '$window', '$modal','OrderService',
    function($scope, $window, $modal, OrderService) {
      $scope.title = '待购商品'
      OrderService.to_be_purchased(function(data){
        $scope.order_items = data;
        $scope.text = $scope.order_items.length == 0 ? '没有待购买商品,请先录入订单' : '';
      });
      //sample data structure
      // $scope.order_items = 
      //   [{product_id: 2, product_name: '成人奶粉', total: 4, details:
      //     [{item_id: 3, item_client: 'affd', item_quantity: 1, item_sale_price:'23人民币'},
      //      {item_id: 2, item_client: 'affd', item_quantity: 5, item_sale_price:'23人民币'}],
      //    },
      //    {product_id: 4, product_name: '羊奶皂', total: 6, details:
      //     [{item_id: 7, item_client: 'op', item_quantity: 4, item_sale_price:'23人民币'},
      //      {item_id: 8, item_client: 'ta', item_quantity: 8, item_sale_price:'23人民币'}],
      //    }]

      $scope.open_details = function(index){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/buy_order_item',
          controller: 'BuyOrderItemCtrl',
          size: 'lg',
          resolve: {
            details: function () {
              return $scope.order_items[index].details;
            }
          }
        });

        modalInstance.result.then(function (bought) {
          //re-fetch data. TBD: calculate it from front-end
          OrderService.to_be_purchased(function(data){
            $scope.order_items = data;
            $scope.text = $scope.order_items.length == 0 ? '没有待购买商品,请先录入订单' : '';
          });
          
          }, function () {}
        );
      }

  }]);
