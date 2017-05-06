photoRecogApp.controller('navController', function uploadController($scope,$rootScope,$http,Upload,$location){
        $scope.isUserLoggedIn = $rootScope.isUserLoggedIn;
        console.log('inside nav controller')
        $scope.doLogout = function(){
            $scope.isUserLoggedIn = false;
            $http({
	  		    method: 'GET',
	  		    url: '/logout',
	  		    headers: { 'Content-Type': 'application/json' },
		        })
		    }
});
