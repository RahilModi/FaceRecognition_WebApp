'use strict';
photoRecogApp.controller('homeController', home);

function home($scope,$location,$rootScope){

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

