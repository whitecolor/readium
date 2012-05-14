

Readium.Models.ManifestItem = Backbone.Model.extend({
	

	getCurrentSection: function(i) {
		// i is an optional arg, if it was not passed in default to 0
		i = i || 0; 
		var spine_index = i + this.packageDocument.get("spine_position");
		return this.buildSectionJSON(this.packageDocument.currentSection(i), spine_index);
	},

	parseMetaTags: function() {
		var parser = new window.DOMParser();
		var dom = parser.parseFromString(this.get('current_content'), 'text/xml');
		var tag = dom.getElementsByName("viewport")[0];
		if(tag) {
			var pageSize = this.parseViewportTag(tag);
			this.set({"meta_width": pageSize.width, "meta_height": pageSize.height})
			return {meta_width: pageSize.width, meta_height: pageSize.height};
		}
		return null;
	},

	parseViewportTag: function(viewportTag) {
		// this is going to be ugly
		var str = viewportTag.getAttribute('content');
		str = str.replace(/\s/g, '');
		var valuePairs = str.split(',');
		var values = {};
		var pair;
		for(var i = 0; i < valuePairs.length; i++) {
			pair = valuePairs[i].split('=');
			if(pair.length === 2) {
				values[ pair[0] ] = pair[1];
			}
		}
		values['width'] = parseFloat(values['width']);
		values['height'] = parseFloat(values['height']);
		return values;
	},

	// when the spine position changes we need to update the
	// state of this, this involes setting attributes that reflect
	// the current section's url and content etc, and then we need
	// to persist the position in a cookie
	spinePositionChangedHandler: function() {
		var that = this;
		var sect = this.packageDocument.currentSection();
		var path = sect.get("href");
		var url = this.packageDocument.resolveUri(path);;
		path = this.resolvePath(path);
		this.set("current_section_url", url);
		Readium.FileSystemApi(function(api) {
			api.readTextFile(path, function(result) {
				that.set( {content: result} );
			}, function() {
				console.log("Failed to load file: " + path);
			})
		});
	},
	
});

Readium.Models.SpineItem = Readium.Models.ManifestItem.extend({

	// this method creates the JSON representation of a manifest item
	// that is used to render out a page view.
	buildSectionJSON: function(manifest_item, spine_index) {
		if(!manifest_item) {
			return null;
		}
		var section = Object.create(null);
		section.width = this.get("meta_width") || 0;
		section.height = this.get("meta_height") || 0;
		section.uri = this.packageDocument.resolveUri(manifest_item.get('href'));
		section.page_class = this.getPositionClass(manifest_item, spine_index);
		return section;
	},

	// when rendering fixed layout pages we need to determine whether the page
	// should be on the left or the right in two up mode, options are:
	// 	left_page: 		render on the left side
	//	right_page: 	render on the right side
	//	center_page: 	always center the page horizontally
	getPositionClass: function(manifest_item, spine_index) {

		if(this.get("apple_fixed")) {
			// the logic for apple fixed layout is a little different:
			if(!this.get("open_to_spread")) {
				// page spread is disabled for this book
				return	"center_page"
			}
			else if(spine_index === 0) {
				// for ibooks, odd pages go on the right. This means
				// the first page (0th index) will always be on the right
				// without a left counterpart, so center it
				return "center_page";
			}
			else if (spine_index % 2 === 1 && 
				spine_index === this.packageDocument.get("spine").length ) {

				// if the last spine item in the book would be on the left, then
				// it would have no left counterpart, so center it
				return "center_page";
			}
			else {
				// otherwise first page goes on the right, and then alternate
				// left - right - left - right etc
				return (spine_index % 2 === 0 ? "right_page" : "left_page");
			}
		}
		else {
			return (spine_index % 2 === 0 ? "right_page" : "left_page");
		}
	},

	isFixedLayout: function() {
		debugger;
		return !!(this.get("fixed_flow")) || this.collection.isBookFixedLayout();// || this.collection.packageDocument.
	},

	shouldPreRender: function() {
		return false;
	}

});



Readium.Collections.ManifestItems = Backbone.Collection.extend({
	model: Readium.Models.ManifestItem
});

Readium.Collections.Spine = Backbone.Collection.extend({
	model: Readium.Models.SpineItem,

	isBookFixedLayout: function() {
		debugger;
		return this.packageDocument.get("book").isFixedLayout();
	}
});