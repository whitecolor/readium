describe("alternate_style_tag_selector", function() {

	var epubContentDoc = 
	'<?xml version="1.0" encoding="UTF-8"?> \
	 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" \
	 xmlns:epub="http://www.idpf.org/2007/ops"> \
	 <head> \
	 	<meta charset="utf-8"></meta> \
		<title>The Waste Land</title> \
	 </head> \
	 <body> \
	 </body> \
	 </html>';

	var parser = new window.DOMParser();
	var epubDom = parser.parseFromString(epubContentDoc, 'text/xml');

	describe("style set tag matching", function () {

		// Initialize two style sets, with one style sheet each
		var styles = '<link rel="stylesheet" href="night.css" class="night" title="nightStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="dayStyle"/>';

		$('head', epubDom)[0].appendChild($(styles)[0]);
		$('head', epubDom)[0].appendChild($(styles)[1]);
		
		it ('matched a single alternate style tag', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			styleSet = $("link[title='nightStyle']", epubDom);

			var numTagMatches = selector._numAltStyleTagMatches(styleSet, ["night"]);			
			expect(numTagMatches).toEqual(1);
		});

		// Add a another style sheet to the "nightStyle" style set
		styles += '<link rel="stylesheet" href="vertical.css" class="vertical" title="nightStyle"/>';

		$('head', epubDom)[0].appendChild($(styles)[2]);

		it ('matched multiple alternate style tags within a style set', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			styleSet = $("link[title='nightStyle']", epubDom);

			var numTagMatches = selector._numAltStyleTagMatches(styleSet, ["night", "vertical"]);			
			expect(numTagMatches).toEqual(2);
		});

		it ('ignored extra tags that are not included', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			styleSet = $("link[title='nightStyle']", epubDom);

			var numTagMatches = selector._numAltStyleTagMatches(styleSet, ["night", "vertical", "extraTag"]);			
			expect(numTagMatches).toEqual(2);
		});
	});

	describe("alternate tag mutual exclusion", function () {

		it ('does not incorrectly remove tags within a style set', function () {

			// Initialize two style sets with one style sheet each
			var styles = '<link rel="stylesheet" href="night.css" class="night" title="nightStyle"/>'
				       + '<link rel="alternate stylesheet" href="vertical.css" class="vertical" title="nightStyle"/>';

			$('head', epubDom)[0].appendChild($(styles)[0]);
			$('head', epubDom)[0].appendChild($(styles)[1]);
			var $styleSet = $("link[title='nightStyle']", epubDom);

			selector = new Readium.Models.AlternateStyleTagSelector;
			$styleSet = selector._removeMutuallyExclusiveAltTags($styleSet);

			var mutuallyExclTagsRemoved = false;

			if ($styleSet.filter("link[class*='night']").length === 0 
				|| $styleSet.filter("link[class*='vertical']").length === 0) {

				that.mutuallyExclTagsRemoved = true;
			}

			expect(mutuallyExclTagsRemoved).toEqual(false);
		});

		it('removes a single set of mutually exclusive tags', function () {

			var that = this;

			// Initialize a style set that has mutually exclusive tags on it
			var styles = '<link rel="stylesheet" href="day.css" class="day" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>';

			$('head', epubDom)[0].appendChild($(styles)[0]);
			$('head', epubDom)[0].appendChild($(styles)[1]);
			var $styleSet = $("link[title='nightStyle']", epubDom);

			selector = new Readium.Models.AlternateStyleTagSelector;
			$styleSet = selector._removeMutuallyExclusiveAltTags($styleSet);

			var mutuallyExclTagsRemoved = true;

			if ($styleSet.filter("link[class*='night']").length > 0 
				|| $styleSet.filter("link[class*='vertical']").length > 0) {

				that.mutuallyExclTagsRemoved = false;
			}

			expect(mutuallyExclTagsRemoved).toEqual(true);
		});

		it('removes two sets of mutually exclusive tags', function () {

			// Initialize a style set that contains two sets of mutually exclusive tags
			var styles = '<link rel="stylesheet" href="day.css" class="day" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="horizontal" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="vertical" title="dayStyle"/>';

			$('head', epubDom)[0].appendChild($(styles)[0]);
			$('head', epubDom)[0].appendChild($(styles)[1]);
			$('head', epubDom)[0].appendChild($(styles)[2]);
			$('head', epubDom)[0].appendChild($(styles)[3]);
			var $styleSet = $("link[title='dayStyle']", epubDom);

			var that = this;

			selector = new Readium.Models.AlternateStyleTagSelector;
			$styleSet = selector._removeMutuallyExclusiveAltTags($styleSet);

			var mutuallyExclTagsRemoved = true;

			_.each(["day", "night", "horizontal", "vertical"], function(altTag) {

				if ($styleSet.filter("link[class*='" + altTag + "']").length === 0) {

					that.mutuallyExclTagsRemoved = false;
				}
			});

			expect(mutuallyExclTagsRemoved).toEqual(true);
		});

		it('removes two sets of mutually exclusive tags with multiple redundant tags', function () {

			// Initialize a style set that contains two sets of mutually exclusive tags
			var styles = '<link rel="stylesheet" href="day.css" class="day" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="horizontal" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="horizontal" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="vertical" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>';

			$('head', epubDom)[0].appendChild($(styles)[0]);
			$('head', epubDom)[0].appendChild($(styles)[1]);
			$('head', epubDom)[0].appendChild($(styles)[2]);
			$('head', epubDom)[0].appendChild($(styles)[3]);
			$('head', epubDom)[0].appendChild($(styles)[4]);
			$('head', epubDom)[0].appendChild($(styles)[5]);
			var $styleSet = $("link[title='dayStyle']", epubDom);

			var that = this;

			selector = new Readium.Models.AlternateStyleTagSelector;
			$styleSet = selector._removeMutuallyExclusiveAltTags($styleSet);

			var mutuallyExclTagsRemoved = true;

			_.each(["day", "night", "vertical", "horizontal"], function(altTag) {

				if ($styleSet.filter("link[class*='" + altTag + "']").length === 0) {

					that.mutuallyExclTagsRemoved = false;
				}
			});

			expect(mutuallyExclTagsRemoved).toEqual(true);
		});
	});
});