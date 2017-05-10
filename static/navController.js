photoRecogApp.controller('navController', function navController($scope,$rootScope,$http,Upload,$location){
        $scope.isUserLoggedIn = $rootScope.isUserLoggedIn;
        $scope.fName = $rootScope.fName;
        $scope.lName = $rootScope.lName;
        console.log('inside nav controller')
        $scope.doLogout = function(){
            console.log('inside doLogout')
            $scope.isUserLoggedIn = false;
            $http({
	  		    method: 'GET',
	  		    url: '/logout',
	  		    headers: { 'Content-Type': 'application/json' },
            }).then(function successCallback(response) {

        			console.log('response')

        			console.log(response.data.msg);
        			console.log(response.data.status);
                    $rootScope.isUserLoggedIn = false;
                	if (response.data.status == "200") {
                	    console.log('user signed out')

                		$timeout(function() {
                            $location.path('/home');
                			$location.replace();
                        },2000);
                	}
                	else if (response.data.status == "404"){
                	    console.log('not a registered user')
                	    //alert("Student Id not found, please register");
                        $timeout(function() {
                            $location.path('/');
                            $location.replace();
                        },2000);
                	}

        	  	}, function errorCallback(response) {
        	  		$location.path('/home');
                	$location.replace();
        	    	console.log(response.status);
        	    	console.log(response.msg);
        	  	});
		    }
});
