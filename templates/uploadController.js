
photoRecogApp.controller('uploadController', function uploadController($scope,$rootScope,$http,Upload){

	console.log('inside uploadController');


	$scope.uploadFile = function(){

		console.log('Inside uploadFile')
		console.log($scope.myfile);
		var userId = "011499072";
		var finalurl = '/uploadfile/' + userId;
		console.log('url is : ' + finalurl);
		$scope.upload = Upload.upload({
			url: finalurl,
			data: {
				file: $scope.myfile
			}
		}).then(function (resp) {
			console.log('successful');
		}, function (resp) {
			console.log('successful');
		}, function (evt) {
			// var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			// console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};
});