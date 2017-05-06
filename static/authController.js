photoRecogApp.controller('authController', function authController($scope,$rootScope,$http,$location){
<<<<<<< HEAD:static/authController.js

	console.log('inside aa');
=======
    $rootScope.isUserLoggedIn = false;
	console.log('inside authController');
>>>>>>> 0620e8395380195b17c854aa2f0ed03a626f5e55:templates/authController.js

	$location.path('/login');
    $location.replace();
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

<<<<<<< HEAD:static/authController.js
			$rootScope.userId = $scope.userId;
=======
			console.log(response.data.msg);
			console.log(response.data.status);

        	if (response.data.status == 200) {
        	    console.log('existing user ')
        	    $rootScope.isUserLoggedIn = true;
        		$location.path('/compare');
        		$location.replace();
        	}
        	else if (response.data.status == 404){
        	    console.log('not a registered user')
        	    //alert("Student Id not found, please register");
        		$location.path('/signUp');
        		$location.replace();
        	}

	  	}, function errorCallback(response) {
	  		$location.path('/login');
        	$location.replace();
	    	console.log(response.status);
	    	console.log(response.msg);
	  	});
	};

	$scope.signingUp = function(){
	    console.log('Inside signUp')
		console.log($scope.studentId);

		//$rootScope.userId = userId;
		$http({
	  		method: 'POST',
	  		url: '/signUp',
	  		headers: { 'Content-Type': 'application/json' },
      		data: {
      		        studentId : $scope.studentId,
      		        firstName : $scope.fName,
      		        lastName : $scope.lName
      		}
		}).then(function successCallback(response) {

>>>>>>> 0620e8395380195b17c854aa2f0ed03a626f5e55:templates/authController.js
			console.log("response: ")

			console.log(response.data.msg);

        	if (response.data.status == 200) {
        	    console.log('new user registered ')
        	    $rootScope.isUserLoggedIn = true;
        		$location.path('/upload');
        		$location.replace();
        	}
        	else if (response.data.status == 404){
        		$location.path('/signUp');
        		$location.replace();
        	}

	  	}, function errorCallback(response) {
	  		$location.path('/signUp');
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
