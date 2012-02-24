if( !window.Readium ) {
	window.Readium = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {}
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

	jath_template: {
		metadata:  { 
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
 * validated it one time, we don't care if it valid any more, we
 * just want to do our best to display it without failing
 */
Readium.Models.ValidatedPackageDocument = Readium.Models.PackageDocumentBase.extend({
	validate: function(attrs) {

	},

	toJSON: function() {
		return this.get("metadata");
	}
});

Readium.Models.EBook = Readium.Models.PackageDocumentBase.extend({


	// just want to make sure that we do not slip into an
	// invalid state
	validate: function(attrs) {
		var manifest = attrs.manifest || this.get("manifest");
		if(!manifest) {
			return "ERROR: All ebooks must have a manifest";
		}
		if(attrs.spine_position < 0 || attrs.spine_position >= manifest.length)	{
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

	currentSection: function() {
		return this.get("manifest").get(spine_position);
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
	}


});