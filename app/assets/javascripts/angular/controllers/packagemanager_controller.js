angular.module('myodControllers')
  .controller('PackageManagerCtrl', ['$scope', '$window', '$modal', 'ClientService', 'PackageService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, ClientService, PackageService, OrderService, PackageStatus) {
      $scope.title = '包裹管理';
      $scope.hide_item_details = [];
      $scope.query = {date:1, status:0, client_id: -1}
      $scope.dates=[{code:1, title:"最近1月"},
                    {code:3, title:"最近3月"},
                    {code:6, title:"最近6月"},
                    {code:12, title:"最近1年"},
                    {code:-1, title:"所有"}];
      $scope.statuses=[{code:0, title:"未收款"},
                    {code:1, title:"已收款"},
                    {code:-1, title:"所有"}];

      ClientService.info(function(data){
        $scope.clients = data;
        $scope.clients.push({id: -1, name: '所有' })
      });


      PackageService.get($scope.query, function(data){
        $scope.packages = data;
        for(var i = 0; i<data.length; i++) {$scope.hide_item_details.push(true)}
        $scope.text = $scope.packages.length == 0 ? '没有符合条件的包裹' : '';
      });

      $scope.query_package = function(){
        PackageService.get($scope.query, function(data){
          $scope.packages = data;
          for(var i = 0; i<data.length; i++) {$scope.hide_item_details.push(true)}
          $scope.text = $scope.packages.length == 0 ? '没有符合条件的包裹' : '';
        });
      };

      $scope.getStatusString = function(statusCode){
        return PackageStatus.filter(function(p){return p.code == statusCode})[0].title
      }

      $scope.edit = function(id){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/view/edit_package',
          controller: 'EditPackageCtrl',
          size: 'lg',
          resolve: {
            id: function () {
              return id;
            }
          }
        });

        modalInstance.result.then(function() {}, function () {}
        );
      }

  }]);