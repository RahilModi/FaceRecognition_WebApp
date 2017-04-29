
var photoRecogApp = angular.module('photoRecogApp',['ngFileUpload','ngRoute']);

photoRecogApp.config(function($routeProvider){
	console.log("arrived in route config");
	$routeProvider
		.when("/",{
			templateUrl : "/login",
			controller : "authController"
		})
		.when("/upload",{
			templateUrl : "/upload",
			controller : "uploadController"
		})
		.when("/compare",{
			templateUrl : "/compare",
			controller : "compareController"
		})
		.otherwise({
			templateUrl : "/login",
			controller : "authController"
		});
});