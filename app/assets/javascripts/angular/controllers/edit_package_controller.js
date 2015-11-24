angular.module('myodControllers')
  .controller('EditPackageCtrl', ['$scope', '$window', 'PackageStatus', 'PackageService', '$modalInstance', 'id',
    function($scope, $window, PackageStatus, PackageService, $modalInstance, id) {
      $scope.title = "包裹编辑";
      $scope.packageStatus = PackageStatus;
     
      PackageService.get_package({id: id}, function(data){
        $scope.package = data;
      });

      
      $scope.ok = function ($event) {
        var form = $('#edit_package_form');
        if(form.hasClass('ng-invalid')){
          $window.alert('错误的数据，请修改后再提交')
          return;
        }
        
        PackageService.update({id: id}, {package: $scope.package}, 
          function(data) {
            $modalInstance.close(data);
          }, 
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
        );
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);