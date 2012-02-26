chrome.extension.sendRequest({storage: "rewrite_link"}, function(response) {
	var rewrite_link = response.storage;
	if (rewrite_link != "off") {
		$("a[href$='.epub']").each(function() {
			this.href = chrome.extension.getURL("/views/extractbook.html") + "#" + this.href;
			this.target = "_blank";
		});
	}
});
