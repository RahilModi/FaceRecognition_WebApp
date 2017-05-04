
var photoRecogApp = angular.module('photoRecogApp',['ngFileUpload','ngRoute']);

photoRecogApp.config(function($routeProvider){
	console.log("arrived in route config");
	$routeProvider
		.when("/",{
			templateUrl : "/home",
			controller : "homeController"
		})
		.when("/login",{
			templateUrl : "/login",
			controller : "authController"
		})
		.when("/signUp",{
			templateUrl : "/signUp",
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
		    redirectTo: "/home",
			controller : "homeController"
		});
});
