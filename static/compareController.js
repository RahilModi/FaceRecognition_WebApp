
photoRecogApp.controller('compareController', function compareController($scope,$rootScope,$http,$location,Upload){

	console.log('inside compareController');

	$scope.isCompared = false;
	$scope.comparedImagePath = '';
	$scope.originalImagePath = '';
	$scope.confidence = 0;
	console.log('Inside uploadFile')
	console.log($scope.myfile);
	var finalurl = '/compare/' + $rootScope.userId;
	$scope.uploadFile = function(){

		console.log('Inside uploadFile')
		console.log($scope.myfile);
		var finalurl = '/compare/' + $rootScope.userId;

		$http({
	  		method: 'POST',
	  		url: finalurl,
	  		headers: { 'Content-Type': 'application/json' },
      		data: JSON.stringify($scope.userId)
		}).then(function successCallback(response) {

		console.log('successful');

			console.log(response);
			// console.log('iscompared' + $scope.isCompared)
			// console.log('compareimagepath' + $scope.comparedImagePath)
			// console.log('originalImagePath' + $scope.originalImagePath)
			// console.log('confidence' + $scope.confidence)

			$scope.isCompared = true;
			$scope.comparedImagePath = response.data.comparedImagePath;
			$scope.originalImagePath = response.data.originalImagePath;
			$scope.confidence = response.data.confidence;

	  	}, function errorCallback(response) {
	  		$location.path('/login');
        	$location.replace();
	    	console.log(response.status);
	    	console.log(response.msg);
	  	});
	};
});