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

		// Maintain original information about stylesheets

		// Get all style sheets in the book dom
		var $bookStyleSheets = $("link[rel*='stylesheet']", bookDom);

		// Get the unique styles set titles list here

		// Get the style title to activate

		// Turn on every style set that contains the alternate tags; style sheet ordering will determine which are applied
		$bookStyleSheets.each(function () {

			$styleSheet = $(this);
			if ($.trim($styleSheet.attr('title')) === styleSetTitleToActivate) {

				$styleSheet.attr("rel", "stylesheet");
			}
			else {

				$styleSheet.attr("rel", "alternate stylesheet");
			}
		});
	},

	// Returns null if no title requires activiation by tag
	// TODO: Change the styleSetTagMatches to an array so that the order of the style sets are guaranteed
	_getStyleTitleToActivate: function (bookStyleSheets, styleSetTitles, altStyleTags) {

		var styleSetTagMatches = {};
		var styleSetNum;
		var $styleSet;
		var maxNumTagMatches;
		var styleSetCandidates = [];

		// Find the style set with the most matching alternate tags, removing mututally exclusive tags
		for (styleSetNum = 0; styleSetNum < styleSetTitles.length; styleSetNum += 1) {

			$styleSet = bookStyleSheets.filter("link[title='" + styleSetTitles[styleSetNum] + "']");
			$styleSet = this._removeMutuallyExclusiveAltTags($styleSet);
			styleSetTagMatches[styleSetTitles[styleSetNum]] = this._getNumAltStyleTagMatches($styleSet, altStyleTags);
		}

		// Get a list of the style sets with the maximum number of tag matches
		maxNumTagMatches = _.max(styleSetTagMatches);

		// Do nothing if there are no matching tags
		if (maxNumTagMatches === 0) {

			return null;
		}

		// Get a list of the style sets that had the maximum number of alternate tag matches
		_.each(styleSetTagMatches, function(numMatches, styleSetTitle) {

			if (numMatches === maxNumTagMatches) {

				styleSetCandidates.push(styleSetTitle);
			}
		});

		// If there is only one style set in the candidate list
		if (styleSetCandidates === 1) {

			return styleSetCandidates[0];
		}
		// Since there are multiple candidates, return the style set that is preferred (the first style set with rel="stylesheet")
		else {

			var candidateNum;
			for (candidateNum = 0; candidateNum < styleSetCandidates.length; candidateNum++) {

				$styleSet = bookStyleSheets.filter("link[title='" + styleSetCandidates[candidateNum] + "']");
				if ($.trim($styleSet.attr("rel")) === "stylesheet") {

					return styleSetCandidates[candidateNum];
				}
			}

			// If none of the stylesheets were preferred (only rel="alternate stylesheet"), return the first style set title
			return styleSetCandidates[0];
		}
	},

	_getStyleSetTitles: function (bookStyleSheets) {

		var styleSetTitles = [];

		// Find the unique style sets from the 'title' property
		bookStyleSheets.each(function() {

			var styleSheetTitle = $(this).attr("title");
			if (!_.include(styleSetTitles, styleSheetTitle)) {

				styleSetTitles.push(styleSheetTitle);
			}
		});

		return styleSetTitles;
	},

	//styleSet: A JQuery object of a style set
	//altStyleTags: An array of the style tags to active a style set
	_getNumAltStyleTagMatches: function (styleSet, altStyleTags) {

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