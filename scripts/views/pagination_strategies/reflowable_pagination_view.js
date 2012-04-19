

Readium.Views.ReflowablePaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);

		this.page_template = _.template( $('#reflowing-page-template').html() );
		
		this.model.on("repagination_event", this.renderPages, this);
		//this.model.on("change:current_content", this.render, this);
		this.model.on("change:two_up", this.renderPages, this);

	},

	render: function(goToLastPage) {
		this.resetEl();
		var htmlText = this.model.get("current_content");
		var parser = new window.DOMParser();
		var dom = parser.parseFromString( htmlText, 'text/xml' );
		this.addStyleSheets( dom );
		this.applyBindings( dom );
		this.replaceContent( dom.body.innerHTML );
		// need to add one page for calculation to work (TODO: this can be fixed)
		this.$('#container').html( this.page_template({page_num: 1, empty: false}) );
		
		// we need to let the stylesheets be parsed (TODO use an event?)
		var that = this;
		MathJax.Hub.Queue(
            ["Delay",MathJax.Callback,8], // delay to let CSS parse
            ["Typeset",MathJax.Hub],      // typeset any mathematics
        	function() {
				that.renderPages();
				that.toggleTwoUp();
				if(goToLastPage) {
					that.model.goToLastPage();
				}
				else {
					that.model.goToFirstPage();
				}
        	}
		);
		
		return this;
	},

	guessPageNumber: function() {
		
		var quotient;
		quotient = $('#readium-content-container').height() / $('.page').first().height();
		if(quotient < 1) {
			return 1;
		}
		return Math.ceil(quotient);
	},

	needsMorePages: function() {
		// this should be part of the regions API but last I checked it wasn't there yet
		// for now we just check if content bottom is lower than page bottom
		var getBotHelper = function( $elem ) {
			return $elem.outerHeight(true) + $elem.offset().top;
		};
		
		var pageEnd = getBotHelper( this.$('.page').last() );
		var contEnd = getBotHelper( $('#content-end') );
		return pageEnd < contEnd;
		return false;
	},

	renderPages: function() {
		var i; var html; var num;
		var two_up = this.model.get("two_up");
		num = this.guessPageNumber();
		html = "";

		this.setUpMode();
		
		
		// start with an empty page in two up mode
		if(two_up) {
			html += this.page_template({page_num: 0, empty: true})
		}

		// added the guessed number of pages
		for( i = 1; i <= num; i++) {
			html += this.page_template({page_num: i, empty: false});
		}
		this.$('#container').html( html );

		// now touch it up
		while( this.needsMorePages() ) {
			this.$('#container').append( this.page_template({page_num: i, empty: false}) )
			i += 1;
		}
		
		if(two_up && num % 2 === 0) {
			num += 1;
			this.$('#container').append( this.page_template({page_num: i, empty: false}) );
		}

		
		this.model.changPageNumber(num);
		this.$('#readium-content-container').
			css('visibility', 'visible');
		
		// dunno that I should be calling this explicitly
		this.changePage();
	},

	

	// decide if should open in two up based on viewport
	// width
	/*
	var shouldOpenInTwoUp = function() {
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		return width > 300 && width / height > 1.3;
	}
*/
});