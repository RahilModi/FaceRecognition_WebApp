photoRecogApp.controller('completeController', function completeController($scope,$rootScope,$http,Upload,$location){

	console.log('inside completeController');
	console.log($rootScope.studentId);
	//alert($rootScope.studentId);
   

	$scope.destination_path = 'http://localhost:3000/static/images/' + document.getElementById("studentid").value + '/subject02';
	console.log($scope.destination_path);
	$scope.originalFilePath = 'http://localhost:3000/static/images/' + document.getElementById("studentid").value + '/subject01';
	console.log($scope.originalFilePath);
	$scope.similarity= 98;
	console.log($scope.similarity)

}).config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('//').endSymbol('//');
    });