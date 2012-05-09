Readium.Views.ScrollingPaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);
		this.page_template = _.template( $('#scrolling-page-template').html() );
	},

	// sometimes these views hang around in memory before
	// the GC's get them. we need to remove all of the handlers
	// that were registered on the model
	destruct: function() {
		console.log("Scrolling paginator destructor called");

		// call the super destructor
		Readium.Views.PaginationViewBase.prototype.destruct.call(this);
	},

	render: function() {
		var that = this;
		var uri = this.model.get("current_section_url");
		this.$('#container').html( this.page_template({uri: uri}) );
		/*this.$('.content-sandbox').on("load", function(e) {
			// not sure why, on("load", this.applyBindings, this) was not working
			that.applyBindings( $(e.srcElement).contents() );
            that.injectMathJax(e.srcElement);
            that.injectLinkHandler(e.srcElement);
            var trigs = that.parseTriggers(e.srcElement.contentDocument);
			that.applyTriggers(e.srcElement.contentDocument, trigs);
		});*/
		this.$('.content-sandbox').on("load", function(e) {
			that.iframeLoadCallback(e);
		});
		return this;
	},

	injectLinkHandler: function (iframe) {
        var doc = iframe.contentDocument;
		$("a", doc).click(this.linkClickHandler);
	}

});