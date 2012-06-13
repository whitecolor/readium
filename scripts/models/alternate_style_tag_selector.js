/* Description: This model is responsible for implementing the Alternate Style Tags specification
 * found at http://idpf.org/epub/altss-tags/. The model selects a "preferred" style sheet or style set 
 * with which to render an ePUB document. 
 */
 // TODO: shorcut the processing if persistent style sheets exist? 
 // TODO: More validation for style sets with mixed rel="alternate ..." and rel="stylesheet"
 // TODO: Handling <style> elements
 // TODO: Tagging of persistent sets
 // TODO: Ensure that comments in the html are ignored

Readium.Models.AlternateStyleTagSelector = Backbone.Model.extend({

	initialize: function() {},

	// Activate style set; passed: A set of ePUB alternate style tags
	activateAlternateStyleSet: function(altStyleTags, bookDom) {

		var $bookStyleSheets;
		var styleSetTitles = [];
		var that = this;
		var styleSetToActivate;

		// If there are no alternate tags supplied, do not change the style sets
		if (altStyleTags.length === 0) {

			return bookDom;
		}

		// Get all style sheets in the book dom
		$bookStyleSheets = $("link[rel*='stylesheet']", bookDom);

		// Maintain original information about stylesheets
		$bookStyleSheets = this._storeOriginalAttributes($bookStyleSheets);

		// Get a list of the unique style set titles 
		styleSetTitles = this._getStyleSetTitles($bookStyleSheets);

		// Determine which style set should be activated
		styleSetToActivate = this._getStyleSetTitleToActivate($bookStyleSheets, styleSetTitles, altStyleTags);

		// If no style was found to activate, based on the supplied tags, do not change the style sets
		if (styleSetToActivate === null) {

			return bookDom;
		}

		// Activate the specified style set, de-activing all others
		this._activateStyleSet($bookStyleSheets, styleSetToActivate)
		
		return bookDom;
	},

	// Activates the specified style set and de-activates all others
	_activateStyleSet: function (bookStyleSheets, styleSetToActivate) {

		bookStyleSheets.each(function () {

			$styleSheet = $(this);
			if ($.trim($styleSheet.attr('title')) === styleSetToActivate) {

				$styleSheet.attr("rel", "stylesheet");
			}
			else {

				$styleSheet.attr("rel", "alternate stylesheet");
			}
		});

		return bookStyleSheets;
	},

	// Creates data attributes to store the original stylesheet attribute values, only if they have not 
	// been set
	_storeOriginalAttributes: function(bookStyleSheets) {

		var $styleSheet;

		// For each style sheet, if the original value attributes are empty, set them
		bookStyleSheets.each(function() {

			$styleSheet = $(this);

			if ($styleSheet.data('orig-rel') === undefined) {

				$styleSheet.attr('data-orig-rel', $styleSheet.attr("rel"));
			}
		});

		return bookStyleSheets;
	},

	// Returns null if no title requires activiation by tag
	// Maintains the order of the style sheets
	_getStyleSetTitleToActivate: function (bookStyleSheets, styleSetTitles, altStyleTags) {

		var styleSetTagMatches = [];
		var styleSetNum;
		var $styleSet;
		var maxNumTagMatches;
		var styleSetCandidates = [];

		// Find the style set with the most matching alternate tags, removing mututally exclusive tags
		for (styleSetNum = 0; styleSetNum < styleSetTitles.length; styleSetNum += 1) {

			$styleSet = bookStyleSheets.filter("link[title='" + styleSetTitles[styleSetNum] + "']");
			$styleSet = this._removeMutuallyExclusiveAltTags($styleSet);
			styleSetTagMatches.push(
				{ "numAltTagMatches" : this._getNumAltStyleTagMatches($styleSet, altStyleTags),
				  "styleSetTitle" : styleSetTitles[styleSetNum] }
			);
		}

		// Get a list of the style sets with the maximum number of tag matches
		// _.max returns one of the info elements with a maximum value, which is why the numAltTagMatches property is used to retrieve the actual max value
		maxNumTagMatches = (_.max(styleSetTagMatches, function (styleSetTagMatchInfo) { return styleSetTagMatchInfo.numAltTagMatches } )).numAltTagMatches;

		// Do nothing if there are no matching tags
		if (maxNumTagMatches === 0) {

			return null;
		}

		// Get a list of the style sets that had the maximum number of alternate tag matches
		_.each(styleSetTagMatches, function(styleSetTagMatchInfo) {

			if (styleSetTagMatchInfo['numAltTagMatches'] === maxNumTagMatches) {

				styleSetCandidates.push(styleSetTagMatchInfo["styleSetTitle"]);
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

				// TODO: This assumes that all the style sheets in the style set are marked as either preferred or alternate. It simply checks the first 
				// style sheet of every style set.
				$styleSet = bookStyleSheets.filter("link[title='" + styleSetCandidates[candidateNum] + "']");
				if ($.trim($($styleSet[0]).attr("data-orig-rel")) === "stylesheet") {

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
	//TODO: Maybe change this to act on data- attributes, rather than the actual class attribute
	_removeMutuallyExclusiveAltTags: function (styleSet) {

		var $styleSheet;

		if (styleSet.filter("link[class*='night']").length > 0 &&
		    styleSet.filter("link[class*='day']").length > 0) {

			styleSet.each(function () { 

				$styleSheet = $(this);

				if ($styleSheet.filter('.night').length > 0) {

					$styleSheet.toggleClass('night');
				}

				if ($styleSheet.filter('.day').length > 0) {

					$styleSheet.toggleClass('day');
				}
			});
		}

		if (styleSet.filter("link[class*='vertical']").length > 0 &&
			styleSet.filter("link[class*='horizontal']").length > 0) {

			styleSet.each(function () { 

				$styleSheet = $(this);

				if ($styleSheet.filter('.vertical').length > 0) {
					
					$styleSheet.toggleClass('vertical');
				}

				if ($styleSheet.filter('.horizontal').length > 0) {

					$styleSheet.toggleClass('horizontal');
				}
			});
		}

		return styleSet;
	},
});