if( !window.Readium ) {
	window.Readium = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		Utils: {}
	};
};

Readium.Views.ViewerApplicationView = Backbone.View.extend({
	el: 'body',

	uiVisible: false,

	initialize: function() {
		this.model.on("change:full_screen", this.toggleFullscreen, this);
		
		// the book's pages
		this.paginator = this.model.CreatePaginator();
		this.paginator.on("toggle_ui", this.toggleUI, this);

		// the little overlay
		this.navWidget = new Readium.Views.NavWidgetView({model: _book});
		this.navWidget.render();

		// the top bar
		this.toolbar = new Readium.Views.ToolbarView({model: _book});
		this.toolbar.render();

		this.model.on("change:has_toc", this.init_toc, this);

		this.addGlobalEventHandlers();

	},

	toggleUI: function() {
		/*
		this.uiVisible = !this.uiVisible;
		$('#top-bar').css("top", (this.uiVisible ? "0px" : "-44px") );
		$('#settings').toggleClass('hover-fade', !this.uiVisible);
		*/
	},

	toggleFullscreen: function() {
		if(this.model.get("full_screen")) {
			document.documentElement.webkitRequestFullScreen();	
		}
		else {
			document.webkitCancelFullScreen();				
		}
	},

	addGlobalEventHandlers: function() {
		var book = this.model;
		window.onresize = function(event) {
			book.trigger("repagination_event");
		}

		$(document).keydown(function(e) {
			if(e.which == 39) {
				book.nextPage();
			}
							
			if(e.which == 37) {
				book.prevPage();
			}
		});
	},

	render: function() {
		this.toggleUI();
		var that = this;
		setTimeout(function() {
			that.toggleUI();
		}, 2000);
	},

	init_toc: function() {
		if( this.model.get("has_toc") ) {
			var toc_item = this.model.getToc();			
			this.toc = toc_item.TocView();
			toc_item.fetch();

		}
	}
});

Readium.Routers.ViewerRouter = Backbone.Router.extend({

	routes: {
		"views/viewer.html?book=:key": "openBook",
		"*splat": "splat_handler"
	},

	openBook: function(key) {
		// the "right" way to do this is probably to call fetch()
		// on the book, but I needed to know what kind of book to 
		// initialize at early on. This is a pragmatic solution
		Lawnchair(function() {
			this.get(key, function(result) {
				if(result === null) {
					alert('Could not load book, try refeshing your browser.')
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
				
				window._applicationView = new Readium.Views.ViewerApplicationView({
					model: window._book
				});
				window._applicationView.render();
			});		
		});
	},

	splat_handler: function(splat) {
		console.log(splat)
	}

});

$(function() {
	_router = new Readium.Routers.ViewerRouter();
	Backbone.history.start({pushState: true});
});