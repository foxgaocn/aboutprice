angular.module('myodControllers')
  .controller('ClientManagerCtrl', ['$scope', '$window', '$modal', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.title = '客户管理'

      ClientService.info(function(data){
        $scope.clients = data;
      });


      $scope.newClient = function(){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/create_client',
          controller: 'CreateClientCtrl',
          size: 'lg',
          resolve:  {
            id: function () { return undefined;}
          }
        });

        modalInstance.result.then(function (newClient) {
            $scope.clients.push({name: newClient.name, id: newClient.id, price_unit_string: newClient.price_unit_string})
            }, function () {}
        );
      };

      $scope.editClient = function(id){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/create_client',
          controller: 'CreateClientCtrl',
          size: 'lg',
          resolve:  {
            id: function () { return id;}
          }
        });

        modalInstance.result.then(function (newClient) {
            $scope.clients.push({name: newClient.name, id: newClient.id, price_unit_string: newClient.price_unit_string})
            }, function () {}
        );
      }

  }]);