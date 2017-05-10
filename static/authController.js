photoRecogApp.controller('authController', function authController($scope,$rootScope,$http,$location,$timeout,$interval){

    $rootScope.isUserLoggedIn = false;

	$scope.alertMessage = ""
    $scope.successMsg = false;
    $scope.errorMsg = false;

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
                $scope.successMsg = true;
                $scope.errorMsg = false;
                $scope.alert = 'alert alert-success';
        		$timeout(function() {
                    $location.path('/home');
        			$location.replace();
                },1000);
        	}
        	else if (response.data.status == "404"){
        	    console.log('not a registered user')
        	    //alert("Student Id not found, please register");
				$scope.alertMessage = "Studen ID not found, Redirecting to SignUp"
                $scope.successMsg = false;
                $scope.errorMsg = true;
                $scope.alert = 'alert alert-danger';
                $timeout(function() {
                    $location.path('/signUp');
                    $location.replace();
                },1000);
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
                $scope.successMsg = true;
                $scope.errorMsg = false;
                $scope.alert = 'alert alert-success';
                $timeout(function() {
                    $location.path('/upload');
                    $location.replace();
                },1000);
        	}
        	else if (response.data.status == "400"){
                console.log('student is already registered....')
                $scope.successMsg = false;
                $scope.errorMsg = true;
                $scope.alert = 'alert alert-danger';
                $timeout(function() {
                    $location.path('/login');
                    $location.replace();
                },1000);
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
