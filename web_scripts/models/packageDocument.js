// Define a namespace for the library
if (typeof Readium === "undefined" || Readium === null) {
	Readium = {};
}

Readium.PackageDocument = function(domString) {
	
	// contstants
	var CFI_PREFIX = "epubcfi("
	
	// private members
	var _dom;
	var _spinePosition = -1;
	var _currentFileUrl = null;
	var _bindingHandlers = null;
	var _fs = null;
	var _resolver = null;
	
	// initialization code
	var init = function() {
		var parser = new window.DOMParser();
		_dom = parser.parseFromString(domString, "text/xml");
	};

	var getCoverHref = function() {
		var manifest; var $imageNode;
		manifest = _dom.getElementsByTagName('manifest')[0];

		// epub3 spec for a cover image is like this:
		/*<item properties="cover-image" id="ci" href="cover.svg" media-type="image/svg+xml" />*/
		$imageNode = $('item[properties~="cover-image"]', manifest);
		if($imageNode.length === 1 && $imageNode.attr("href") ) {
			return $imageNode.attr("href");
		}

		// some epub2's cover image is like this:
		/*<meta name="cover" content="cover-image-item-id" />*/
		var metaNode = $('meta[name="cover"]', _dom);
		var contentAttr = metaNode.attr("content");
		if(metaNode.length === 1 && contentAttr) {
			$imageNode = $('item[id="'+contentAttr+'"]', manifest);
			if($imageNode.length === 1 && $imageNode.attr("href")) {
				return $imageNode.attr("href");
			}
		}

		// that didn't seem to work so, it think epub2 just uses item with id=cover
		$imageNode = $('#cover', manifest);
		if($imageNode.length === 1 && $imageNode.attr("href")) {
			return $imageNode.attr("href");
		}

		// seems like there isn't one, thats ok...
		return null;
	};

	var getVersionNumber = function() {
		var version = $('package', _dom).attr('version');
		if(version) {
			return version;
		}
		else {
			return "UNKNOWN";
		}
	}
	
	var parseMetaData = function() {
		var metaDom; var ns; var metaData;
		
		metaDom = _dom.getElementsByTagName('metadata')[0];
		// namespaces are more trouble than they are worth right now
		// ns = metaDom.namespaceURI;
		metaData = {};
		
		var getTagHelper = function(tagName) {
			// var elems = _dom.getElementsByTagNameNS(ns, 'title');
			var elems = metaDom.getElementsByTagName(tagName);
			if(elems.length > 0) {
				return elems[0].textContent;
			}
			else {
				return "UNKNOWN";
			}
		}
            var parseDateTime = function(datetime) {
                var re = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)Z/;
                var matched = datetime.match(re);
                if (matched) {
                    return matched[1]+"/"+matched[2]+"/"+matched[3]+" "+matched[4]+":"+matched[5]+":"+matched[6];
                } else {
                    // unknown format; return itself
                    return datetime;
                }
            }
            var getPubDateHelper = function() {
                var date = null;
                var elems = null;
                var mDom = _dom.getElementsByTagName('metadata')[0];
                elems = $('date', mDom);
                if(elems.length >= 1) {
                    date = elems[0].textContent;
                } else {
                    elems = $('meta[property="dcterms:modified"]', mDom);
                    if(elems.length >= 1) {
                        date = elems[0].textContent;
                    }
                }
                if (date) {
                    return parseDateTime(date);
                } else {
                    return "UNKNOWN";
                }
            }
		
		metaData.title = getTagHelper('title');
		metaData.id = getTagHelper('identifier');
		metaData.lang = getTagHelper('language');
		metaData.publisher = getTagHelper('publisher');
		metaData.author = getTagHelper('creator');
		metaData.cover_href = getCoverHref();
		metaData.epub_version = getVersionNumber();
		metaData.pubdate = getPubDateHelper();

		
		return metaData;
		
	};
	
	// private methods
	var getCfiMeat = function(str) {
		var end = str.lastIndexOf(")");
		var pref = str.indexOf(CFI_PREFIX);
		var start = pref + CFI_PREFIX.length;
		if( pref > -1 && end > -1 && start < end) {
			return str.substr(start, end - start);
		} else {
			return null;
		}
		
	};
	
	var spineNodes = function() {
		var spine = _dom.getElementsByTagName('spine')[0];
		return spine.getElementsByTagName("*");
	};
	
	var nextSpineNode = function() {
		var spine = spineNodes();
		if(_spinePosition < spine.length - 1) {
			_spinePosition += 1;
			return spine[_spinePosition];
		} else {
			return null;
		}
	};
	
	var followSpineNode = function(node) {
		var id;
		if(node.attributes['idref']) {
			id = node.attributes['idref'].value;
			node = _dom.getElementById(id);
			return followSpineNode(node);
		}
		return node;
	};
	
	var getSectionHrefFromNode = function(node) {
		var sectionNode = followSpineNode(node);
		if(sectionNode) {
			return sectionNode.attributes["href"].value;
		}
		else {
			return null;
		}
	};

	var getSpineNodePositionFromHref = function(href, book) {
		var findItemByHref = function(href, book) {
			var elems = $('item', _dom);
			var hrefFilePath = href.replace(/#.*$/, "");
			for(var i = 0; i< elems.length; i++) {
				var itemHref = elems[i].attributes["href"].value;
				itemHref = itemHref.replace(/#.*$/, "");
				if(itemHref === hrefFilePath ||
					_resolver.resolve(book.resolvePath(itemHref)).toString() === hrefFilePath) {
					return $(elems[i]);
				}
			}
			return null;
		};

		var elem = findItemByHref(href, book);
		if (elem === null) {
			return -1;
		}
		var id = elem.attr('id');
		var sns = spineNodes();
		for(var i = 0; i < sns.length; i++) {
			if(sns[i].attributes["idref"].value === id) {
				return i;
			}
		}
		return -1;
	};

	parseBindingHandlers = function() {
		var handers = {};
		$('bindings mediaType', _dom).each(function() {
			var $this = $(this);
			var type = $this.attr('media-type'); 
			var id = $this.attr('handler');
			handers[type] = getSectionHrefFromNode(_dom.getElementById(id));
		});
		return handers;
	};
	
	init();
	Readium.FileSystemApi(function(fs) {
		_fsApi = fs;
		var rootUrl = _fsApi.getFileSystem().root.toURL();
		_resolver = new PathResolver(rootUrl);
	});
	// return pubic interface
	return {

		XHTML_MIME: "application/xhtml+xml",
		
		NCX_MIME: "application/x-dtbncx+xml",

		getFileFromCfi: function() {},
		
		setPosition: function(x) {
			_spinePosition = x;
		},
		
		getPosition: function() {
			return _spinePosition;
		},
		
		currentSection: function() {
			var spineNode = spineNodes()[_spinePosition];
			return getSectionHrefFromNode(spineNode);
		},
		
		nextSection: function() {
			var nSNode = nextSpineNode();
			if(nSNode) {
				return getSectionHrefFromNode(nSNode);
			} else {
				return null;
			}
		},
		
		hasNextSection: function() {
			return _spinePosition < spineNodes().length - 1;
		},
		
		goToNextSection: function() {
			if (_spinePosition >= spineNodes().length - 1) {
				throw "attempting to set invalid spine position";
			}
			_spinePosition += 1;
		},
		
		hasPrevSection: function() {
			return _spinePosition > 0;
		},
		
		goToPrevSection: function() {
			if (_spinePosition <= 0) {
				throw "attempting to set invalid spine position";
			}
			_spinePosition -= 1;
		},
		
		getDom: function() {
			return _dom;
		},

		getTocPath: function() {
			var id; var node; var spine; var navElems;

			navElems = $('item[properties="nav"]', _dom);
			if(navElems.length === 1) {
				return getSectionHrefFromNode( navElems[0] );
			}

			spine = _dom.getElementsByTagName('spine')[0];
			if(spine && spine.attributes['toc'] && spine.attributes['toc'].value) {
				id = spine.attributes['toc'].value;
				node = _dom.getElementById(id);
				return getSectionHrefFromNode(node);
			}
			return null;
		},
		
		getMetaData: function() {
			return parseMetaData();
		},
		
		hasSpine: function() {
			return !!( _dom.getElementsByTagName('spine')[0] );
		},

		goToHref: function(href, book) {
			var pos = getSpineNodePositionFromHref(href, book);
			if(pos === -1) {
				// failed to find the spine node
				return false;
			}
			_spinePosition = pos;
			return true;
		},

		getTocType: function() {
			var id; var node; var navElems; var spine;
			navElems = $('item[properties="nav"]', _dom);

			if(navElems.length === 1) {
				// return media-type attr or take a good guess
				return navElems[0].attributes["media-type"].value || this.XHTML_MIME;
			}

			spine = _dom.getElementsByTagName('spine')[0];
			if(spine && spine.attributes['toc'] && spine.attributes['toc'].value) {
				id = spine.attributes['toc'].value;
				node = _dom.getElementById(id);
				return node.attributes["media-type"].value || this.NCX_MIME;
			}

			return null;
		},

		getSpineArray: function() {
			var results = [];
			var snodes = spineNodes();
			for(i = 0; i < snodes.length; i++) {
				results.push( getSectionHrefFromNode(snodes[i]) );
			}
			return results;
		},

		getBindingHandlers: function() {
			if(!_bindingHandlers) {
				_bindingHandlers = parseBindingHandlers();	
			}
			return _bindingHandlers;
		}
		
	};
}
