if( !window.Readium ) {
	window.Readium = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		Utils: {}
	};
}

Readium.Models.ManifestItem = Backbone.Model.extend({});

Readium.Collections.ManifestItems = Backbone.Collection.extend({
	model: Readium.Models.ManifestItem,
});

/**
 * This is root of all PackageDocument subclasses and the EBook class
 * it, contains only the logic for parsing a packagedoc.xml and 
 * convert the data to JSON.
 */
Readium.Models.PackageDocumentBase = Backbone.Model.extend({
	
	initialize: function(attributes, options) {
		if(options && options.file_path) {
			this.file_path = options.file_path; 	
		}
		
			
    },

	// todo: Cover image? is identifier ok?
	jath_template: {
		metadata:  { 
			id: "//def:metadata/dc:identifier",
			version: "//def:package/@version",
			title: "//def:metadata/dc:title",
			creator: "//def:metadata/dc:creator",
			publisher: "//def:metadata/dc:publisher",
			description: "//def:metadata/dc:description",
			rights: "//def:metadata/dc:rights",
			language: "//def:metadata/dc:language",
		 },

		manifest: [ "//def:item", { 
			id: "@id",
			href: "@href",
			media_type: "@media-type"
		} ],
							 
		spine: [ "//def:itemref", { idref: "@idref" } ],

		bindings: ["//def:bindings/def:mediaType", { 
			handler: "@handler",
			media_type: "@media-type"
		} ]
	},
	
	parse: function(xmlDom) {
		var json;
		var manifest;
		if(typeof(xmlDom) === "string" ) {
			var parser = new window.DOMParser;
      		xmlDom = parser.parseFromString(xmlDom, 'text/xml');
		}
		
		Jath.resolver = function( prefix ) {
    		var mappings = { 
	    		def: "http://www.idpf.org/2007/opf",
    			dc: "http://purl.org/dc/elements/1.1/" 
    		};
    		return mappings[ prefix ];
		}

		json = Jath.parse( this.jath_template, xmlDom);
		json.manifest = new Readium.Collections.ManifestItems(json.manifest);
		return json;
	}

});

/**
 * Used to validate a freshly unzipped package doc. Once we have 
 * validated it one time, we don't care if it is valid any more, we
 * just want to do our best to display it without failing
 */
Readium.Models.ValidatedPackageDocument = Readium.Models.PackageDocumentBase.extend({
	validate: function(attrs) {

	},

	toJSON: function() {
		return this.get("metadata");
	}
});

/**
 * The working package doc, used to to navigate a package document
 * vai page turns, cfis, etc etc
 */
Readium.Models.PackageDocument = Readium.Models.PackageDocumentBase.extend({


	initialize: function(attributes, options) {
		// TODO make this a call to the super ctor
		//Readium.Models.PackageDocument.prototype.initialize.call(this, attributes, options);
		if(options && options.file_path) {
			this.file_path = options.file_path; 	
		}
		this.on('change:spine_position', this.onSpinePosChanged);
		var that = this;
		Readium.FileSystemApi(function(api) {
			api.getFsUri(that.file_path, function(uri) {
				that.uri_obj = new URI(uri);
			})
		});
    },

    onSpinePosChanged: function() {
    	if( this.get("spine_position") > this.previous("spine_position") ) {
    		this.trigger("increased:spine_position");
    	}
    	else {
    		this.trigger("decreased:spine_position");
    	}
    },


	// just want to make sure that we do not slip into an
	// invalid state
	validate: function(attrs) {
		
		if( !( attrs.manifest || this.get("manifest") ) ) {
			return "ERROR: All ePUBs must have a manifest";
		}

		//validate the spine exists and the position is valids
		var spine = attrs.spine || this.get("spine") ;
		if( !spine ) {
			return "ERROR: All ePUBs must have a spine";
		}
		if(attrs.spine_position < 0 || attrs.spine_position >= spine.length)	{
			return "ERROR: invalid spine position";
		}
	},

	// not sure what these were for but here they are...
	XHTML_MIME: "application/xhtml+xml",	
	NCX_MIME: "application/x-dtbncx+xml",

	sync: BBFileSystemSync,

	defaults: {
		spine_position: 0
	},

	getManifestItem: function(spine_position) {
		var target = this.get("spine")[spine_position];
		var node = this.get("manifest").find(function(x) { 
					if(x.get("id") === target.idref) return x;
				});
		return node;
	},

	currentSection: function() {
		var spine_pos = this.get("spine_position");
		return this.getManifestItem(spine_pos);
	},

	hasNextSection: function() {
		return this.get("spine_position") < (this.get("spine").length - 1);
	},

	hasPrevSection: function() {
		return this.get("spine_position") > 0;
	},

	goToNextSection: function() {
		var cp = this.get("spine_position");
		this.set({spine_position: (cp + 1) });
	},

	goToPrevSection: function() {
		var cp = this.get("spine_position");
		this.set({spine_position: (cp - 1) });	
	},

	goToHref: function(href) {
		var spine = this.get("spine");
		var manifest = this.get("manifest");
		var node = manifest.find(function(x) { 
					if(x.get("href") === href) return x;
				});

		// didn't find the spine node, href invalid
		if(!node) {
			return null;
		}

		var id = node.get("id");
		
		for(var i = 0; i < spine.length; ++i ) {
			if(spine[i].idref === id) {
				this.set({spine_position: i});
				break;
			}
		}
	},

	getResolvedSpine: function() {
		var spine_length = this.get("spine").length;
		var res_spine = [];
		for(var i = 0; i < spine_length; i++) {
			res_spine.push( this.getManifestItem(i) );
		}
		return res_spine;
	},

	resolveUri: function(rel_uri) {
		uri = new URI(rel_uri);
		return uri.resolve(this.uri_obj).toString();
	},

	/* TODO getTOC()
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
	*/


});