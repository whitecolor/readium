Readium.Models.Ebook = Backbone.Model.extend({

	initialize: function() {
		var that = this;
		// the book's pages
		this.paginator = new Readium.Models.Paginator({book: this});

		this.packageDocument = new Readium.Models.PackageDocument({ book: that }, {
			file_path: this.get("package_doc_path")
		});
		//this.packageDocument.on("change:spine_position", this.spinePositionChangedHandler, this);
		this.packageDocument.fetch({
			success: function() {
				var pos = that.restorePosition();
				that.set("spine_position", pos);
				var items = that.paginator.renderSpineItems(false);
				that.set("rendered_spine_items", items);

				//that.packageDocument.set({spine_position: pos}); // TODO: get rid of this
				//that.packageDocument.trigger("change:spine_position"); // TODO: get rid of this
				
				that.set("has_toc", ( !!that.packageDocument.getTocItem() ) );
			}
		});
		this.on("change:num_pages", this.adjustCurrentPage, this);
		this.on("change:spine_position", this.savePosition, this);
		this.on("change:spine_position", this.setMetaSize, this);
	},

	save: function(attrs, options) {
		// TODO: this should be done properly with a backbone sync
		var ops = {
			success: function() {}
		}
		_.extend(ops,options);
		var that = this;
		this.set("updated_at", new Date());
		Lawnchair(function() {
			this.save(that.toJSON(), ops.success);
		});
	},

	defaults: {
		"font_size": 10,
    	"current_page": [1],
    	"num_pages": 0,
    	"two_up": false,
    	"full_screen": false,
    	"toolbar_visible": true,
    	"toc_visible": false,
    	"can_two_up": true,
    	"rendered_spine_items": [],
    	"current_theme": "default",
    	"current_margin": 3
    	//"spine_position": 0
  	},

  	toJSON: function() {

  		// only save attrs that should be persisted:
  		return {
			"apple_fixed": this.get("apple_fixed"),
			"author": this.get("author"),
			"cover_href": this.get("cover_href"),
			"created_at": this.get("created_at"),
			"current_theme": this.get("current_theme"),
			"description": this.get("description"),
			"epub_version": this.get("epub_version"),
			"fixed_layout": this.get("fixed_layout"),
			"id": this.get("id"),
			"key": this.get("key"),
			"language": this.get("language"),
			"layout": this.get("layout"),
			"modified_date": this.get("modified_date"),
			"ncx": this.get("ncx"),
			"open_to_spread": this.get("open_to_spread"),
			"orientation": this.get("orientation"),
			"package_doc_path": this.get("package_doc_path"),
			"page_prog_dir": this.get("page_prog_dir"),
			"paginate_backwards": this.get("paginate_backwards"),
			"pubdate": this.get("pubdate"),
			"publisher": this.get("publisher"),
			"rights": this.get("rights"),
			"spread": this.get("spread"),
			"src_url": this.get("src_url"),
			"title": this.get("title"),
			"updated_at": this.get("updated_at"),
			"current_theme": this.get("current_theme"),
			"current_margin": this.get("current_margin"),
			"font_size": this.get("font_size"),
			"two_up": this.get("two_up")
		};
	},

	toggleTwoUp: function() {
		if(this.get("can_two_up")) {
			var twoUp = this.get("two_up");
			var displayed = this.get("current_page");
			var newPages = [];
			if(twoUp) {
				if (displayed[0] === 0) {
					newPages[0] = 1;
				} else {
					newPages[0] = displayed[0];
				}
			}
			else if(displayed[0] % 2 === 0) {
				newPages[0] = displayed[0];
				newPages[1] = displayed[0] + 1;
			}
			else {
				newPages[0] = displayed[0] - 1;
				newPages[1] = displayed[0];
			}
			this.set({two_up: !twoUp, current_page: newPages});
		}	
	},

	toggleFullScreen: function() {
		var fullScreen = this.get("full_screen");
		this.set({full_screen: !fullScreen});
	},

	increaseFont: function() {
		var size = this.get("font_size");
		this.set({font_size: size + 1})
	},

	decreaseFont: function() {
		var size = this.get("font_size");
		this.set({font_size: size - 1})
	},

	toggleToc: function() {
		var vis = this.get("toc_visible");
		this.set("toc_visible", !vis);
	},
	
	prevPage: function() {
		var curr_pg = this.get("current_page");
		var lastPage = curr_pg[0] - 1;

		if(curr_pg[0] <= 1) {
			this.goToPrevSection();
		}
		else if(!this.get("two_up")){
			this.set("current_page", [lastPage]);
			if(this.get("rendered_spine_items").length > 1) {
				var pos = this.get("rendered_spine_items")[lastPage - 1];
				this.set("spine_position", pos);
			}
		}
		else {
			this.set("current_page", [lastPage - 1, lastPage]);
			if(this.get("rendered_spine_items").length > 1) {

				var ind = (lastPage > 1 ? lastPage - 2 : 0);
				var pos = this.get("rendered_spine_items")[ind];
				this.set("spine_position", pos);
			}
		}
	},
	
	nextPage: function() {
		var curr_pg = this.get("current_page");
		var firstPage = curr_pg[curr_pg.length-1] + 1;
		if (curr_pg[curr_pg.length-1] >= this.get("num_pages") ) {
			this.goToNextSection();
		}
		else if(!this.get("two_up")){
			this.set("current_page", [firstPage]);
			if(this.get("rendered_spine_items").length > 1) {
				var pos = this.get("rendered_spine_items")[firstPage - 1];
				this.set("spine_position", pos);
			}
		}
		else {
			this.set("current_page", [firstPage, firstPage+1]);
			if(this.get("rendered_spine_items").length > 1) {
				var pos = this.get("rendered_spine_items")[firstPage - 1];
				this.set("spine_position", pos);
			}
		}
	},

	goToLastPage: function() {
		var page = this.get("num_pages");
		this.goToPage(page);
	},

	goToPage: function(page) {
		if(this.get("two_up")) {
			if(page % 2 === 0) { // this logic needs to be smartened up
				this.set("current_page", [page, page + 1]);	
			}
			else {
				this.set("current_page", [page - 1, page]);
			}
		}
		else {
			this.set("current_page", [page])
		}
	},

	restorePosition: function() {
		var pos = Readium.Utils.getCookie(this.get("key"));
		return parseInt(pos, 10) || 0;
	},

	savePosition: function() {
		Readium.Utils.setCookie(this.get("key"), this.get("spine_position"), 365);
	},

	resolvePath: function(path) {
		return this.packageDocument.resolvePath(path);
	},

	adjustCurrentPage: function() {
		var cp = this.get("current_page");
		var num = this.get("num_pages");
		var two_up = this.get("two_up");
		if(cp[cp.length - 1] > num) {
			this.goToLastPage();
		}
	},	
	
	goToNextSection: function() {
		// Is this check even necessary?
		// I think package doc validations takes care of it
		if(this.hasNextSection() ) {
			var pos = this.get("spine_position");
			this.setSpinePos(pos + 1);
		}
	},
	
	goToPrevSection: function() {
		// Is this check even necessary?
		// I think package doc validations takes care of it
		if(this.hasPrevSection() ) {
			var pos = this.get("spine_position");
			this.setSpinePosBackwards(pos - 1);	
		}
	},

	hasNextSection: function() {
		return this.get("spine_position") < (this.packageDocument.spineLength() - 1);
	},

	hasPrevSection: function() {
		return this.get("spine_position") > 0;
	},

	setSpinePos: function(pos) {
		if(pos < 0 || pos >= this.packageDocument.spineLength()) {
			// invalid position
			return;
		}
		var spineItems = this.get("rendered_spine_items");
		this.set("spine_position", pos);
		if(spineItems.indexOf(pos) >= 0) {
			// the spine item is already on the page
			if(spineItems.length > 1) {
				// we are in fixed layout state, one spine item per page
				this.goToPage(spineItems.indexOf(pos) + 1);
			}
			// else nothing to do, because the section is already rendered out
			
		}
		else {
			// the section is not rendered out, need to do so
			var items = this.paginator.renderSpineItems(false);
			this.set("rendered_spine_items", items);	
		}
		
	},

	setSpinePosBackwards: function(pos) {
		if(pos < 0 || pos >= this.packageDocument.spineLength()) {
			// invalid position
			return;
		}
		this.set("spine_position", pos);
		if(this.get("rendered_spine_items").indexOf(pos) >= 0) {
			// the spine item is already on the page, nothing to do
			return;
		}
		var items = this.paginator.renderSpineItems(true);
		this.set("rendered_spine_items", items);
	},

	goToHref: function(href) {
		// URL's with hash fragments require special treatment, so
		// firs thing is to split off the hash frag from the reset
		// of the url:
		var splitUrl = href.match(/([^#]*)(?:#(.*))?/);

		// handle the base url first:
		if(splitUrl[1]) {
			var spine_pos = this.packageDocument.spineIndexFromHref(splitUrl[1]);
			this.setSpinePos(spine_pos);
		}

		// now try to handle the fragment if there was one,
		if(splitUrl[2]) {
			// just set observable property to broadcast event
			// to anyone who cares
			this.set({hash_fragment: splitUrl[2]});
		}
		
	},

	changPageNumber: function(num) {
		var cp = this.get("current_page");
		var np = [];
		var diff = num - cp[cp.length - 1];
		if( diff > 0 ) {
			diff = 0;
		}
		for(var i = 0; i < cp.length; i++) {
			np[i] = cp[i] + diff;	
		}
		this.set({num_pages: num, current_page: np});
	},

	getToc: function() {
		var item = this.packageDocument.getTocItem();
		if(!item) {
			return null;
		}
		else {
			var that = this;
			return Readium.Models.Toc.getToc(item, {
				file_path: that.resolvePath(item.get("href")),
				book: that,
			});
		}
	},

	setMetaSize: function() {

		if(this.meta_section) {
			this.meta_section.off("change:meta_height", this.setMetaSize);
		}
		this.meta_section = this.getCurrentSection();
		if(this.meta_section.get("meta_height")) {
			this.set("meta_size", {
				width: this.meta_section.get("meta_width"),
				height: this.meta_section.get("meta_height")
			});
		}
		this.meta_section.on("change:meta_height", this.setMetaSize, this);
	},

	// when the spine position changes we need to update the
	// state of this, this involes setting attributes that reflect
	// the current section's url and content etc, and then we need
	// to persist the position in a cookie
	spinePositionChangedHandler: function() {
		var that = this;
		var sect = this.getCurrentSection();
		var path = sect.get("href");
		var url = this.packageDocument.resolveUri(path);;
		path = this.resolvePath(path);
		this.set("current_section_url", url);
		Readium.FileSystemApi(function(api) {
			api.readTextFile(path, function(result) {
				that.set( {current_content: result} );
			}, function() {
				console.log("Failed to load file: " + path);
			})
		});
		
		// save the position
		this.savePosition();
	},

	getCurrentSection: function(offset) {
		if(!offset) {
			offset = 0;
		}
		var spine_pos = this.get("spine_position") + offset;
		return this.packageDocument.getSpineItem(spine_pos);
	},

	playMo: function() {
		var mo = this.getCurrentSection().getMediaOverlay();
		if(mo) {
			this.set("mo_playing", mo);
			var that = this;
			mo.on("change:current_text_document_url", function () {
				that.goToHref(mo.get("current_text_document_url"));
			});
			mo.on("change:current_text_element_id", function () {
				var frag = mo.get("current_text_element_id")
				that.set("hash_fragment", frag);
				that.set("current_mo_frag", frag);
			});
            if (mo.get("has_started_playback")) {
                mo.resume();
            }
            else {
                mo.startPlayback(null);
            }
		}
		else {
			alert("Sorry, the current EPUB does not contain a media overlay for this content");
		}
	},

	pauseMo: function() {
		var mo = this.get("mo_playing");
		if(mo) {
			mo.off();
			mo.pause();
			this.set("mo_playing", null);
		}
	},

	// is this book set to fixed layout at the meta-data level
	isFixedLayout: function() {
		return this.get("fixed_layout") || this.get("apple_fixed");
	}
	
});
