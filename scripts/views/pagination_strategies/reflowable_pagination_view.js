

Readium.Views.ReflowablePaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);

		this.page_template = _.template( $('#reflowing-page-template').html() );
		
		this.model.on("repagination_event", this.renderPages, this);
		//this.model.on("change:current_content", this.render, this);
		this.model.on("change:two_up", this.renderPages, this);

	},

	// sometimes these views hang around in memory before
	// the GC's get them. we need to remove all of the handlers
	// that were registered on the model
	destruct: function() {
		console.log("Reflowing paginator destructor called");

		// call the super constructor
		Readium.Views.PaginationViewBase.prototype.destruct.call(this);

		// remove any listeners registered on the model
		this.model.off("repagination_event", this.renderPages);
		//this.model.off("change:current_content", this.render);
		this.model.off("change:two_up", this.renderPages);
	},

	render: function(goToLastPage) {
		this.resetEl();
		var htmlText = this.model.get("current_content");
		var parser = new window.DOMParser();
		var dom = parser.parseFromString( htmlText, 'text/xml' );
		this.addStyleSheets( dom );
		this.applyBindings( dom );
		this.replaceContent( dom.body.innerHTML );
		var trigs = this.parseTriggers(dom);
		this.applyTriggers(document, trigs);
		this.applySwitches(document);
		
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

	goToHashFragment: function() {
		var fragment = this.model.get("hash_fragment");
		if(!fragment) {
			// false alarm
			return;
		}
		console.log("attempting to find " + fragment);
		var page = this.findHashFragment(fragment);
		if(typeof page === "number") {
			console.log("the fragment is on page " + page);
			this.model.goToPage(page);
		}
		else {
			// we didn't find the fragment so give up
			console.log("could not find the frag");
		}
		// reset the fragment so that it will trigger events again
		this.model.set("hash_fragment", null);
	},

	findHashFragment: function(frag) {
		// find the page number that contains the element
		// identified by the fragment:
		var el = $("#" + frag);
		if(el.length !== 1) {
			// we aren't set up for this, fail fast
			return null;
		}
		// so far we are getting better resolution by considering
		// the first child
		if(el.children().length > 0) {
			el = el.children()[0];
		}
		else {
			el = el[0];	
		}
		

		// find out where it is rendered on the page
		var pos = el.getBoundingClientRect().left;

		// now wiggle the pages one by one and see if the 
		// element wiggles:
		var pages = $('.page-wrap');
		var numPages = pages.length;
		var reset;
		var wigglePos;
		for(var i = 0; i < numPages; i++) {
			// get the original position of the page
			reset = pages[i].style.left || 0;
			// wiggle the page
			pages[i].style.left = 100;
			// get the position of the el of interest
			wigglePos = el.getBoundingClientRect().left;
			// move the page back
			pages[i].style.left = 0;

			if(wigglePos - pos > 10) {
				// the element wiggled we found it
				return i + 1; // NOTE: PAGE NUMBERS ARE 1 INDEXED
			}

		}

		// we didn't find the page
		return null;

	}

	

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