Readium.Models.Paginator = Backbone.Model.extend({

	renderToLastPage: false,
	
	initialize: function() {

		this.rendered_spine_positions = [];
		this.model = this.get("book");
		
		// keep track of which direction we are moving through the publication
		this.model.packageDocument.on("increased:spine_position", this.increasedSpinePosHandler, this);
		this.model.packageDocument.on("decreased:spine_position", this.decreasedSpinePosHandler, this);

		// whenever current content changes it means, the spine item has been changed
		// and it is loaded up and ready to go
		this.model.on("change:current_content", this.renderSpineItem, this);

	},

	increasedSpinePosHandler: function() {
		this.renderToLastPage = false;

		if(this.rendered_spine_positions.indexOf(this.model.get("spine_position"))  > -1) {
			var sp = this.rendered_spine_positions[this.rendered_spine_positions.length - 1] + 1;
			if(sp <  this.model.packageDocument.get("spine").length) {
				this.model.packageDocument.set("spine_position", sp );	
			}
		}
		else {
			this.model.spinePositionChangedHandler();		
		}
		
	},

	decreasedSpinePosHandler: function() {
		this.renderToLastPage = true;
		if(this.rendered_spine_positions.indexOf(this.model.packageDocument.get("spine_position"))  > -1) {
			var sp = this.rendered_spine_positions[0] - 1;
			if(sp >= 0) {
				this.model.packageDocument.set("spine_position", sp);	
			}
		}
		else {
			this.model.spinePositionChangedHandler();	
		}
		
	},


	// determine what the current spine item is and render it out
	renderSpineItem: function(renderToLast) {
		var book = this.model;
		var spine_position = book.packageDocument.get("spine_position");
		if(this.rendered_spine_positions.indexOf(spine_position) > -1) {
			// the current spine position is already rended
			return;
		}
		// we are going to clear everything out and start from scratch
		this.rendered_spine_positions = [];

		// clean up the old view if there is one
		if(this.v) {
			this.v.destruct();
		}


		var spineItem = book.packageDocument.currentSpineItem();
		if(this.shouldRenderAsFixed(spineItem)) {
			this.should_two_up = book.get("two_up");
			book.set("two_up", false);
			this.rendered_spine_positions.push(spine_position);
			this.v = new Readium.Views.FixedPaginationView({model: book});

			// add any consecutive fixed layout sections
			this.v.render();

			var pageNum = 1; // we have added one so far
			var offset = this.findPrerenderStart();

			while( this.shouldPreRender(book.packageDocument.currentSpineItem(offset)) ) {
				this.v.addPage(book.getCurrentSection(offset), pageNum );
				this.rendered_spine_positions.push(spine_position + offset);
				pageNum += 1;
				offset += 1;
				if(offset === 0) {
					book.set("current_page", [pageNum]);
				}
			}
		}
		else {
			if(this.shouldScroll()) {
				this.v = new Readium.Views.ScrollingPaginationView({model: book});
			}
			else {
				if(this.should_two_up) {
					book.set("two_up", true);
				}
				this.v = new Readium.Views.ReflowablePaginationView({model: book});
			}
			this.v.render(this.renderToLastPage);
			this.rendered_spine_positions.push(spine_position);
		}
	},

	findPrerenderStart: function() {
		var i = 0;
		var pd = this.model.packageDocument;
		while ( this.shouldPreRender(pd.currentSpineItem(i-1)) ) {
			i -= 1;
		}
		return i;
	},

	shouldRenderAsFixed: function(spineItem) {
		if(typeof spineItem.properties.fixed_flow !== "undefined") {
			return spineItem.properties.fixed_flow;
		}
		return this.model.isFixedLayout;
	},

	shouldPreRender: function(sec) {
		return sec && this.shouldRenderAsFixed(sec);
	},

	shouldScroll: function() {
		var optionString = localStorage["READIUM_OPTIONS"];
		var options = (optionString && JSON.parse(optionString) ) || {"singleton": {}};
		return !options["singleton"]["paginate_everything"];
	}
	
});