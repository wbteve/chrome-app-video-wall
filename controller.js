function WallCtrl($scope) {

	var defaultDropText = "Drop files here";
  	$scope.dropText = defaultDropText;

  	var dragOver = function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    var valid = e.dataTransfer && e.dataTransfer.types && ( e.dataTransfer.types.indexOf('Files') >= 0 || e.dataTransfer.types.indexOf('text/uri-list') >=0 )
	    $scope.$apply(function() {
	      	$scope.dropText = valid ? "Drop the file here..." : "Can't drop that type of file";
	      	$scope.dropClass = valid ? "dragging" : "invalid-dragging";
	    });
  	}

  	var dragLeave = function(e) {
    	$scope.$apply(function() {
      		$scope.dropText = defaultDropText;
      		$scope.dropClass = '';
    	});
  	}

  	var drop = function(e) {
    	e.preventDefault();
    	e.stopPropagation();

    	var newFiles=[];
    	if (e.dataTransfer.types.indexOf('Files') >= 0) {
      		var files = e.dataTransfer.files;
      		console.log(files);

      		for (var i = 0; i < files.length; i++) {
    		var text = files[i].name+', '+files[i].size+' bytes';
        	newFiles.push({text:text, done:false, file: files[i]});
      	}
    } else { // uris
      var uri=e.dataTransfer.getData("text/uri-list");
      newFiles.push({text:uri, done:false, uri: uri});
    }

    $scope.$apply(function() {
      $scope.dropText = defaultDropText;
      $scope.dropClass = '';
      for (var i = 0; i < newFiles.length; i++) {
        $scope.newFiles.push(newFiles[i]);
      }
      $scope.save();
    });
  }

  document.body.addEventListener("dragover", dragOver, false);
  document.body.addEventListener("dragleave", dragLeave, false);
  document.body.addEventListener("drop", drop, false);

}