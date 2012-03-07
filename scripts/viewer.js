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

	// todo add this somewhere
	// document.title = bookDom.title;



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
