var oaApp = angular.module('usecar',['ngResource']);
oaApp.config(function($routeProvider){
	$routeProvider.when('/main',{
		templateUrl:'content/usecar/main.html',controller:'usecarCrl'
	}).when('/test1',{
		templateUrl:'../content/test1.html'
	}).otherwise({redirectTo:'/main'});
});