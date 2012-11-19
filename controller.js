function WallCtrl($scope) {

	var defaultDropText = "Drop files here",
		errorHandler;
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
      		for (var i = 0; i < files.length; i++) {
    		var text = files[i].name+', '+files[i].size+' bytes';
    		console.log(text);
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

   //  function onInitFs(fs) {

	  // window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);

	  // fs.root.getFile('log.txt', {}, function(fileEntry) {

	  //   // Get a File object representing the file,
	  //   // then use FileReader to read its contents.
	  //   fileEntry.file(function(file) {
	  //      var reader = new FileReader();

	  //      reader.onloadend = function(e) {
	  //        var txtArea = document.createElement('textarea');
	  //        txtArea.value = this.result;
	  //        document.body.appendChild(txtArea);
	  //      };

	  //      reader.readAsText(file);
	  //   }, errorHandler);

	  // }, errorHandler);
	// }
  }

  document.body.addEventListener("dragover", dragOver, false);
  document.body.addEventListener("dragleave", dragLeave, false);
  document.body.addEventListener("drop", drop, false);

}