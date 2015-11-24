'use strict';

/* App Module */

angular.module('myodControllers',[]);
angular.module('myodServices',[]);

var myod = angular.module('myod', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'myodControllers',
  'myodServices'
]);

myod.value('OrderItemStatus',
  [ {code: 0, title: '待购买'},
    {code: 1, title: '待发货'},
    {code: 2, title: '待收款'},
    {code: 3, title: '已收款'}]
);

myod.value('PackageStatus',
  [ {code: 0, title: '待收款'},
    {code: 1, title: '已收款'}]
);

myod.value('PriceUnits',
  [ {code: 0, title: '澳元'},
    {code: 1, title: '美元'},
    {code: 2, title: '人民币'},
    {code: 3, title: '欧元'},
    {code: 4, title: '英镑'},
    {code: 5, title: '日元'},
    {code: 6, title: '韩元'},
    {code: 7, title: '新西兰元'},]
);



myod.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/view/home',
        controller: 'HomeCtrl'
      }).
      when('/order', {
        templateUrl: '/view/order',
        controller: 'OrderCtrl'
      }).
      when('/buy', {
        templateUrl: '/view/buy',
        controller: 'BuyCtrl'
      }).
      when('/send',{
        templateUrl: '/view/send',
        controller: 'SendCtrl'
      }).
      when('/pay',{
        templateUrl: '/view/pay',
        controller: 'PayCtrl'
      }).
      when('/ordermanager',{
        templateUrl: '/view/ordermanager',
        controller: 'OrderManagerCtrl'
      }).
      when('/clientmanager', {
        templateUrl: '/view/clientmanager',
        controller: 'ClientManagerCtrl'
      }).
      when('/packagemanager', {
        templateUrl: '/view/packagemanager',
        controller: 'PackageManagerCtrl'
      }).
      when('/report', {
        templateUrl: '/view/report',
        controller: 'ReportCtrl'
      }).
      when('/contact', {
        templateUrl: '/view/contact',
        controller: 'ContactCtrl'
      }).
      when('/signed_out', {
        controller : function(){
            window.location.replace('/users/sign_in');
          }, 
        template : "<div></div>"

      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
