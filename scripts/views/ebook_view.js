if( !window.Readium ) {
	window.Readium = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		Utils: {}
	};
}

Readium.Views.PaginationViewBase = Backbone.View.extend({

	el: "#readium-book-view-el",

	initialize: function(options) {
		this.model.on("change:current_page", this.changePage, this);
		this.model.on("change:current_content", this.render, this);
		this.model.on("change:font_size", this.setFontSize, this);
		this.page_template = _.template( $('#reflowing-page-template').html() );

	},

	render: function() {
		var htmlText = this.model.get("current_content");
		var parser = new window.DOMParser();
		var dom = parser.parseFromString( htmlText, 'text/xml' );
		this.addStyleSheets( dom );
		this.replaceContent( dom.body.innerHTML );
		// need to add one page for calculation to work (TODO: this can be fixed)
		this.$('#container').html( this.page_template({page_num: 1}) );
		this.renderPages();

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


	addStyleSheets: function(bookDom) {
		var link; var href; var $link; var links;
		
		// first remove anything we already put up there
		$('.readium-dynamic-sh').remove();

		links = bookDom.getElementsByTagName("link");
		
		for (var j = 0; j < links.length; j++) {
			link = links[j];
			if(typeof link.rel === "string" && link.rel.toUpperCase() === "STYLESHEET") {
				$link = $(link);
				$link.addClass('readium-dynamic-sh');
				$('head').prepend($link);
			}
		}
	},

	renderPages: function() {
		var i; var html; var num;
		num = this.guessPageNumber();
		html = "";
		for( i = 1; i <= num; i++) {
			html += this.page_template({page_num: i});
		}

		this.$('#container').html( html );
		/*
		if(_pageAddCallback) {
			_pageAddCallback($('.page-wrap'));
		}
		*/
		this.model.set({num_pages: num});
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

	isPageVisible: function(pageNum, currentPage) {
		return currentPage === pageNum;
	},

	changePage: function() {
		var that = this;
		var currentPage = this.model.get("current_page")
		this.$(".page-wrap").each(function(index) {
			if( that.isPageVisible(index + 1, currentPage) ) {
				$(this).css({visibility: "visible"});
			}
			else {
				$(this).css({visibility: "hidden"});
			}
		});
	},

	appendContent: function(content) {
		alert('not implemented yet')
	},
	
	replaceContent: function(content) {
		this.$('#readium-content-container').html(content + "<div id='content-end'></div>");
		_contentEnd = $('#content-end');
	},

	toggleTwoUp: function() {

	},

	guessPageNumber: function() {
		
		var quotient;
		quotient = $('#readium-content-container').height() / $('.page').first().height();
		if(quotient < 1) {
			return 1;
		}
		return Math.ceil(quotient);
	},

	setFontSize: function() {
		var size = this.model.get("font_size") / 10;
		$('#readium-content-container').css("font-size", size + "em");
		this.renderPages();
	},

	
});

Readium.Views.ReflowablePaginationView = Readium.Views.PaginationViewBase.extend({

});

Readium.Views.FixedPaginationView = Readium.Views.PaginationViewBase.extend({
	events: {
		'click #page-wrap a': function(e) {
			this.linkClickHandler(e)
		}
	}
});
			
		