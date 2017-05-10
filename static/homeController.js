'use strict';
photoRecogApp.controller('homeController', home);



function home($scope,$location,$rootScope,$window){

    $rootScope.isUserLoggedIn = $window.sessionStorage.isUserLoggedIn;
    $rootScope.fName = $window.sessionStorage.fName;
    $rootScope.lName = $window.sessionStorage.lName;

    $scope.$on('userEvent', function(event, data) {
            console.log("event received")
            console.log(data.isUserLoggedIn);
            $scope.isUserLoggedIn = data.isUserLoggedIn;
    })
    $scope.isUserLoggedIn = $rootScope.isUserLoggedIn;
        $location.path('/home');
        $location.replace();

    $scope.doLogin= function(){
        $location.path('/login');
        $location.replace();
        console.log($location.path())
    }

    $scope.doLogin= function(){
        $location.path('/signUp');
        $location.replace();
    }

    console.log('inside homeController');
}
