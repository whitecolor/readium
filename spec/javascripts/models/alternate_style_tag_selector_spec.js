describe("alternate_style_tag_selector", function() {

	var getEPubContentDom = function () {
		
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

		return epubDom;
	};

	describe("style set selection", function () {

		var testEPubDom = getEPubContentDom();

		// Initialize a set of style sheets grouped into style sets
		var styles = '<link rel="alternate stylesheet" href="vertical.css"   class="vertical"   title="Vertical Day"/>'
				   + '<link rel="alternate stylesheet" href="day.css"        class="day"        title="Vertical Day"/>'
				   + '<link rel="alternate stylesheet" href="vertical.css"   class="vertical"   title="Vertical Night"/>'
				   + '<link rel="alternate stylesheet" href="night.css"      class="night"      title="Vertical Night"/>'
				   + '<link rel="stylesheet"           href="horizontal.css" class="horizontal" title="Horizontal Day"/>'
				   + '<link rel="stylesheet"           href="day.css"        class="day"        title="Horizontal Day"/>'
				   + '<link rel="stylesheet"           href="horizontal.css" class="horizontal" title="Horizontal Night"/>'
				   + '<link rel="stylesheet"           href="night.css"      class="night"      title="Horizontal Night"/>';

		$('head', testEPubDom)[0].appendChild($(styles)[0]);
		$('head', testEPubDom)[0].appendChild($(styles)[1]);
		$('head', testEPubDom)[0].appendChild($(styles)[2]);
		$('head', testEPubDom)[0].appendChild($(styles)[3]);
		$('head', testEPubDom)[0].appendChild($(styles)[4]);
		$('head', testEPubDom)[0].appendChild($(styles)[5]);
		$('head', testEPubDom)[0].appendChild($(styles)[6]);
		$('head', testEPubDom)[0].appendChild($(styles)[7]);

		it ("finds the correct style set based on tags", function() {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testEPubDom);
			var selectedStyle = selector._getStyleTitleToActivate($bookStyleSheets, selector._getStyleSetTitles($bookStyleSheets), ["day", "vertical"]);

			expect(selectedStyle).toEqual("Vertical Day");
		});

		it ("finds the correct style set based on tag subset", function() {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testEPubDom);
			var selectedStyle = selector._getStyleTitleToActivate($bookStyleSheets, selector._getStyleSetTitles($bookStyleSheets), ["day"]);

			expect(selectedStyle).toEqual("Horizontal Day");
		});

		it ("finds the correct style set from a set of rel='stylesheet alternate' style sets", function() {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testEPubDom);
			var selectedStyle = selector._getStyleTitleToActivate($bookStyleSheets, selector._getStyleSetTitles($bookStyleSheets), ["vertical"]);

			expect(selectedStyle).toEqual("Vertical Day");
		});

		it ("returns null if no style tags are provided", function() {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testEPubDom);
			var selectedStyle = selector._getStyleTitleToActivate($bookStyleSheets, selector._getStyleSetTitles($bookStyleSheets), []);

			expect(selectedStyle).toEqual(null);
		});

		it ("returns the correct style set even if extra tags are specified", function() {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testEPubDom);
			var selectedStyle = selector._getStyleTitleToActivate($bookStyleSheets, selector._getStyleSetTitles($bookStyleSheets), ["horizontal", "night", "otherTag"]);

			expect(selectedStyle).toEqual("Horizontal Night");
		});

		var testShortEPubDom = getEPubContentDom();

		// Initialize a set of style sheets grouped into style sets
		var styles = '<link rel="alternate stylesheet" href="vertical.css"   class="vertical"   title="Vertical Day"/>'
				   + '<link rel="alternate stylesheet" href="day.css"        class="day"        title="Vertical Day"/>';

		$('head', testShortEPubDom)[0].appendChild($(styles)[0]);
		$('head', testShortEPubDom)[0].appendChild($(styles)[1]);

		it ("returns null if the style tags cannot be found", function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testShortEPubDom);
			var selectedStyle = selector._getStyleTitleToActivate($bookStyleSheets, selector._getStyleSetTitles($bookStyleSheets), ["night"]);

			expect(selectedStyle).toEqual(null);
		});
	});

	describe("getting unique style set titles", function () {

		var testEPubDom = getEPubContentDom();

		// Initialize a set of style sheets grouped into style sets
		var styles = '<link rel="stylesheet" href="night.css" class="night" title="nightStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="dayStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="dayStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="otherStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="nightStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="otherStyle"/>';

		$('head', testEPubDom)[0].appendChild($(styles)[0]);
		$('head', testEPubDom)[0].appendChild($(styles)[1]);
		$('head', testEPubDom)[0].appendChild($(styles)[2]);
		$('head', testEPubDom)[0].appendChild($(styles)[3]);
		$('head', testEPubDom)[0].appendChild($(styles)[4]);
		$('head', testEPubDom)[0].appendChild($(styles)[5]);

		it('gets a unique list of titles', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			var $bookStyleSheets = $("link[rel*='stylesheet']", testEPubDom);
			var styleSetTitles = selector._getStyleSetTitles($bookStyleSheets);

			expect(styleSetTitles.length).toEqual(3);
			expect(styleSetTitles[0]).toEqual('nightStyle');
			expect(styleSetTitles[1]).toEqual('dayStyle');
			expect(styleSetTitles[2]).toEqual('otherStyle');
		});
	});

	describe("style set tag matching", function () {

		var testEPubDom = getEPubContentDom();

		// Initialize two style sets, with one style sheet each
		var styles = '<link rel="stylesheet" href="night.css" class="night" title="nightStyle"/>'
			       + '<link rel="alternate stylesheet" href="day.css" class="day" title="dayStyle"/>';

		$('head', testEPubDom)[0].appendChild($(styles)[0]);
		$('head', testEPubDom)[0].appendChild($(styles)[1]);
		
		it ('matched a single alternate style tag', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			styleSet = $("link[title='nightStyle']", testEPubDom);

			var numTagMatches = selector._getNumAltStyleTagMatches(styleSet, ["night"]);			
			expect(numTagMatches).toEqual(1);
		});

		// Add a another style sheet to the "nightStyle" style set
		styles += '<link rel="stylesheet" href="vertical.css" class="vertical" title="nightStyle"/>';

		$('head', testEPubDom)[0].appendChild($(styles)[2]);

		it ('matched multiple alternate style tags within a style set', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			styleSet = $("link[title='nightStyle']", testEPubDom);

			var numTagMatches = selector._getNumAltStyleTagMatches(styleSet, ["night", "vertical"]);			
			expect(numTagMatches).toEqual(2);
		});

		it ('ignored extra tags that are not included', function () {

			selector = new Readium.Models.AlternateStyleTagSelector;
			styleSet = $("link[title='nightStyle']", testEPubDom);

			var numTagMatches = selector._getNumAltStyleTagMatches(styleSet, ["night", "vertical", "extraTag"]);			
			expect(numTagMatches).toEqual(2);
		});
	});

	describe("alternate tag mutual exclusion", function () {

		it ('does not incorrectly remove tags within a style set', function () {

			var testEPubDom = getEPubContentDom();

			// Initialize two style sets with one style sheet each
			var styles = '<link rel="stylesheet" href="night.css" class="night" title="nightStyle"/>'
				       + '<link rel="alternate stylesheet" href="vertical.css" class="vertical" title="nightStyle"/>';

			$('head', testEPubDom)[0].appendChild($(styles)[0]);
			$('head', testEPubDom)[0].appendChild($(styles)[1]);
			var $styleSet = $("link[title='nightStyle']", testEPubDom);

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
			var testEPubDom = getEPubContentDom();

			// Initialize a style set that has mutually exclusive tags on it
			var styles = '<link rel="stylesheet" href="day.css" class="day" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>';

			$('head', testEPubDom)[0].appendChild($(styles)[0]);
			$('head', testEPubDom)[0].appendChild($(styles)[1]);
			var $styleSet = $("link[title='nightStyle']", testEPubDom);

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

			var testEPubDom = getEPubContentDom();

			// Initialize a style set that contains two sets of mutually exclusive tags
			var styles = '<link rel="stylesheet" href="day.css" class="day" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="horizontal" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="vertical" title="dayStyle"/>';

			$('head', testEPubDom)[0].appendChild($(styles)[0]);
			$('head', testEPubDom)[0].appendChild($(styles)[1]);
			$('head', testEPubDom)[0].appendChild($(styles)[2]);
			$('head', testEPubDom)[0].appendChild($(styles)[3]);
			var $styleSet = $("link[title='dayStyle']", testEPubDom);

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

			var testEPubDom = getEPubContentDom();

			// Initialize a style set that contains two sets of mutually exclusive tags
			var styles = '<link rel="stylesheet" href="day.css" class="day" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="horizontal" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="horizontal" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="vertical" title="dayStyle"/>'
			           + '<link rel="stylesheet" href="night.css" class="night" title="dayStyle"/>';

			$('head', testEPubDom)[0].appendChild($(styles)[0]);
			$('head', testEPubDom)[0].appendChild($(styles)[1]);
			$('head', testEPubDom)[0].appendChild($(styles)[2]);
			$('head', testEPubDom)[0].appendChild($(styles)[3]);
			$('head', testEPubDom)[0].appendChild($(styles)[4]);
			$('head', testEPubDom)[0].appendChild($(styles)[5]);
			var $styleSet = $("link[title='dayStyle']", testEPubDom);

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