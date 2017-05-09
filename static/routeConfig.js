
var photoRecogApp = angular.module('photoRecogApp',['ngFileUpload','ngRoute']);

photoRecogApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{a');
  $interpolateProvider.endSymbol('a}');
}]);

photoRecogApp.config(function($routeProvider){
	console.log("arrived in route config");
	$routeProvider
		.when("/",{
			templateUrl : "/home"
			//controller : "homeController"
		})
		.when("/login",{
			templateUrl : "/login"
			//controller : "authController"
		})
		.when("/signUp",{
			templateUrl : "/signUp"
			//controller : "authController"
		})
		.when("/upload",{
			templateUrl : "/upload"
			//controller : "uploadController"
		})
		.when("/compare",{
			templateUrl : "/compare"
			//controller : "compareController"
		})
		.when("/complete",{
			templateUrl : "/complete"
			//controller : "compareController"
		})
		.when("/logout",{
		    templateUrl : "/logout"
		})
		.otherwise({
		    templateUrl: "/home"
			//controller : "homeController"
		});
});
