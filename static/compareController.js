photoRecogApp.controller('compareController', function compareController($scope,$rootScope,$location,$http,Upload){

	console.log('inside compareController');
    $scope.fileExt;
    $scope.cameraOn = false;
	$scope.uploadFile = function(){

		console.log('Inside uploadFile')
		console.log($scope.myfile);
		var userId = $rootScope.studentId;
		var finalurl = '/compare/' + userId;
		console.log('url is : ' + finalurl);
        console.log('file in upload file')
        console.log($scope.myfile);
		$scope.upload = Upload.upload({
			url: finalurl,
			data: {
				file: $scope.myfile
			}
		}).then(function (resp) {
			console.log('Received response of uploadfile');
            console.log(resp.data.msg);
            $rootScope.originalfilePath = resp.data.msg.originalImagePathToSend;
            $rootScope.comparedfilePath = resp.data.msg.tobeComparedImagePathToSend;
            $rootScope.confidence = resp.data.msg.confidenceToSend;
			$location.path("/complete");
			$location.replace();
		}, function (resp) {
		},
		}, function (evt) {
			// var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			// console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};

         $scope.goBack = function(){
            console.log('back button clicked')
            $scope.cameraOn = false;
         }

        //camera code
        var video = document.querySelector("#videoElement");
        var canvas = document.querySelector('#canvas');
        var context = canvas.getContext('2d');
        var image = document.getElementById('photo');

        $scope.openCamera = function(){
            console.log('camera button clicked')
            $scope.cameraOn = true;

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

            if (navigator.getUserMedia) {
                navigator.getUserMedia({video: true}, handleVideo, videoError);
            }

            function handleVideo(stream) {
                video.src = window.URL.createObjectURL(stream);
            }

            function videoError(e) {
                // do something
            }
        }

        $scope.shoot = function(){
            context.drawImage(video,0,0,300,250);
            image.setAttribute('src',canvas.toDataURL('image/png'));
            var imgAsDataURL = canvas.toDataURL('image/png');
            var dataURL = image.src;
            var blob = dataURItoBlob(dataURL);
            console.log('blob created')
            var file = new File([blob], 'test.png');
            $scope.cameraOn = false;
            $scope.myfile = file
            console.log($scope.myfile)

        }

        function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }

});
