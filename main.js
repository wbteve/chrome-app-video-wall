chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('skynewswall.html', {id: 'mainwindow', width: 500, height: 309});
});