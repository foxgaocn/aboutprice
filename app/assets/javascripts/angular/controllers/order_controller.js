angular.module('myodControllers')
  .controller('OrderCtrl', ['$scope', '$window', '$modal', '$http', 'ProductService', 'ClientService', 'OrderService', 'OrderItemStatus',
    function($scope, $window,  $modal, $http, ProductService, ClientService, OrderService, OrderItemStatus) {
      $scope.clients = [];
      $scope.order = {quantity: 1, status: OrderItemStatus[0].code};
      $scope.title = '订单录入'
      $scope.title_class='alert alert-info'

      ClientService.info(function(data){
        $scope.clients = data;
      });

      $scope.getProducts = function(typed){
        //return [{name:'fsda', id: 34}, {name: 'gggg', id: 23}]
        if(typed == undefined) typed='';

        value = typed.trim().toLowerCase();

        if(value.length < 1){
          return[];
        }

        return $http.get('/products/suggestions.json', {
          params: {typed: value}
        }).then(function(resp){
          return resp.data
        })
      };

      $scope.productSelected = function(item, model, label){
        $scope.order.product_name = item.name;
        $scope.order.product_id = item.id;
      }

      $scope.productChanged = function(event){
        $scope.order.product_id = undefined;
      }

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
            $scope.order.client_id = newClient.id;
            $scope.price_unit = newClient.price_unit_string
            }, function () {}
        );
      }

      $scope.submit = function($event){
        var form = $($($event.currentTarget).parents('form'));
        if(form.hasClass('ng-invalid')){
          $window.alert('数据有错误，请先核对数据')
          return;
        }
        
        OrderService.save({order_item: $scope.order}, 
          function() {$scope.reset();}, 
          function(error){
            $window.alert('抱歉，出错了');} 
          );
      };

      $scope.reset = function(){
        $scope.order = {quantity: 1, client_id: $scope.order.client_id, status: $scope.order.status};
        $scope.total_price = 0
      };

      $scope.clientChanged = function(client_id){
        $scope.price_unit = $scope.clients.filter(function(c){return c.id == client_id})[0].price_unit_string
      }

      $scope.unit_price_changed = function(unit_price){
        $scope.total_price = unit_price * $scope.order.quantity
      }

      $scope.total_price_changed = function(total_price){
        $scope.order.sale_price = parseFloat((total_price / $scope.order.quantity).toFixed(2))
      }

      $scope.quantity_changed = function(quantity){
        if($scope.order.sale_price){
          $scope.total_price = parseFloat(($scope.order.sale_price * quantity).toFixed(2))
        }
      }

      $scope.quantity_blur = function(){
        if($scope.order.quantity == ''){
          $scope.order.quantity = $scope.previous_quantity
        }
      }

      $scope.quantity_clicked = function(){
        $scope.previous_quantity = $scope.order.quantity;
        $scope.order.quantity = ''
      }



  }]);