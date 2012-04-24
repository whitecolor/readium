Readium.Models.Ebook = Backbone.Model.extend({

	initialize: function() {
		var that = this;
		this.isFixedLayout = this.get("fixed_layout");
		this.packageDocument = new Readium.Models.PackageDocument({}, {
			file_path: this.get("package_doc_path")
		});
		//this.packageDocument.on("change:spine_position", this.spinePositionChangedHandler, this);
		this.packageDocument.fetch({
			success: function() {
				// TODO: restore location here
				that.packageDocument.set({spine_position: that.restorePostition()});
				that.packageDocument.trigger("change:spine_position");
				that.set("has_toc", (!!that.packageDocument.getTocItem() ) );
			}
		});
		this.on("change:num_pages", this.adjustCurrentPage, this);
	},

	defaults: {
		"font_size": 10,
    	"current_page": [1],
    	"num_pages": 0,
    	"two_up": false,
    	"full_screen": false,
    	"toolbar_visible": true,
    	"toc_visible": false,
  	},

	toggleTwoUp: function() {
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
			this.packageDocument.goToPrevSection();
		}
		else if(!this.get("two_up")){
			this.set("current_page", [lastPage]);
		}
		else {
			this.set("current_page", [lastPage - 1, lastPage]);
		}
	},
	
	nextPage: function() {
		var curr_pg = this.get("current_page");
		var firstPage =curr_pg[curr_pg.length-1] + 1;
		if (curr_pg[curr_pg.length-1] >= this.get("num_pages") ) {
			this.packageDocument.goToNextSection();
		}
		else if(!this.get("two_up")){
			return this.set("current_page", [firstPage]);
		}
		else {
			return this.set("current_page", [firstPage, firstPage+1]);
		}
	},
	
	goToFirstPage: function() {
		if( this.get("two_up") ) {
			this.set("current_page", [0,1])
		}
		else {
			this.set("current_page", [1]);
		} 
	},

	goToLastPage: function() {
		var page = this.get("num_pages");

		if( this.get("two_up") ) {
			this.set("current_page", [page-1, page])
		}
		else {
			this.set("current_page", [page])
		}
	},

	restorePostition: function() {
		var pos = Readium.Utils.getCookie(this.get("key"));
		return parseInt(pos, 10) || 0;
	},

	savePosition: function() {
		Readium.Utils.setCookie(this.get("key"), this.packageDocument.get("spine_position"), 365);
	},

	// TODO: do move this into package doc class (no sense it being here)
	resolvePath: function(path) {
		var suffix;
		var pack_doc_path = this.packageDocument.file_path;
		if(path.indexOf("../") === 0) {
			suffix = path.substr(3);
		}
		else {
			suffix = path;
		}
		var ind = pack_doc_path.lastIndexOf("/")
		return pack_doc_path.substr(0, ind) + "/" + suffix;
	},

	adjustCurrentPage: function() {
		var cp = this.get("current_page");
		var num = this.get("num_pages");
		var two_up = this.get("two_up")
		if(cp[cp.length - 1] > num) {
			this.goToLastPage();
		}
	},	
	
	goToNextSection: function() {
		// Is this check even necessary?
		// I think package doc validations takes care of it
		if(this.packageDocument.hasNextSection() ) {
			this.packageDocument.goToNextSection();	
		}
	},
	
	goToPrevSection: function() {
		// Is this check even necessary?
		// I think package doc validations takes care of it
		if(this.packageDocument.hasPrevSection() ) {
			this.packageDocument.goToPrevSection();		
		}
	},
	
	getSectionText: function(successCallback, failureCallback) {
		var path = this.packageDocument.currentSection();
		Readium.FileSystemApi(function(fs) {
			fs.readTextFile(resolvePath(path), successCallback, failureCallback);
		});
	},

	goToHref: function(href) {
		this.packageDocument.goToHref(href);
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

	goToPage: function(page) {
		if(this.get("two_up")) {
			if(page % 2 === 0) {
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

	spinePositionChangedHandler: function() {
		var that = this;
		var sect = this.packageDocument.currentSection();
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

	buildSectionJSON: function(manifest_item) {
		if(!manifest_item) {
			return null;
		}
		var section = {};
		section.width = this.get("meta_width") || 0;
		section.height = this.get("meta_height") || 0;
		section.uri = this.packageDocument.resolveUri(manifest_item.get('href'));

		return section;
	},

	getAllSections: function() {
		var spine = this.packageDocument.getResolvedSpine();
		var sections = [];
		for(var i = 0; i < spine.length; i++) {
			sections.push(this.buildSectionJSON( spine[i] ));
		}
		return sections;
	},

	getCurrentSection: function(i) {
		return this.buildSectionJSON(this.packageDocument.currentSection(i));
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

	CreatePaginator: function() {
    	return new Readium.Models.Paginator({book: this});
	},
	
});
