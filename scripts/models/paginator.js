Readium.Models.Paginator = Backbone.Model.extend({

	renderToLastPage: false,
	
	initialize: function() {

		this.model = this.get("book");
		
		// keep track of which direction we are moving through the publication
		this.model.packageDocument.on("increased:spine_position", function() {
			this.renderToLastPage = false;
		}, this);
		this.model.packageDocument.on("decreased:spine_position", function() {
			this.renderToLastPage = true;
		}, this);

		// whenever current content changes it means, the spine item has been changed
		// and it is loaded up and ready to go
		this.model.on("change:current_content", this.renderSpineItem, this)

	},

	// determine what the current spine item is and render it out
	renderSpineItem: function(renderToLast) {
		var book = this.model;
		var spineItem = book.packageDocument.currentSpineItem();

		if(this.shouldRenderAsFixed(spineItem)) {
			this.v = new Readium.Views.FixedPaginationView({model: book});
		}
		else {
			if(this.shouldScroll()) {
				this.v = new Readium.Views.ScrollingPaginationView({model: book});
			}
			else {
				this.v = new Readium.Views.ReflowablePaginationView({model: book});
			}
		}
		this.v.render(this.renderToLastPage);
	},

	shouldRenderAsFixed: function(spineItem) {
		if(typeof spineItem.properties.fixed_flow !== "undefined") {
			return spineItem.properties.fixed_flow;
		}
		return this.model.isFixedLayout;
	},

	shouldScroll: function() {
		var optionString = localStorage["READIUM_OPTIONS"];
		var options = (optionString && JSON.parse(optionString) ) || {"singleton": {}};
		return !options["singleton"]["paginate_everything"];
	}
	
});