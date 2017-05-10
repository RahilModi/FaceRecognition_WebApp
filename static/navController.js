photoRecogApp.controller('navController', function navController($window,$scope,$rootScope,$http,Upload,$location){
    $rootScope.isUserLoggedIn = $window.sessionStorage.isUserLoggedIn;
    $rootScope.fName = $window.sessionStorage.fName;
    $rootScope.lName = $window.sessionStorage.lName;
        console.log('inside nav controller');

        $scope.doLogout = function(){
            console.log('inside doLogout')
            $scope.isUserLoggedIn = false;
            $http({
	  		    method: 'GET',
	  		    url: '/logout',
	  		    headers: { 'Content-Type': 'application/json' },
            }).then(function successCallback(response) {

                    $window.sessionStorage.isUserLoggedIn = null;
                    $window.sessionStorage.fName = null;
                    $window.sessionStorage.lName = null;

        			console.log('response')

        			console.log(response.data.msg);
        			console.log(response.data.status);
                    //$rootScope.isUserLoggedIn = false;
                	if (response.data.status == "200") {
                	    console.log('user signed out')
                            $location.path('/login');
                			$location.replace();
                	}
                	else if (response.data.status == "404"){
                	    console.log('not a registered user')
                	    //alert("Student Id not found, please register");
                        $timeout(function() {
                            $location.path('/login');
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
