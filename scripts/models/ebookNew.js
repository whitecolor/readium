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
			file_path: "some path";
		});
		this.packageDocument.on("change:spine_position", spinePositionChangedHandler);
		this.packageDocument.fetch();
	},

	spinePositionChangedHandler: function() {
		// TODO fire and event?
	},

	resolvePath: resolvePath,
		
	resolveUrl: resolveUrl,
	
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