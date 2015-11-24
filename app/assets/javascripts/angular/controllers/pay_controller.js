angular.module('myodControllers')
  .controller('PayCtrl', ['$scope', '$window', '$modal','PackageService',
    function($scope, $window, $modal, PackageService) {
      $scope.title = '待收款'
      $scope.hide_item_details = []
      $scope.text = ''
      PackageService.get({status: 0}, function(data){
        $scope.packages = data;
        for(var i = 0; i<data.length; i++) {$scope.hide_item_details.push(true)}
        $scope.text = $scope.packages.length == 0 ? '没有待收款项' : '';
      });
      //sample data structure
      // $scope.packages = 
      //   [{id: 2, label: '王宝强-0001', total_amount: 12, items:
      //     [{name: 'affd', quantity: 1, sale_price:'23人民币'},
      //      {name: 'bbbb', quantity: 4, sale_price: '35人民币'}]
      //    },
      //    {id: 2, label: '王宝强-0001', total_amount: 24, items:
      //     [{name: 'affd', quantity: 1, sale_price:'23人民币'},
      //      {name: 'bbbb', quantity: 4, sale_price: '35人民币'}]
      //    }];


      $scope.hide_details = function(index){
        $scope.hide_item_details[index] = true;
      }

      $scope.show_details = function(index){
        $scope.hide_item_details[index] = false;
      };

      $scope.paid = function(index){
        PackageService.paid({id: $scope.packages[index].id}, function(){
          $scope.packages.splice(index, 1);
          $scope.hide_item_details.splice(index, 1);
          $scope.text = $scope.packages.length == 0 ? '没有待收款项' : '';
        }, function(){
          $window.alert('对不起，出错了')
        })
      }


  }]);
