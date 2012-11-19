chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('skynewswall.html', {id: 'mainwindow', width: 500, height: 309});
});

window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});