angular.module('myodControllers')
  .controller('CreateClientCtrl', ['$scope', '$window', 'ClientService', 'PriceUnits', '$modalInstance', 'id',
    function($scope, $window, ClientService, PriceUnits, $modalInstance, id) {
      $scope.isEditing = (id != undefined)
      $scope.title = $scope.isEditing? "客户编辑" : "创建新客户"
      $scope.price_units = PriceUnits;
      if(id != undefined){
        ClientService.get({id: id}, function(data){
          $scope.client = data;
        });
      }
      else{
        $scope.client={price_unit: PriceUnits[2].code}  
      }

      
      $scope.ok = function ($event) {
        var form = $('#create_client_form');
        if(form.hasClass('ng-invalid')){
          $window.alert('请输入客户名')
          return;
        }
        if($scope.isEditing){
          ClientService.update({id: id}, {client: $scope.client}, 
          function(data) {
            $modalInstance.close(data);
          }, 
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
          );

        }else{
          ClientService.save({client: $scope.client}, 
          function(data) {
            $modalInstance.close(data);
          }, 
          function(error){$window.alert("出错了 " + JSON.stringify(error))} 
          );
        }    
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);