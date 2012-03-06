Readium.TocManager = function(book) {
	var callback = function() {};
	var parser = window.DOMParser;
	var dom = parser.parseFromString()
};

(function() {
	var _paginator;
	var _fsPath;
	var _urlArgs;
	var _fontSize = 10; // 10 => 1.0em
	

	// this just needs to be a backbone router
	var parseUrlArgs = function() {
		var hash;
		var args = [];
		var searchStr = window.location.search.substr(1);
		var hashes = searchStr.split('&');
		
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			args.push(hash[0]);
			args[hash[0]] = hash[1];
		}
		
		if(args["book"] && typeof args["book"] === "string") {
			_fsPath = args["book"].substr(0, args["book"].lastIndexOf("/") + 1);
		}

		return args;
	}

	parseViewportTag = function(viewportTag) {
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
	}

	var addMetaHeadTags = function(bookDom) {
		// the desktop does not obey meta viewport tags so
		// dynamically add in some css
		var tag = bookDom.getElementsByName("viewport")[0];
		if(tag) {
			var pageSize = parseViewportTag(tag);
			document.head.appendChild(tag);
			_paginator.setPageSize(pageSize.width, pageSize.height);
		}
		
	}

	var showBook = function(bookDom) {
		
		addStyleSheets(bookDom);	
		document.title = bookDom.title;
		_book.applyBindings(bookDom);
		if(_paginator) {
			$("#readium-content-container").css("visibility", "hidden");
			_paginator.replaceContent(bookDom.body.innerHTML);
		}
		else {
			var options = {
				pageAddCallback: function($newPage) {
					$newPage.click(toggleUi);
				}
			}
			_paginator = Readium.Paginator($('#container'), bookDom.body.innerHTML, options);	
			if( shouldOpenInTwoUp() ) {
				_paginator.toggleTwoUp();
			}
			addPageTurnHandlers(_paginator);
		}
		fixLinks();
		
		// need to let the thread go for second so the css
		// is parsed before appending repaginating
		setTimeout(function() {	
			fireRepaginateEvent();
		}, 8);

	};

	var addFixedLayoutCssFlag = function() {
		// just tack a class name on to the body
		$('body').addClass('apple-fixed-layout');
	};

	var showFixedLayoutBook = function() {
		addFixedLayoutCssFlag();

		var uris = _book.getAllSectionUris();
		// need to parse one viewport tag
		window.webkitResolveLocalFileSystemURL(uris[0], function(fileEntry) {
			Readium.FileSystemApi(function(fs) {
				fs.readEntry(fileEntry, function(content) {
					var parser = new window.DOMParser();
					var dom = parser.parseFromString(content, 'text/xml');
					var options = parseViewportTag(dom.getElementsByName("viewport")[0]);
					options.pageAddCallback = function($newPage) {
						$newPage.click(toggleUi);
						var iframe = $('iframe', $newPage)[0];
						if(iframe) {
							$('iframe', $newPage)[0].onload = function() {
								_book.applyBindings(this.contentDocument);
							}
						}
						
					};
					_paginator = Readium.FixedPaginator($('#container'), uris, options);
					_paginator.toggleTwoUp();
					fixLinks();
					addPageTurnHandlers(_paginator);

				}, function() {
					console.log('failed to load fixed layout book');
				})
			});
		});
			
		
			
	};
		

	var addToc = function() {
		$('#top-bar').append(_book.getProperties().title);
		_book.getTocText(function(res) { 
			var $tocArea = $('#menu');
			$tocArea.html(res);
			$('a', $tocArea).click(linkClickHandler);
		}, loadErrorHandler );
	};

	var addGenericEventListeners = function(book) {
		window.onresize = function(event) {
			book.trigger("repagination_event");
		}
		book.on("change:full_screen", function() {
			if(book.get("full_screen")) {
				document.documentElement.webkitRequestFullScreen();	
			}
			else {
				document.webkitCancelFullScreen();				
			}
		});
		$(document).keydown(function(e) {
			if(e.which == 39) {
				_book.nextPage();
			}
							
			if(e.which == 37) {
				_book.prevPage();
			}
		});
	};
	
	var openBook = function() {
		if(_urlArgs["book"] === undefined) {
			console.log("No book was specifiec to load");
			loadErrorHandler();
			return;
		}

		Lawnchair(function() {
			this.get(_urlArgs["book"], function(result) {
				if(result === null) {
					loadErrorHandler();
					return;
				}
				if(result.fixed_layout) {
					console.log('initializing fixed layout book');
					window._book = new Readium.Models.AppleFixedEbook(result);
				}
				else {
					console.log('initializing reflowable book');
					window._book = new Readium.Models.ReflowableEbook(result);
				}
				
				_paginator = _book.CreatePaginator();
				_paginator.on("toggle_ui", function() {
					toggleUi();
				});

				// the little overlay
				_nav = new Readium.Views.NavWidgetView({model: _book});
				_nav.render();

				addGenericEventListeners(_book);

			});		
		});
	}
	
	var loadErrorHandler = function(e) {
		console.log("Error could not load book");
	}
	
	var displaySettingsAtFirstLoad = function() {
		var timeout = setTimeout(toggleUi, 2000);
	}

	// temp fix me
	var pos = "-44px";
	var toggleUi = function() {
		var style = $('#top-bar')[0].style;
		
		var settings = $('#settings');
		var temp = style.top;
		style.top = pos;
		pos = temp;
		settings.toggleClass('hover-fade');
	};

	var initTopBar = function() {		
		$('#readium-content-container').click(toggleUi);
		$('.page-margin').click(toggleUi);
	};


	$(function() {
		_urlArgs = parseUrlArgs();
		openBook();
		displaySettingsAtFirstLoad();
		initTopBar();
	});
})();
