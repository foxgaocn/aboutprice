angular.module('myodControllers')
  .controller('PackageCtrl', ['$scope', '$window', 'PackageService', '$modalInstance', 'info',
    function($scope, $window, PackageService, $modalInstance, info) {
      $scope.items = info.items;
      $scope.package = {client_id: info.client_id};
      $scope.package.items = [];

      PackageService.next_label({client_id: info.client_id}, function(data){
        $scope.package.label = data.label;
        $scope.package.number = data.number;
      });
      //initialize the bought item list and construct the value list for html select
      for (var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].values = [];
        for(j = 0; j<=$scope.items[i].quantity; j++){$scope.items[i].values.push(j)}
        $scope.package.items[i] = {id: $scope.items[i].id, quantity: $scope.items[i].quantity}
      };

      $scope.ok = function ($event) {
        var form = $('#package-form');
        if(form.hasClass('ng-invalid')){
          $window.alert('数据有误，请核对')
          return;
        };
        PackageService.save({package: $scope.package},
          function(){
            $modalInstance.close();
          }, function(){
            $window.alert('抱歉，出错了');
          });

        
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);