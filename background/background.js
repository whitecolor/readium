function getClickHandler() {
  return function(info, tab) {

    // construct a url pass data to the view
    var url = 'extractBook.html#' + info.linkUrl;

    // Create a new window to the info page.
    chrome.windows.create({ url: url, width: 900, height: 760 });
  };
};

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.storage == "rewrite_link")
      sendResponse({storage: localStorage["rewrite_link"]});
    else
      sendResponse({}); // snub them.
  });

// create a context menu item
chrome.contextMenus.create({
  "title" : "Add to Readium Library",
  "type" : "normal",
  "contexts" : ["link"],
  "onclick" : getClickHandler()
});


