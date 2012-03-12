// Define a namespace for the library
if (typeof Readium === "undefined" || Readium === null) {
	Readium = {};
}

if(typeof Readium.FileSystemApi === "undefined") {
	throw "ExtractBook holds Readium::FileSystemApi as a dependency";
}

if(typeof Readium.Utils.MD5 === "undefined" ) {
	throw "Extract holds Readium::Utils::MD5 as a dependency";
}


// This method takes a url for an epub, unzips it and then
// writes its contents out to disk.
Readium.ExtractBook = function(url, winCb, failCb, options) {


	// Constants
	var MIMETYPE = "mimetype";
	var CONTAINER = "META-INF/container.xml";
	var EPUB3_MIMETYPE = "application/epub+zip";
	var DISPLAY_OPTIONS = "META-INF/com.apple.ibooks.display-options.xml"
	
	// Members
	var _zip; 
	var _fsApi;
	var _urlHash = Readium.Utils.MD5(url + (new Date()).toString());
	var _progressCancelled = false;
	var _containerDom;
	var _packageDoc;
	var _packageDocPath;
	var _fixedLayout;
	var _openToSpread;
	var _rootUrl;
	var _options = options || {};
	var _metaData;
	var _log = options.display_message || console.log;

	var update = function(complete, total) {
		if(options.update_progress) {
			options.update_progress(complete, total);
		}
	};

	var isDirectory = function(zipentry) {
		return zipentry.name.substr(-1) === "/";
	};
	
	var getPath = function(entry) {
		return _urlHash + "/" + entry.name;
	}

	var getUrl = function(entry) {
		return _rootUrl + "/" + entry.name;
	}
	
	// delete any changes to file system in the event of error, etc.
	var clean = function() {
		if(_fsApi) {
			_fsApi.rmdir(_urlHash);
		}
	}
	
	var extractEntryByName = function(zip, name, callback) {
		var found = false;
		for (var i=0; i < zip.entries.length; i++) {
			if(zip.entries[i].name === name) {
				found = true;
				zip.entries[i].extract(callback);
				break;
			}
		}
		if(!found) {
			throw ("asked to extract non-existent zip-entry: " + name);
		}
	};
	
	
	var parseContainerRoot = function(zip, rootFile, rootMime) {
		var callback = function(entry, content) {
			_packageDoc = new Readium.Models.ValidatedPackageMetaData({
				key: _urlHash
			}, {
				file_path: _urlHash + "/" + rootFile,
				root_url: _rootUrl + "/" + rootFile
			});
			_packageDoc.reset(content);
			unpackBook(zip, 0)

		}
		
		if(rootFile) {
			try {
				extractEntryByName(zip, rootFile, callback);				
			} catch(e) {
				_log(e);
				clean();
			}

		}
		else {
			// fatal error
			_log("ERROR: root file could not be found, progress stopped");
			clean();
		}
	}
	
	var parseMetaInfo = function(zip) {
		var callback = function(entry, content) {
			var rootFilePath; var rootFileMime;			
			var parser = new window.DOMParser();
			var xmlDoc = parser.parseFromString(content, "text/xml");
			var rootFiles = xmlDoc.getElementsByTagName("rootfile");

			if(rootFiles.length !== 1) {
				_log("Error processing " + CONTAINER);
				_log("Error: support for multiple rootfiles not implemented");
				clean();
			}
			else {
				if (rootFiles[0].hasAttribute("full-path")) {
					rootFilePath = rootFiles[0].attributes["full-path"].value;
				}
				else {
					_log("Error: could not find package rootfile");
					
					// fatal error, stop processing
					clean();
					return;
				}
				
				if (rootFiles[0].hasAttribute("media-type")) {
					rootFileMime = rootFiles[0].attributes["media-type"].value;
				} else {
					// non-fatal
					_log("root file missing media type, will attempt to detect automatically");
				}
				
				parseContainerRoot(zip, rootFilePath, rootFileMime);
				
			}
		}
		
		try {
			extractEntryByName(zip, CONTAINER, callback);
		} catch (e) {
			_log(e);
			clean();
		}

	}
		
	var checkMimetype = function(zip) {
		var validateCallback = function(entry, content) {
			if($.trim(content) === EPUB3_MIMETYPE) {
				parseMetaInfo(zip);
			} else {
				_log("Invalid mimetype discovered. Progress cancelled.");
				clean();
			}
		}
		try {
			extractEntryByName(zip, MIMETYPE, validateCallback);			
		} catch (e) {
			_log(e);
			clean();
		}

	};
	
	var validateZip = function(zip) {
		// weak test, just make sure MIMETYPE and CONTAINER files are where expected
		update(1, zip.entries.length + 5);
		if(zip.entryNames.indexOf(MIMETYPE) >= 0 && zip.entryNames.indexOf(CONTAINER) >= 0) {
			checkMimetype(zip);
		}
		else {
			alert("File does not appear to be a valid EPUB. Progress cancelled."); 
			clean();
		}
		
	};
	
	var unpackBook = function(zip, i) {
		var entry;

		// really hacky way of updating the spinner
		update(3 + i, zip.entries.length + 5);
		
		var unpackFailed = function() {
			_log("ERROR: durring unzipping process failed");
			clean();
		}

		var writeToDisk = function(entry, content) {
			if(entry.name.indexOf(DISPLAY_OPTIONS) >= 0) {
				_packageDoc.parseIbooksDisplayOptions(content);
			}

			_fsApi.writeFile(getPath(entry), content, function() {
				unpackBook(zip, i + 1);
			} , unpackFailed);
		}
		
		if( i === zip.entries.length) {
			_log("Unpacking process completed successfully!");
			correctURIs(zip, 0);
			
		} 
		else {
			entry = zip.entries[i];
			if( isDirectory(entry) ) {
				unpackBook(zip, i + 1);
			}
			else {
				_log("extracting: " + entry.name);
				entry.extract(writeToDisk);
			}
		}
	};

	var correctURIs = function(zip, i) {
		var entry;
		
		var monkeypatchingFailed = function() {
			_log("ERROR: durring monkeypatching of URIs process failed");
			clean();
		}
		
		if( i === zip.entries.length) {
			_log("Unpacking process completed successfully!");
			// HUZZAH We did it, now save the meta data
			_packageDoc.save({}, {
				success: function() {
					winCb( _packageDoc.toJSON() );
				},
				failure: failCb
			});
			
			
		} 
		else {
			entry = zip.entries[i];
			if( isDirectory(entry) ) {
				correctURIs(zip, i + 1);
			}
			else {
				_log("monkey patching: " + entry.name);
				monkeyPatchUrls(getUrl(entry), function() {
						correctURIs(zip, i + 1);
					}, monkeypatchingFailed);
			}
		}
	};
	
	var beginUnpacking = function() {
		_fsApi.getFileSystem().root.getDirectory(_urlHash, {create: true}, function(dir) {
			_rootUrl  = dir.toURL();
			_zip = new ZipFile(url, validateZip, 0);
		}, function() {
			//_zip = new ZipFile(url, validateZip, 0);
			console.log("In beginUnpacking error handler. Does the root dir already exist?");
		});
	};
	
	Readium.FileSystemApi(function(fs){
		_fsApi = fs;
		beginUnpacking();
	});
};