photoRecogApp.controller('authController', function authController($scope,$rootScope,$http,$location,$interval){

    $rootScope.isUserLoggedIn = false;
	
	$scope.alertMessage = ""

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
			
			console.log('response')

			console.log(response.data.msg);
			console.log(response.data.status);
			
        	if (response.data.status == "200") {
        	    console.log('existing user ')
        	    $rootScope.isUserLoggedIn = true;
        	    $rootScope.studentId = $scope.studentId;
		    $rootScope.fName = response.data.msg.firstName;
		    $rootScope.lName = response.data.msg.lastName;
        	    console.log('student ID is : ')
        	    console.log($scope.studentId)
        		$location.path('/upload');
        		$location.replace();
        	}
        	else if (response.data.status == "404"){
        	    console.log('not a registered user')
        	    //alert("Student Id not found, please register");
				$scope.alertMessage = "Studen ID not found, Redirecting to SignUp"
				var temp = 1;
				var id = $interval(function() {
			   		if (temp == 30) {
        				$location.path('/signUp');
        				$location.replace();
			    	}	else {
						if (temp % 5 == 0){
							$scope.alertMessage = $scope.alertMessage + '.'
						}
						console.log(temp)
			      		temp++;
			    	}
			  	}, 50);
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

			console.log(response.data.msg);

        	if (response.data.status == "200") {

        		$rootScope.studentId = $scope.studentId;

        	    console.log('new user registered ')
        	    $rootScope.isUserLoggedIn = true;
				$rootScope.fName = $scope.fName;
				$rootScope.lName = $scope.lName;
        		$location.path('/upload');
        		$location.replace();
        	}
        	else if (response.data.status == "400"){
				console.log('Student is already registered')
        		$location.path('/login');
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
