Readium.Views.PaginationViewBase = Backbone.View.extend({

	el: "#readium-book-view-el",

	initialize: function(options) {
		this.model.on("change:current_page", this.changePage, this);
		this.model.on("change:font_size", this.setFontSize, this);
		this.bindingTemplate = _.template( $('#binding-template').html() );
	},

	linkClickHandler: function(e) {
		e.preventDefault();

		var href = e.srcElement.attributes["href"].value;
		if(href.match(/^http(s)?:/)) {
			chrome.tabs.create({"url": href});
		} else {
			this.model.goToHref(href);
		}
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
			var supportedCase;
			var $cases = $('case', this);
			// start by hiding all the cases, this each statement
			// IS needed, jquery doesn't like the xml nodes we are
			// fiddling with
			$cases.each(function() { 
				var $el = $(this);
				$el.data("style", ($el.attr("style") || "") );
				$el.attr("style", "display: none");
			})

			// find the first case that is supported
			supportedCase = _.find($cases, isSupported);

			if(supportedCase) {
				// show one if we found one
				$(supportedCase).attr("style", $(supportedCase).data("style") );
				// and hide the default
				$('default', this).attr("style", "display: none");
			}
		})
	},

	addStyleSheets: function(bookDom) {
		var link; var href; var $link; var links;
		
		// first remove anything we already put up there
		$('.readium-dynamic-sh').remove();

		$($("link", bookDom).get().reverse()).each(function(){
			link = this;
			if(typeof link.rel === "string" && link.rel.toUpperCase() === "STYLESHEET") {
				$link = $(link);
				$link.addClass('readium-dynamic-sh');
				$('head').prepend($link);
			}
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
		var two_up = this.model.get("two_up")
		this.$(".page-wrap").each(function(index) {
			if(!two_up) { 
				index += 1;
			}
			$(this).toggleClass("hidden-page", !that.isPageVisible(index, currentPage));
		});
	},

	appendContent: function(content) {
		alert('not implemented yet')
	},
	
	replaceContent: function(content) {
		// TODO: put this where it belongs
		this.$('#readium-content-container').
			css('visibility', 'hidden').
			html(content + "<div id='content-end'></div>");
		_contentEnd = $('#content-end');
	},

	toggleTwoUp: function() {
		
		//this.render();
	},

	setFontSize: function() {
		var size = this.model.get("font_size") / 10;
		$('#readium-content-container').css("font-size", size + "em");
		this.renderPages();
	},

    injectMathJax: function (iframe) {
		var doc = iframe.contentDocument;
		var script = doc.createElement("script");
		script.type = "text/javascript";
		script.src = MathJax.Hub.config.root+"/MathJax.js?config=readium-iframe";
		doc.getElementsByTagName("head")[0].appendChild(script);
    }
	
});