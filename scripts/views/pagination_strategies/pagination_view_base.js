/*
	Base class from which all pagination strategy classes are derived. This
	class should not bet intialized (if it could be it would be abstract). It
	exists for the purpose of sharing behaviour between the different strategies.
*/
Readium.Views.PaginationViewBase = Backbone.View.extend({

	// all strategies are linked to the same dom elem
	el: "#readium-book-view-el",

	initialize: function(options) {
		this.model.on("change:current_page", this.changePage, this);
		this.model.on("change:font_size", this.setFontSize, this);
		this.model.on("change:hash_fragment", this.goToHashFragment, this);
		this.bindingTemplate = _.template( $('#binding-template').html() );
	},

	// sometimes these views hang around in memory before
	// the GC gets them. we need to remove all of the handlers
	// that were registered on the model
	destruct: function() {
		console.log("Pagination base destructor called");

		// remove any listeners registered on the model
		this.model.off("change:current_page", this.changePage);
		this.model.off("change:font_size", this.setFontSize);
		this.model.off("change:hash_fragment", this.goToHashFragment);
		this.resetEl();
	},

	// handle  clicks of anchor tags by navigating to
	// the proper location in the epub spine, or opening
	// a new window for external links
	linkClickHandler: function(e) {
		e.preventDefault();

		var href = e.srcElement.attributes["href"].value;
		if(href.match(/^http(s)?:/)) {
			chrome.tabs.create({"url": href});
		} else {
			this.model.goToHref(href);
		}
	},

	goToHashFragment: function() {
		// stub this in to the super class as a no-op for now
		// just to prevent "no method error"s
	},

	getBindings: function() {
		var packDoc = this.model.packageDocument;
		var bindings = packDoc.get('bindings');
		return bindings.map(function(binding) {
			binding.selector = 'object[type="' + binding.media_type + '"]';
			binding.url = packDoc.getManifestItemById(binding.handler).get('href');
			binding.url = packDoc.resolveUri(binding.url);
			return binding;
		})
	},

	applyBindings: function(dom) {
		var that = this;
		var bindings = this.getBindings();
		var i = 0;
		for(var i = 0; i < bindings.length; i++) {
			$(bindings[i].selector, dom).each(function() {
				var params = [];
				var $el = $(this);
				var data = $el.attr('data');
				var url;
				params.push("src=" + that.model.packageDocument.resolveUri(data));
				params.push('type=' + bindings[i].media_type);
				url = bindings[i].url + "?" + params.join('&');
				var content = $(that.bindingTemplate({}));
				// must set src attr separately
				content.attr('src', url);
				$el.html(content);
			});
		}
	},

	applyTriggers: function(dom, triggers) {
		for(var i = 0 ; i < triggers.length; i++) {
			triggers[i].subscribe(dom);
		}
	},

	// for reflowable content we only add what is in the body tag.
	// lots of times the triggers are in the head of the dom
	parseTriggers: function(dom) {
		var triggers = [];
		$('trigger', dom).each(function() {
			

			triggers.push(new Readium.Models.Trigger(this) );
		});
		
		return triggers;
	},	

	// parse the epub "switch" tags and hide
	// cases that are not supported
	applySwitches: function(dom) {

		// helper method, returns true if a given case node
		// is supported, false otherwise
		var isSupported = function(caseNode) {

			var ns = caseNode.attributes["required-namespace"];
			if(!ns) {
				// the namespace was not specified, that should
				// never happen, we don't support it then
				console.log("Encountered a case statement with no required-namespace");
				return false;
			}
			// all the xmlns's that readium is known to support
			// TODO this is going to require maintanence
			var supportedNamespaces = ["http://www.w3.org/1998/Math/MathML"];
			return _.include(supportedNamespaces, ns);
		};


		$('switch', dom).each(function(ind) {
			
			// keep track of whether or now we found one
			var found = false;


			$('case', this).each(function() {

				if( !found && isSupported(this) ) {
					found = true; // we found the node, don't remove it
				}
				else {
					$(this).remove(); // remove the node from the dom
				}
			});

			if(found) {
				// if we found a supported case, remove the default
				$('default', this).remove();
			}
		})
	},

    /*
     * Description:
     * 1) Check if any of the stylesheets have changed.
     * 2) If none have changed, do nothing.
     * 3) If there is at least one change, remove all the currently applied stylesheets
     * and add the new ones in their original order. 
     * 
     * Rationale:
     * 1) Removing and adding stylesheets preemptively causes the table of contents to flicker. 
     * Thus, we must detect and add changes only when required, as at this time changing a stylesheet without inducing flicker is not possible. 
     * 2) The original order of the stylesheets must be preserved. It is reasonably complex to detect
     * and add/remove changed stylesheets, while preserving the correct order. As such, it is simpler to 
     * change all the stylesheets if a single change is detected. The assumption is that stylesheet changes
     * will be rare. 
    */
	addStyleSheets: function(bookDom) {

		var $appliedStylesheets; 
	    var $bookStylesheets;
	    var stylesheetsUnchanged = true;
		
		$appliedStylesheets = $('.readium-dynamic-sh');
		$bookStylesheets = $("link[rel*='stylesheet']", bookDom);	

		// Check if both lists of stylesheets are the same:
		// (1) Same number of elements 
		if ($appliedStylesheets.length === $bookStylesheets.length) {

			// (2) matching URLs in the right order
			$appliedStylesheets.each(function(index) {

				var appliedStylesheetURL = $($appliedStylesheets[index]).attr("href");
				var bookStylesheetURL = $($bookStylesheets[index]).attr("href");
				
				if (appliedStylesheetURL !== bookStylesheetURL) {

					stylesheetsUnchanged = false;
				}
			});
		}
		else {

			stylesheetsUnchanged = false;
		}

		// If stylesheets are unchanged, do nothing
		if (stylesheetsUnchanged) {

			return;
		}

		// If stylesheets have changed, remove current stylesheets and add the new ones
		$('.readium-dynamic-sh').remove();

		// We're PREPENDING so that any application stylesheets are lower in the <head> than the book stylesheets. 
		// As such, we're adding the book stylesheets in REVERSE order to preserve their ordering. 
		$($bookStylesheets.get().reverse()).each(function() {

			var $link = $(this);
			$link.addClass('readium-dynamic-sh');
			$('head').prepend($link);			
		});
	},

	setUpMode: function() {
		var two_up = this.model.get("two_up");
		this.$el.toggleClass("two-up", two_up);
		this.$('#spine-divider').toggle(two_up);
	},

	// this doesn't seem to be working...
	events: {
		"click #page-margin": function(e) {
			this.trigger("toggle_ui");
		},

		"click #readium-content-container a": function(e) {
			this.linkClickHandler(e);
		}
	},

	isPageVisible: function(pageNum, currentPages) {
		return currentPages.indexOf(pageNum) !== -1;
	},

	changePage: function() {
		var that = this;
		var currentPage = this.model.get("current_page");
		var two_up = this.model.get("two_up");
		this.$(".page-wrap").each(function(index) {
			if(!two_up) { 
				index += 1;
			}
			$(this).toggleClass("hidden-page", !that.isPageVisible(index, currentPage));
		});
	},
	
	replaceContent: function(content) {
		// TODO: put this where it belongs
		this.$('#readium-content-container').
		css('visibility', 'hidden').
		html(content).append("<div id='content-end'></div>");
	},

	toggleTwoUp: function() {
		//this.render();
	},

	setFontSize: function() {
		var size = this.model.get("font_size") / 10;
		$('#readium-content-container').css("font-size", size + "em");
		this.renderPages();
	},

	// inject mathML parsing code into an iframe
    injectMathJax: function (iframe) {
		var doc = iframe.contentDocument;
		var script = doc.createElement("script");
		script.type = "text/javascript";
		script.src = MathJax.Hub.config.root+"/MathJax.js?config=readium-iframe";
		doc.getElementsByTagName("head")[0].appendChild(script);
    },

    injectLinkHandler: function(iframe) {
    	var that = this;
    	$('a', iframe.contentDocument).click(function(e) {
    		that.linkClickHandler(e)
    	});
    },

    resetEl: function() {
    	$('body').removeClass("apple-fixed-layout");
    	$("#readium-book-view-el").attr("style", "");
		this.$el.toggleClass("two-up", false);
		this.$('#spine-divider').toggle(false);

    	this.replaceContent("");
    	$('#page-wrap').css({
    		"position": "relative",
    		"right": "0px", 
    		"top": "0px",
    		"-webkit-transform": "scale(1.0) translate(0px, 0px)",
    	});
    },

    iframeLoadCallback: function(e) {
		
		this.applyBindings( $(e.srcElement).contents() );
		this.applySwitches( $(e.srcElement).contents() );
        this.injectMathJax(e.srcElement);
        this.injectLinkHandler(e.srcElement);
        var trigs = this.parseTriggers(e.srcElement.contentDocument);
		this.applyTriggers(e.srcElement.contentDocument, trigs);
	}
	
});