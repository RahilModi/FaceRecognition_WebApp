var photoRecogApp = angular.module('photoRecogApp',['ngFileUpload']);

photoRecogApp.controller('authController', function authController($scope,$rootScope,$http){

	console.log('inside authController');

	$scope.authenticate = function(){

		console.log('Inside authenticate')
		console.log($scope.userId);

		$rootScope.userId = userId;
		$http({
	  		method: 'POST',
	  		url: '/login',
	  		headers: { 'Content-Type': 'application/json' },
      		data: JSON.stringify($scope.userId)
		}).then(function successCallback(response) {

	    	console.log(response.status);
	    	console.log(response.msg);

	  	}, function errorCallback(response) {

	    	console.log(response.status);
	    	console.log(response.msg);
	  	});
	};
});