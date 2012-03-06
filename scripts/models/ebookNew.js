if( !window.Readium ) {
	window.Readium = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		Utils: {}
	};
};

Readium.Models.EbookBase = Backbone.Model.extend({

	/* All these attrs are being passed in right now for historical reasons
			author: "Rudyard Kipling"
			cover_href: "/images/library/missing-cover-image.png"
			created_at: "2012-02-24T21:22:27.613Z"
			epub_version: "2.0"
			fixed_layout: false
			id: "urn:uuid:1EECAADE-E17A-11E0-90DD-014376811DC8"
			key: "069871a83831f401042cccc04d6ab714"
			lang: "en-us"
			open_to_spread: false
			package_doc_path: "069871a83831f401042cccc04d6ab714/OPS/content.opf"
			publisher: "epubBooks (www.epubbooks.com)"
			title: "Plain Tales from the Hills"
			updated_at: "2012-02-24T21:22:27.613Z"
	*/

	initialize: function() {
		var that = this;
		this.packageDocument = new Readium.Models.PackageDocument({}, {
			file_path: this.get("package_doc_path")
		});
		this.packageDocument.on("change:spine_position", this.spinePositionChangedHandler, this);
		this.packageDocument.fetch({
			success: function() {
				that.packageDocument.set({spine_position: 1});
			}
		});
		this.on("change:num_pages", this.adjustCurrentPage, this)
	},

	defaults: {
		"font_size": 10,
    	"current_page":  [1],
    	"num_pages": 0,
    	"two_up": false,
    	"full_screen": false,
  	},

	spinePositionChangedHandler: function() {
		var that = this;
		var sect = this.packageDocument.currentSection();
		var path = sect.get("href");
		path = this.resolvePath(path);
		Readium.FileSystemApi(function(api) {
			api.readTextFile(path, function(result) {
				that.set( {current_content: result} );
			}, function() {
				console.log("Failed to load file: " + path);
			})
		});
	},

	toggleTwoUp: function() {
		var twoUp = this.get("two_up");
		var displayed = this.get("current_page");
		var newPages = [];
		if(twoUp) {
			newPages[0] = displayed[1];
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
		// todo this is not the way to do this
		$('body').toggleClass('show-toc');
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

	savePosition: function() {
		Readium.Utils.setCookie(_properties.key, _packageDocument.getPosition(), 365);
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
		
	resolveUrl: function(path) {
		// this wont work
		return _rootUrl + resolvePath(path);
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

	getAllSectionTexts: function(sectionCallback, failureCallback, completeCallback) {
		var i = 0;
		var spine = this.packageDocument.getSpineArray();
		var thatFs;

		var callback = function(content, fileEntry) {
			sectionCallback(content);
			i += 1;
			if(i < spine.length) {
				thatFs.readTextFile(resolvePath(spine[i]), callback, failureCallback);
			}
			else {
				completeCallback();
			}
		
		};

		Readium.FileSystemApi(function(fs) {
			thatFs = fs;
			thatFs.readTextFile(resolvePath(spine[i]), callback, failureCallback);
		});

	},

	getAllSectionUris: function() {
		var temp = this.packageDocument.get("spine");
		for(var i = 0; i < temp.length; i++) {
			temp[i] = resolveUrl(temp[i]);
		}
		return temp;
	},

	goToHref: function(href) {
		// I dunno if this is the right way to do
		// this anymore.
		this.packageDocument.goToHref(href);
	},

	getProperties: function() {
		// TODO override TOJSON / SAVE
		return _properties;
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
	}
	
});


Readium.Models.ReflowableEbook = Readium.Models.EbookBase.extend({

	isFixedLayout: false,

	initialize: function() {
		// call the super ctor
		Readium.Models.EbookBase.prototype.initialize.call(this);
	},

	CreatePaginator: function() {
		return new Readium.Views.ReflowablePaginationView({model: _book});	
	}

});

Readium.Models.AppleFixedEbook = Readium.Models.EbookBase.extend({

	isFixedLayout: true,

	defaults: {
		"font_size": 10,
    	"current_page":  [1, 2],
    	"num_pages": 0,
    	"two_up": true,
    	"full_screen": false,
  	},

	initialize: function() {
		// call the super ctor
		Readium.Models.EbookBase.prototype.initialize.call(this);
	},

	CreatePaginator: function() {
		return new Readium.Views.FixedPaginationView({model: _book});	
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

	addMetaHeadTags: function(bookDom) {
		// the desktop does not obey meta viewport tags so
		// dynamically add in some css
		var tag = bookDom.getElementsByName("viewport")[0];
		if(tag) {
			var pageSize = parseViewportTag(tag);
			document.head.appendChild(tag);
			_paginator.setPageSize(pageSize.width, pageSize.height);
		}
		
	}

});