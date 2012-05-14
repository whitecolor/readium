

Readium.Views.FixedPaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		this.page_template = _.template( $('#fixed-page-template').html() );
		this.empty_template = _.template( $('#empty-fixed-page-template').html() );
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);
		//this.model.on("first_render_ready", this.render, this);
		this.model.on("change:two_up", this.setUpMode, this);
	},

	// sometimes these views hang around in memory before
	// the GC's get them. we need to remove all of the handlers
	// that were registered on the model
	destruct: function() {
		console.log("Fixed paginator destructor called");

		// call the super constructor
		Readium.Views.PaginationViewBase.prototype.destruct.call(this);

		// remove any listeners registered on the model
		this.model.off("change:two_up", this.setUpMode);
	},

	render: function() {

		$('body').addClass('apple-fixed-layout');

		// appends one fixed layout page to those currently rendered
		//var metaTags = this.model.parseMetaTags();
		//this.$el.width(metaTags.meta_width * 2);
		//this.$el.height(metaTags.meta_height);

		// wipe the html
		this.$('#container').html("");

		// add the current section
		//this.addPage( this.model.getCurrentSection(), 1 );
		//currentPage = this.model.set("current_page", [1]);
		setTimeout(function() {
			$('#page-wrap').zoomAndScale(); //<= this was a little buggy last I checked but it is a super cool feature
		}, 1)
		return this.renderPages();
	},

	addPage: function(sec, pageNum) {

		sec.page_num = pageNum;
		var rendered_content = this.page_template(sec);
		if(pageNum > 1) {
			$(rendered_content).hide();
		}
		this.model.changPageNumber(pageNum);
		this.$('#container').append(this.page_template(sec));
		var that = this;
		this.$('.content-sandbox').on("load", function(e) {
			// not sure why, on("load", this.applyBindings, this) was not working
			that.iframeLoadCallback(e);
		});
		//this.changePage();
		
	},

	renderPages: function() {
		// lost myself in the complexity here but this seems right
		this.changePage();
		return this;
	},

	changePage: function() {
		var that = this;
		var currentPage = this.model.get("current_page");
		var two_up = this.model.get("two_up")
		this.$(".fixed-page-wrap").each(function(index) {
			$(this).toggle(that.isPageVisible(index + 1, currentPage));
		});
	},

});