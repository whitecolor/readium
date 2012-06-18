Readium.Models.Paginator = Backbone.Model.extend({

	renderToLastPage: false,
	
	initialize: function() {

		this.rendered_spine_positions = [];
		this.model = this.get("book");
	},

	// determine what the current spine item is and render it out
	renderSpineItems: function(renderToLast) {
		var book = this.model;
		var spine_position = book.get("spine_position");
		var that = this;
		
		// we are going to clear everything out and start from scratch
		this.rendered_spine_positions = [];

		// clean up the old view if there is one
		if(this.v) {
			this.v.destruct();
		}


		var spineItem = book.getCurrentSection();
		if(this.shouldRenderAsFixed(spineItem)) {
			this.should_two_up = book.get("two_up");
			
			//this.rendered_spine_positions.push(spine_position);
			this.v = new Readium.Views.FixedPaginationView({model: book});

			// throw down the UI
			this.v.render();

			var pageNum = 1; // start from page 1
			var offset = this.findPrerenderStart();

			while( this.shouldPreRender( this.model.getCurrentSection(offset) ) ) {
				this.v.addPage(book.getCurrentSection(offset), pageNum );
				this.rendered_spine_positions.push(spine_position + offset);
				pageNum += 1;
				offset += 1;
			}

			// set the page we should be on
			var page = this.rendered_spine_positions.indexOf(spine_position) + 1;
			book.set("num_pages", pageNum - 1);
			book.goToPage(page);
			setTimeout(function() {
				that.v.setContainerSize();
			}, 5);
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
			this.v.render(!!renderToLast);
			this.rendered_spine_positions.push(spine_position);
		}
		return this.rendered_spine_positions;
	},

	findPrerenderStart: function() {
		var i = 0;
		while( this.shouldPreRender( this.model.getCurrentSection(i) ) ) {
			i -= 1;
		}
		return i + 1; // sloppy fix for an off by one error
	},

	shouldRenderAsFixed: function(spineItem) {
		return spineItem.isFixedLayout();
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