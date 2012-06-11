describe("alternate_style_tag_selector", function() {

	var epub_content = 
	'<?xml version="1.0" encoding="UTF-8"?> \
	 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" \
	 xmlns:epub="http://www.idpf.org/2007/ops"> \
	 <head> \
	 	<meta charset="utf-8"></meta> \
		<title>The Waste Land</title> \
	 	<link rel="stylesheet" type="text/css" href="wasteland.css" class="day" title="day"/> \
		<link rel="alternate stylesheet" type="text/css" href="wasteland-night.css" class="night" title="night"/> \
	 </head> \
	 <body> \
	 </body> \
	 </html>';

	var parser = new window.DOMParser();
	var epub_dom = parser.parseFromString(epub_content, 'text/xml');
	
	describe("found style sheet", function () {

		it ('created a document object', function () {

			var $title_element = $("title", epub_dom).text();
			expect($title_element).toEqual("The Waste Land");
		});
	});
});