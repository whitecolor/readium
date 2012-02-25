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
		this.packageDocument = new Readium.Models.PackageDocument({}, {
			file_path: this.get("package_doc_path")
		});
		this.packageDocument.on("change:spine_position", this.spinePositionChangedHandler, this);
		this.packageDocument.fetch();
		
	},

	defaults: {
		"font_size": 10,
    	"current_page":  1,
    	"num_pages": 0,
    	"two_up": false,
    	"full_screen": false,
    	"current_content": "loading...", // should I really be setting a default?
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
		this.set({two_up: !twoUp});
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

	},
	
	prevPage: function() {
		var pageNum = this.get("current_page") - 1;
		if( pageNum > 0) {
			this.set({current_page: pageNum });
		}
		else {
			this.packageDocument.goToPrevSection();
		}

	},
	
	nextPage: function() {
		var cp = this.get("current_page");
		var np = this.get("num_pages");
		if(cp < np) {
			this.set({current_page: (cp + 1) });
		}
		else {
			this.packageDocument.goToNextSection();
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

	getTocText: function(successCallback, failureCallback) {
		var path = this.packageDocument.getTocPath();
		if(!path) {
			failureCallback();
			return;
		}

		if(this.packageDocument.getTocType() === this.packageDocument.XHTML_MIME) {
			Readium.FileSystemApi(function(fs) {
				fs.readTextFile(resolvePath(path), function(result) { 
					var parser = new window.DOMParser();
					var dom = parser.parseFromString(result, 'text/xml');
					successCallback( $('body', dom).html() ); 
				}, failureCallback);
			});		
		}

		else if(this.packageDocument.getTocType() === this.packageDocument.NCX_MIME) {
			Readium.FileSystemApi(function(fs) {
				fs.readTextFile(resolvePath(path), function(result) { 
					buildTocHtml(result, successCallback) 
				}, failureCallback);
			});				
		}

		else {
			
		}

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


});


Readium.Models.ReflowableEbook = Readium.Models.EbookBase.extend({

	isFixedLayout: false,

});

Readium.Models.AppleFixedEbook = Readium.Models.EbookBase.extend({

	isFixedLayout: true,

});