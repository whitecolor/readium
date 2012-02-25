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
		this.page_template = _.template( $('#reflowing-page-template').html() );
	},

	render: function() {
		var i; var html; var num;
		this.replaceContent(this.model.get("current_content") );

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
		"click .page": function() {
			alert("click page");
		},
		"click #readium-content-container": function() {
			alert("click page-margin");
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

		return 5;
		/*
		var quotient;
		quotient = $('#readium-content-container').height() / $('.page').first().height();
		if(quotient < 1) {
			return 1;
		}
		return Math.ceil(quotient);
		*/
	}

	
});

Readium.Views.ReflowablePaginationView = Readium.Views.PaginationViewBase.extend({

});

Readium.Views.FixedPaginationView = Readium.Views.PaginationViewBase.extend({

});

Readium.Views.NavWidgetView = Backbone.View.extend({

	el: '#settings',

	initialize: function() {
		this.model.on("change:two_up", this.render, this);
		this.model.on("change:full_screen", this.render, this);
	},

	render: function() {
		var ebook = this.model;
		this.$('#to-fs-icon').toggle( !ebook.get("full_screen") );
		this.$('#from-fs-icon').toggle( ebook.get("full_screen") );
		this.$('#two-up-icon').toggle( !ebook.get("two_up") );
		this.$('#one-up-icon').toggle( ebook.get("two_up") );
	},

	events: {
    	"click #show-toc-button": 		function() { this.model.toggleToc() },
		"click #increase-font-button": 	function() { this.model.increaseFont() },
		"click #decrease-font-button": 	function() { this.model.decreaseFont() },
		"click #fullscreen-button": 	function() { this.model.toggleFullScreen() },
		"click #two-up-button": 		function() { this.model.toggleTwoUp() },
		"click #page-back-button": 		function() { this.model.prevPage() },
		"click #page-fwd-button": 		function() { this.model.nextPage() }
  	},
});

			
		