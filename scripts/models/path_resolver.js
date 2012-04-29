// seems like this is now fixed in chromium so soon it will no longer be necessary, YAY!

// get rid of webkit prefix
window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;

window.g_uid_hashed = null;

function PathResolver(rootPath) {
	this.baseUrl = new URI(rootPath);
};

PathResolver.prototype.resolve = function(relativePath) {
	var url = new URI(relativePath);
	return url.resolve(this.baseUrl);
};

var domToString = function(dom) {
	var x = new XMLSerializer();
	return x.serializeToString(dom);
};

var fixCssLinks = function(content, resolver) {

	// fix import statements to  (unconditionally) have url(...) wrapper
        content = content.replace(/@import\s+(?:url\()*(.+?)(?:\))*\s*;/g, "@import url\($1\);");

	var beginning = /url\s*\(\s*['"]*\s*/
	var end = /['"]*\s*\)/
	return content.replace(/url\s*\(\s*.+?\s*\)/g, function(frag) { 
		frag = frag.replace(beginning, '');
		frag = frag.replace(end, '');
		return "url('" + resolver.resolve(frag) + "')";
	});

};

var fixXhtmlLinks = function(content, resolver) {
	var $obj; var path; 
	var parser = new window.DOMParser();
	var dom = parser.parseFromString(content, 'text/xml');

	var correctionHelper = function(attrName) {
		var selector = '[' + attrName + ']';
		$(selector, dom).each(function() {
			$obj = $(this);
			path = $obj.attr( attrName );
			path = resolver.resolve( path );
			$obj.attr(attrName, path);
		});
	}


	correctionHelper('src');
	correctionHelper('href');
	$('image', dom).each(function() {
		$obj = $(this);
		path = $obj.attr( 'xlink:href' );
		path = resolver.resolve( path );
		$obj.attr('xlink:href', path);
	});
	//correctionHelper('xlink:href');
	return domToString(dom);
	
};

var fixFonts = function(content, resolver) {
     if (content.indexOf("OTTO") == 0) {
		// alert("TTF!");
		return content;
      }
      else
      {
	//alert("OBFUSCATED!");
	//return "BILL" + content.slice(4);
	return (content[0] ^ g_uid_hashed[0]) +
	       (content[1] ^ g_uid_hashed[1]) +
	       (content[2] ^ g_uid_hashed[2]) +
	       (content[3] ^ g_uid_hashed[3]) +
	       content.slice(4);
      }
}

var getBinaryFileFixingStrategy = function(fileEntryUrl, uid) {
	
	if (fileEntryUrl.substr(-4) === ".otf" ) {
		if (window.g_uid_hashed == null) {
			var digest = window.Crypto.SHA1(uid);
                        var digestBytes = window.Crypto.SHA1(uid.trim(), { asBytes: true });
                        var digestString = window.Crypto.SHA1(uid, { asString: true });
			window.g_uid_hashed = digestBytes; // which is it??
		}
		// kind of a hack - tecnically should process top-down from encryption.xml but we'll sniff for now
		return fixFonts;
	}
	
	return null;
}

var getLinkFixingStrategy = function(fileEntryUrl) {
	if (fileEntryUrl.substr(-4) === ".css" ) {
		return fixCssLinks;
	}
	
	if (fileEntryUrl.substr(-5) === ".html" || fileEntryUrl.substr(-6) === ".xhtml" ) {
		return fixXhtmlLinks;
	}

	if (fileEntryUrl.substr(-4) === ".xml" ) {
		// for now, I think i may need a different strategy for this
		return fixXhtmlLinks;
	}
	

	return null;
};


// this is the brains of the operation here
var monkeyPatchUrls = function(fileEntryUrl, win, fail, uid) {
	var entry;
	var binFixingStrategy;
	var resolver = new PathResolver(fileEntryUrl);

	var fixBinaryFile = function(content) {
		content = binFixingStrategy(content, resolver);
		writeBinEntry(entry, content, win, fail);		
	};
	
        binFixingStrategy = getBinaryFileFixingStrategy(fileEntryUrl, uid);	
	if (binFixingStrategy != null) {
		window.resolveLocalFileSystemURL(fileEntryUrl, function(fileEntry) {
		// capture the file entry in scope
		entry = fileEntry;
		readBinEntry(entry, fixBinaryFile, fail);
	});
		win();
		return;
	}
	
	var linkFixingStrategy = getLinkFixingStrategy(fileEntryUrl);

	// no strategy => nothing to do === win :)
	if(linkFixingStrategy === null) {
		win();
		return;
	}

	var fixLinks = function(content) {
		content = linkFixingStrategy(content, resolver);
		writeEntry(entry, content, win, fail);		
	};

	window.resolveLocalFileSystemURL(fileEntryUrl, function(fileEntry) {
		// capture the file entry in scope
		entry = fileEntry;
		readEntry(entry, fixLinks, fail);
	});
	
};


// these are filesystem helpers really...
var readEntry = function(fileEntry, win, fail) {

    fileEntry.file(function(file) {

       var reader = new FileReader();
       reader.onloadend = function(e) {
         win(this.result);
       };
       
       reader.readAsText(file);

    }, fail);

};

var writeEntry = function(fileEntry, content, win, fail) {
	
	fileEntry.createWriter(function(fileWriter) {

		fileWriter.onwriteend = function(e) {
			win();
		};

		fileWriter.onerror = function(e) {
			fail(e);
		};

		var bb = new BlobBuilder(); 
		bb.append(content);
		fileWriter.write( bb.getBlob('text/plain') );

	}, fail);
};

var readBinEntry = function(fileEntry, win, fail) {

    fileEntry.file(function(file) {

       var reader = new FileReader();
       reader.onloadend = function(e) {
         win(this.result);
       };
       reader.readAsBinaryString(file);
    }, fail);

};


// must be a better way to do this???
var string2ArrayBuffer=function(str){
    var ba=new ArrayBuffer(str.length);
    var bytes = new Uint8Array(ba);
    for(var i=0;i<str.length; i++){
        bytes[i] = str.charCodeAt(i);
    }
    return ba;
}

/* could try this one: (but if binary is still available from Blob maybe there's a better way???)
function string2ArrayBuffer(string, callback) {
    var bb = new BlobBuilder();
    bb.append(string);
    var f = new FileReader();
    f.onload = function(e) {
        callback(e.target.result);
    }
    f.readAsArrayBuffer(bb.getBlob());
}
*/

var writeBinEntry = function(fileEntry, content, win, fail) {
	
	
	fileEntry.createWriter(function(fileWriter) {

		fileWriter.onwriteend = function(e) {
			win();
		};

		fileWriter.onerror = function(e) {
			fail(e);
		};
                var i = content.length;
		var bb = new BlobBuilder();
		var ba = string2ArrayBuffer(content);
		var k = ba.length;
		bb.append(ba);
		var blobObj = bb.getBlob('image/jpeg');
		var j = blobObj.size;
		fileWriter.write( blobObj );

	}, fail);
};



