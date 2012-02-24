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

	initialize: function() {
		this.packageDocument = new Readium.Models.PackageDocument({
			file_path: "some path"
		});
		this.packageDocument.on("change:spine_position", this.spinePositionChangedHandler);
		//this.packageDocument.fetch();
	},

	defaults: {
    	"current_page":  1,
    	"num_pages": 0,
    	"two_up": false,
    	"full_screen": false
  	},

	spinePositionChangedHandler: function() {
		this.trigger("changed_spine");
	},

	toggleTwoUp: function() {
		var twoUp = this.get("two_up");
		this.set({two_up: !twoUp});
	},

	toggleFullScreen: function() {
		var fullScreen = this.get("full_screen");
		this.set({full_screen: !fullScreen});
	},
/*
	"#show-toc-button": this.model.toggleToc,
	"#increase-font-button": this.model.increaseFont,
	"#decrease-font-button": this.model.decreaseFont,
	"#fullscreen-button": this.model.toggleFullScreen,
	*/
	
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

	resolvePath: function(path) {
		var suffix;
		if(path.indexOf("../") === 0) {
			suffix = path.substr(3);
		}
		else {
			suffix = path;
		}
		var ind = _properties.package_doc_path.lastIndexOf("/")
		return _properties.package_doc_path.substr(0, ind) + "/" + suffix;
	},
		
	resolveUrl: function(path) {
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