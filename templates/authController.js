photoRecogApp.controller('authController', function authController($scope,$rootScope,$http,$location){
    $rootScope.isUserLoggedIn = false;
	console.log('inside authController');
	$scope.authenticate = function(){

		console.log('Inside authenticate')
		console.log($scope.studentId);

		//$rootScope.userId = userId;
		$http({
	  		method: 'POST',
	  		url: '/login',
	  		headers: { 'Content-Type': 'application/json' },
      		data: JSON.stringify($scope.studentId)
		}).then(function successCallback(response) {


			console.log("response: ")

			console.log(response.data.msg);

        	if (response.data.msg === "existing") {
        	    console.log('existing user ')
        	    $rootScope.isUserLoggedIn = true;
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

	$scope.gotoHome = function(){
	    $location.path('/');
	    $location.replace();
	    console.log($location.path())
	}

    $scope.numOnlyRegex = /^\d+$/

    $scope.lettersOnlyRegex =/^[a-zA-Z]*$/

});
