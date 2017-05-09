photoRecogApp.controller('completeController', function completeController($scope,$rootScope,$http,Upload,$location){

	console.log('inside completeController');
	console.log($rootScope.studentId);
	//alert($rootScope.studentId);
   
	$scope.comparedfilePath = $rootScope.comparedfilePath
	
	console.log('destination path')
	console.log($scope.comparedfilePath);
	$scope.originalfilePath = $rootScope.originalfilePath;

	console.log('original path')
	console.log($scope.originalfilePath);

	console.log('confidence')
	$scope.confidence = $rootScope.confidence;
	console.log($scope.confidence)
});