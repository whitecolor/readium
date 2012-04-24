

Readium.Views.FixedPaginationView = Readium.Views.PaginationViewBase.extend({

	initialize: function() {
		// call the super ctor
		this.page_template = _.template( $('#fixed-page-template').html() );
		this.empty_template = _.template( $('#empty-fixed-page-template').html() );
		Readium.Views.PaginationViewBase.prototype.initialize.call(this);
		//this.model.on("first_render_ready", this.render, this);
		//this.model.on("change:two_up", this.setUpMode, this);
	},

	render: function() {

		$('body').addClass('apple-fixed-layout');

		// appends one fixed layout page to those currently rendered
		var metaTags = this.model.parseMetaTags();
		this.$el.width(metaTags.meta_width * 2);
		this.$el.height(metaTags.meta_height);

		// wipe the html
		this.$('#container').html("");

		// add the current section
		this.addPage( this.model.getCurrentSection(), 1 );
		currentPage = this.model.set("current_page", [1]);
		setTimeout(function() {
			$('#page-wrap').zoomAndScale(); //<= this was a little buggy last I checked but it is a super cool feature
		}, 10)
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
			that.applyBindings( $(e.srcElement).contents() );
		});
		this.changePage();
		
	},

	setUpMode: function() {
		// call super
		Readium.Views.PaginationViewBase.prototype.setUpMode.call(this);
		var two_up = this.model.get("two_up");
		var height = this.model.get("meta_height");
		var width = this.model.get("meta_width");
		if(two_up) {
			var content = this.empty_template({page_num: 0, height: height, width: width});
			//this.$('#container').prepend(content);
		} else {
			$('#page-0').remove();
		}
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

	events: {
		'click #page-wrap a': function(e) {
			this.linkClickHandler(e)
		}
	}
});