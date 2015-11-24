angular.module('myodControllers')
  .controller('SendCtrl', ['$scope', '$window', '$modal','OrderService',
    function($scope, $window, $modal, OrderService) {
      $scope.title = '待发货'
      OrderService.to_be_delivered(function(data){
        $scope.client_items = data;
        $scope.text = $scope.client_items.length == 0 ? '没有待发货商品' : '';
      });
      //sample data structure
      // $scope.client_items = 
      //   [{client_id: 2, client_name: '王宝强', package_id: '王宝强-0001', items:
      //     [{id: 3, product_name: 'karicare一段', quantity: 5},
      //      {id: 4, product_name: 'karicare二段', quantity: 1}]
      //    },
      //    {client_id: 5, client_name: '刘德华',package_id: '刘德华-0001', items:
      //     [{id: 3, product_name: 'karicare一段', quantity: 2},
      //      {id: 4, product_name: 'karicare三段', quantity: 5}],
      //    },]

      $scope.package = function(index){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/package',
          controller: 'PackageCtrl',
          size: 'lg',
          resolve: {
            info: function () {
              return $scope.client_items[index];
            }
          }
        });

        modalInstance.result.then(function () {
          //re-fetch data. TBD: calculate it from front-end
          OrderService.to_be_delivered(function(data){
            $scope.client_items = data;
            $scope.text = $scope.client_items.length == 0 ? '没有待发货商品' : '';
          });
          
          }, function () {}
        );
      }

  }]);
