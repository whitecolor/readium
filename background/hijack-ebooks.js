chrome.extension.sendRequest({storage: "hijack_epub_urls"}, function(response) {
	if (response && response.hijack_epub_urls) {
		$("a[href$='.epub']").each(function() {
			this.href = chrome.extension.getURL("/views/extractbook.html") + "#" + this.href;
			this.target = "_blank";
		});
	}
});
