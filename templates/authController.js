photoRecogApp.controller('authController', function authController($scope,$rootScope,$http,$location){

	console.log('inside authController');

	$scope.authenticate = function(){

		console.log('Inside authenticate')
		console.log($scope.userId);

		//$rootScope.userId = userId;
		$http({
	  		method: 'POST',
	  		url: '/login',
	  		headers: { 'Content-Type': 'application/json' },
      		data: JSON.stringify($scope.userId)
		}).then(function successCallback(response) {


			console.log("response: ")

			console.log(response.data.msg);

        	if (response.data.msg === "existing") {

        		$location.path('/compare');
        		$location.replace();
        	}
        	else if (response.data.msg === "new"){
        		$location.path('/upload');
        		$location.replace();
        	}

	  	}, function errorCallback(response) {
	  		$location.path('/login');
        	$location.replace();
	    	console.log(response.status);
	    	console.log(response.msg);
	  	});
	};
});
