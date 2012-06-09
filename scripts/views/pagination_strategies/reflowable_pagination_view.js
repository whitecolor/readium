
Readium.Views.ReflowablePaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);
		this.page_template = _.template( $('#reflowing-template').html() );
		this.model.on("change:current_page", this.pageChangeHandler, this);
		this.model.on("change:toc_visible", this.windowSizeChangeHandler, this);
		this.model.on("change:current_theme", this.injectTheme, this);
	},

	// sometimes these views hang around in memory before
	// the GC's get them. we need to remove all of the handlers
	// that were registered on the model
	destruct: function() {
		this.model.off("change:current_page", this.pageChangeHandler);
		this.model.off("change:toc_visible", this.windowSizeChangeHandler);
		this.model.off("change:current_theme", this.windowSizeChangeHandler);

		// call the super destructor
		Readium.Views.PaginationViewBase.prototype.destruct.call(this);
	},

	render: function(goToLastPage) {
		var that = this;
		var json = this.model.getCurrentSection().toJSON();

		// make everything invisible to prevent flicker
		


		this.$('#container').html( this.page_template(json) );
		
		this.$('#readium-flowing-content').on("load", function(e) {
			that.adjustIframeColumns();
			that.iframeLoadCallback(e);
			that.setFontSize();
			that.injectTheme();

			// wait for css to parse before setting page num
			setTimeout(function() {
				that.model.set("num_pages", that.calcNumPages());
				that.pageChangeHandler();
				if(goToLastPage) {
					that.model.goToLastPage();
				}
				else {
					that.model.goToPage(1);
				}
			}, 10);
			
			
		});
		return this;
	},

	adjustIframeColumns: function() {

		var $frame = this.$('#readium-flowing-content');
		this.frame_width = parseInt($frame.width(), 10);
		this.frame_height = parseInt($frame.height(), 10);
		this.gap_width = Math.floor(this.frame_width / 5);

		// it is important for us to make sure there is no padding or
		// margin on the <html> elem, or it will mess with our column code
		$(this.getBody()).css({
			"-webkit-column-axis": "horizontal",
			"-webkit-column-gap": this.gap_width.toString() + "px",
			"padding": "0px",
			"margin": "0px",
			"position": "absolute",
			"left": "0px",
			"-webkit-column-width": this.frame_width.toString() + "px",
			"width": this.frame_width.toString() + "px",
			"height": this.frame_height.toString() + "px"
		});

		var that = this;
		setTimeout(function() {
			that.model.set("num_pages", that.calcNumPages());

			that.pageChangeHandler();
		}, 10);
		
	},

	injectLinkHandler: function (iframe) {
        var doc = iframe.contentDocument;
		$("a", doc).click(this.linkClickHandler);
	},

	// helper method to get the a reference to the documentElement
	// of the document in this strategy's iFrame.
	// TODO this is a bad name for this function
	getBody: function() {
		return this.$('#readium-flowing-content').contents()[0].documentElement;
	},

	hideContent: function() {
		$("#flowing-wrapper").css("opacity", "0");
	},

	showContent: function() {
		$("#flowing-wrapper").css("opacity", "1");
	},

	calcPageOffset: function(page_num) {
		return (page_num - 1) * (this.frame_width + this.gap_width);
	},

	calcNumPages: function() {
		var width = this.getBody().scrollWidth;
		width -= parseInt(this.getBody().style.left, 10); 
		return Math.floor( (width + this.gap_width) / (this.gap_width + this.frame_width) )
	},

	pageChangeHandler: function() {
		var that = this;
		this.hideContent();
		setTimeout(function() {
			that.goToPage(that.model.get("current_page")[0]);
		}, 150);
	},

	goToPage: function(page) {
		var offset = this.calcPageOffset(page).toString() + "px";
		$(this.getBody()).css("left", "-" + offset);
		this.showContent();
	},

	goToHashFragment: function() {
		var fragment = this.model.get("hash_fragment");
		if(fragment) {
			var el = $("#" + fragment, this.getBody())[0];

			// we get more precise results if we look at the first children
			while(el.children.length > 0) {
				el = el.children[0];
			}

			var page = this.getElemPageNumber(el);
			this.model.goToPage(page);
		}
		// else false alarm no work to do
	},

	getElemPageNumber: function(elem) {
		var shift = elem.getClientRects()[0].left;
		// less the amount we already shifted to get to cp
		shift -= parseInt(this.getBody().style.left, 10); 
		return Math.ceil( shift / (this.frame_width + this.gap_width) );
	},

	windowSizeChangeHandler: function() {
		this.hideContent();
		this.adjustIframeColumns();
	},

	setFontSize: function() {
		debugger;
		var size = this.model.get("font_size") / 10;
		$(this.getBody()).css("font-size", size + "em");
		// TODO RECALC PAGE COUNT
	},

	// sadly this is just a reprint of what is already in the
	// themes stylesheet. It isn't very DRY but the implementation is
	// cleaner this way
	themes: {
		"default-theme": {
			"background-color": "white",
			"color": "black"
		},

		"vancouver-theme": {
			"background-color": "#DDD",
			"color": "#576b96"
		},

		"ballard-theme": {
			"background-color": "#576b96",
			"color": "#DDD"
		},

		"parchment-theme": {
			"background-color": "#f7f1cf",
			"color": "#774c27"
		},

		"night-theme": {
			"background-color": "black",
			"color": "white"
		}
	},

	injectTheme: function() {
		var theme = this.model.get("current_theme");
		debugger;
		$(this.getBody()).css({
			"color": this.themes[theme]["color"],
			"background-color": this.themes[theme]["background-color"],
		});
	}



});