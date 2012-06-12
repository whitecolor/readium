/* Description: This model is responsible for implementing the Alternate Style Tags specification
 * found at http://idpf.org/epub/altss-tags/. The model selects a "preferred" style sheet or style set 
 * with which to render an ePUB document. 
 */

Readium.Models.AlternateStyleTagSelector = Backbone.Model.extend({

	initialize: function() {},

	// Activate style set; passed: A set of ePUB alternate style tags
	activateStyleSet: function(altStyleTags, bookDom) {

		var $bookStyleSheets;
		var styleSetNames;
		var that = this;
		var styleSetToActivate;

		// Get all style sheets in the book dom
		$bookStyleSheets = $("link[rel*='stylesheet']", bookDom);

		// Find the unique style sets from the 'title' property
		$bookStyleSheets.each(function() {

			if (!_.include(that.styleSetNames, $(this).attr("title"))) {

				that.styleSetNames.push($(this).attr("title"));
			}
		});

		// For each style set
		var styleSetTagMatches = {};
		var styleSetNum;
		var $styleSet;
		var maxNumTagMatches;
		for (styleSetNum = 0; styleSetNum < styleSetNames.length; styleSetNum += 1) {

			// Get style set from the dom
			$styleSet = $("link[title='" + styleSetNames[styleSetNum] + "']");

			// Ignore any mutually exclusive tags on style sets
			$styleSet = _removeMutuallyExclusiveAltTags($styleSet);

			// Find the style set(s) with the most alt tag matches
			styleSetTagMatches[styleSetNames[styleSetNum]] = _numAltStyleTagMatches();
		}

		maxNumTagMatches = _.max(styleSetTagMatches);

		// Turn on every style set that contains the alternate tags; style sheet ordering will determine which are applied
		var styleSetNum;
		for (styleSetNum = 0; styleSetNum < styleSetNames.length; styleSetNum += 1) {

			$styleSet = $("link[title='" + styleSetNames[styleSetNum] + "']");

			// Find the style set(s) with the most alt tag matches
			if (styleSetTagMatches[styleSetNames[styleSetNum]] === maxNumTagMatches) {

				$styleSet.attr("rel", "stylesheet");
			}
			// Turn off every style set without the alternate tag
			else {

				$styleSet.attr("rel", "alternate stylesheet");
			}
		}
	},

	//styleSet: A JQuery object of a style set
	//altStyleTags: An array of the style tags to active a style set

	_numAltStyleTagMatches: function (styleSet, altStyleTags) {

		var numMatches = 0;

		// If the alt style tag is found in the style set, increment num matches
		var altTagNum;
		for (altTagNum = 0; altTagNum < altStyleTags.length; altTagNum += 1) {

			// filter used so top-level elements are selected
			if (styleSet.filter("link[class*='" + altStyleTags[altTagNum] + "']").length > 0) {

				numMatches++;	
			}
		}

		return numMatches;
	},

	// This method removes, thus ignoring, mututally exclusive alternate tags within a style set
	//styleSet: A JQuery object of a style set
	_removeMutuallyExclusiveAltTags: function (styleSet) {

		if (styleSet.filter("link[class*='night']").length > 0 &&
		    styleSet.filter("link[class*='day']").length > 0) {

			styleSet.toggleClass("night");
			styleSet.toggleClass("day");
		}

		if (styleSet.filter("link[class*='vertical']").length > 0 &&
			styleSet.filter("link[class*='horizontal']").length > 0) {

			styleSet.toggleClass("vertical");
			styleSet.toggleClass("horizontal");
		}

		return styleSet;
	},
});