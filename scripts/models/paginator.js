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

		var spine_pos = this.model.packageDocument.get("spine_position");
		var page_index = this.rendered_spine_positions.indexOf(spine_pos);

		if(page_index > -1) {
			this.model.goToPage(page_index + 1);
			this.model.savePosition();
		}
		else {
			this.model.spinePositionChangedHandler();		
		}
		
	},

	decreasedSpinePosHandler: function() {
		this.renderToLastPage = true;
		var spine_pos = this.model.packageDocument.get("spine_position");

		if(this.rendered_spine_positions.indexOf(spine_pos)  > -1) {
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


		var spineItem = book.getCurrentSection();
		if(this.shouldRenderAsFixed(spineItem)) {
			this.should_two_up = book.get("two_up");
			book.set("two_up", false);
			//this.rendered_spine_positions.push(spine_position);
			this.v = new Readium.Views.FixedPaginationView({model: book});

			// add any consecutive fixed layout sections
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
			book.goToPage(page);
			book.set("pages_are_spine_items", true);
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
			book.set("pages_are_spine_items", false);
		}
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