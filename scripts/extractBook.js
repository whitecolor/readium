if(typeof Readium.FileSystemApi === "undefined") {
	throw "ExtractBook holds Readium::FileSystemApi as a dependency";
}

if(typeof Readium.Utils.MD5 === "undefined" ) {
	throw "Extract holds Readium::Utils::MD5 as a dependency";
}

Readium.Models.BookExtractorBase = Backbone.Model.extend({
	// Constants
	MIMETYPE: "mimetype",
	CONTAINER: "META-INF/container.xml",
	EPUB3_MIMETYPE: "application/epub+zip",
	DISPLAY_OPTIONS:"META-INF/com.apple.ibooks.display-options.xml",

	defaults: {
		task_size: 100,
		progress: 1,
		extracting: false,
		log_message: "Fetching epub file"
	},

	 // delete any changes to file system in the event of error, etc.
	clean: function() {
		this.removeHandlers();
		if(this.fsApi) {
			this.fsApi.rmdir(this.urlHash);
		}
	},


});


// This method takes a url for an epub, unzips it and then
// writes its contents out to disk.
Readium.Models.ZipBookExtractor = Readium.Models.BookExtractorBase.extend({

	initialize: function() {
		var url = this.get("url");
		if(!url) {
			throw "A URL to a zip file must be specified"
		}
		else {
			this.urlHash = Readium.Utils.MD5(url + (new Date()).toString());	
		}	
	},

	getPath: function(entry) {
		return this.urlHash + "/" + entry.name;
	},
		
	extractEntryByName: function(name, callback) {
		var found = false;
		for (var i=0; i < this.zip.entries.length; i++) {
			if(this.zip.entries[i].name === name) {
				found = true;
				this.zip.entries[i].extract(callback);
				break;
			}
		}
		if(!found) {
			throw ("asked to extract non-existent zip-entry: " + name);
		}
	},
	
	parseContainerRoot: function() {
		var that = this;
		var cb = function(entry, content) {
			if(typeof content === "string") {
				var rootFile = that.get("root_file_path");
				that.packageDoc = new Readium.Models.ValidatedPackageMetaData({
					key: that.urlHash
				}, {
					file_path: that.urlHash + "/" + rootFile,
					root_url: that.get("root_url") + "/" + rootFile
				});
				that.packageDoc.reset(content);
				that.set("zip_position", 0);
			}
		}
				
		try {
			this.extractEntryByName(this.get("root_file_path"), cb);				
		} catch(e) {
			this.set("error", e)
		}
		
	},
	
	parseMetaInfo: function(zip) {
		var that = this;
		var callback = function(entry, content) {
				
			var parser = new window.DOMParser();
			var xmlDoc = parser.parseFromString(content, "text/xml");
			var rootFiles = xmlDoc.getElementsByTagName("rootfile");

			if(rootFiles.length !== 1) {
				that.set("error", "Error processing " + CONTAINER);
			}
			else {
				if (rootFiles[0].hasAttribute("full-path")) {
					that.set("root_file_path", rootFiles[0].attributes["full-path"].value);
				}
				else {
					that.set("error", "Error: could not find package rootfile");
				}				
			}
		}
		
		try {
			this.extractEntryByName(this.CONTAINER, callback);
		} catch (e) {
			this.set("error", e);
		}

	},
		
	checkMimetype: function(zip) {
		var that = this;
		var validateCallback = function(entry, content) {
			if($.trim(content) === that.EPUB3_MIMETYPE) {
				that.trigger("validated:mime");
			} else {
				that.set("error", "Invalid mimetype discovered. Progress cancelled.");
			}
		}
		try {
			this.extractEntryByName(this.MIMETYPE, validateCallback);			
		} catch (e) {
			this.set("error", e);
		}

	},
	
	validateZip: function() {
		// set the task
		// weak test, just make sure MIMETYPE and CONTAINER files are where expected
		var entries = this.zip.entryNames;
		if(entries.indexOf(this.MIMETYPE) >= 0 && entries.indexOf(this.CONTAINER) >= 0) {
			this.trigger("validated:zip");
		}
		else {
			this.set("error", "File does not appear to be a valid EPUB. Progress cancelled."); 
		}
		
	},
	
	unpackBook: function() {
		var entry;
		var zip = this.zip;
		var i = this.get("zip_position");
		var that = this;
		
		if( i === zip.entries.length) {
			this.set("log_message", "Unpacking process completed successfully!");
			this.set("patch_position", 0)
			
		} 
		else {
			entry = zip.entries[i];
			if( entry.name.substr(-1) === "/" ) {
				that.set("zip_position", i + 1);
			}
			else {
				this.set("log_message", "extracting: " + entry.name);
				entry.extract(function(entry, content) {
					if(entry.name.indexOf(that.DISPLAY_OPTIONS) >= 0) {
						that.packageDoc.parseIbooksDisplayOptions(content);
					}

					that.fsApi.writeFile(that.getPath(entry), content, function() {
						that.set("zip_position", i + 1);
					} , function() {
						that.set("error", "ERROR: durring unzipping process failed");
					});
				});
			}
		}
	},

	correctURIs: function() {
		var entry;
		var that = this;
		var i = this.get("patch_position");
		var zip = this.zip;
		
		var monkeypatchingFailed = function() {
			that.set("failure", "ERROR: unkown problem durring unpacking process");
		};

		var getUrl = function(entry) {
			return that.get("root_url") + "/" + entry.name;
		};
		
		if( i === zip.entries.length) {
			this.set("log_message", "Unpacking process completed successfully!");
			// HUZZAH We did it, now save the meta data
			this.packageDoc.save({}, {
				success: function() {
					that.trigger("extraction_success");
				},
				failure: monkeypatchingFailed
			});		
		} 
		else {
			entry = zip.entries[i];
			if( entry.name.substr(-1) === "/" ) {
				this.set("patch_position", i + 1);
			}
			else {
				this.set("log_message", "monkey patching: " + entry.name);
				monkeyPatchUrls(getUrl(entry), function() {
						that.set("patch_position", i + 1);
					}, monkeypatchingFailed);
			}
		}
	},

	removeHandlers: function() {
		this.off();
	},

	extraction_complete: function() {
		this.set("extracting", false);
	},
	
	extract: function() {

		// set up all the callbacks
		this.on("initialized:zip", this.validateZip, this);
		this.on("validated:zip", this.checkMimetype, this);
		this.on("validated:mime", this.parseMetaInfo, this);
		this.on("change:root_file_path", this.parseContainerRoot, this);
		this.on("change:zip_position", this.unpackBook, this);
		this.on("change:patch_position", this.correctURIs, this);
		this.on("change:failure", this.clean, this);
		this.on("change:failure", this.removeHandlers, this);

		// set up callbacks for reporting progess
		this.on("change:task_size", this.update_progress, this);
		this.on("change:zip_position", this.update_progress, this);
		this.on("change:patch_position", this.update_progress, this);
		this.on("extraction_success", this.extraction_complete, this);

		// fire the event that says started
		this.set("extracting", true);

		// initialize the FS and begin process
		var that = this;
		Readium.FileSystemApi(function(fs){
			that.fsApi = fs;
			that.initializeZip();
		});

	},

	update_progress: function() {
		var zip = this.get("zip_position") || 0;
		var patch = this.get("patch_position") || 0;
		var x = Math.floor( (zip + patch + 3) * 100 / this.get("task_size") );
		this.set("progress", x );
	},

	initializeZip: function() {
		var that = this;
		this.fsApi.getFileSystem().root.getDirectory(this.urlHash, {create: true}, function(dir) {
			that.set("root_url", dir.toURL());
			that.zip = new ZipFile(that.get('url'), function() {
				that.set("task_size", that.zip.entries.length * 2 + 3);
				that.trigger("initialized:zip");
			}, 0);
		}, function() {
			console.log("In beginUnpacking error handler. Does the root dir already exist?");
		});
	},
	
	
});