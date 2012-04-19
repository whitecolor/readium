Readium.Views.ScrollingPaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);
		this.page_template = _.template( $('#scrolling-page-template').html() );
	},

	render: function() {
		var that = this;
		var uri = this.model.get("current_section_url");
		this.$('#container').html( this.page_template({uri: uri}) );
		this.$('.content-sandbox').on("load", function(e) {
			// not sure why, on("load", this.applyBindings, this) was not working
			that.applyBindings( $(e.srcElement).contents() );
            that.injectMathJax(e.srcElement);
            that.injectLinkHandler(e.srcElement);
		});
		return this;
	},

	injectLinkHandler: function (iframe) {
        var doc = iframe.contentDocument;
		$("a", doc).click(this.linkClickHandler);
	}

});