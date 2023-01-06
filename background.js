// listen for clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
  // open the pop-up window
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 600,
    height: 400
  });
});
