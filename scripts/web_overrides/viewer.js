Readium.Views.ViewerApplicationView = Backbone.View.extend({
	//el: '#readium-viewer-activity',

	uiVisible: false,

	initialize: function() {
		//this.model.on("change:full_screen", this.toggleFullscreen, this);
		this.template = _.template($("#viewer-template").html());
		

		// the little overlay
	//	this.navWidget = new Readium.Views.NavWidgetView({model: _book});
	//	this.navWidget.render();

		// the top bar
	//	this.toolbar = new Readium.Views.ToolbarView({model: _book});
	//	this.toolbar.render();

		this.model.on("change:has_toc", this.init_toc, this);

		this.addGlobalEventHandlers();

	},

	initPaginator: function() {
		// the book's pages
		this.paginator = this.model.CreatePaginator();
		this.paginator.on("toggle_ui", this.toggleUI, this);
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
			//document.documentElement.webkitRequestFullScreen();	
		}
		else {
			//document.webkitCancelFullScreen();				
		}
	},

	addGlobalEventHandlers: function() {
		var book = this.model; var el;
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
		//$('#touch-panel').toggle(book.isFixedLayout);
		if(book.isFixedLayout) {
			el = $('#touch-panel');
		}
		else {
			el = $(document)
		}

		$(document).on('swipeleft', function() {
			book.nextPage();
		});

		$(document).on('swiperight', function() {
			book.prevPage();
		});
		
	},

	render: function() {
		var renderedContent = this.template({data: this.model.toJSON()});
		$(this.el).html(renderedContent);
		return this;
	},

	init_toc: function() {
		if( this.model.get("has_toc") ) {
			var toc_item = this.model.getToc();			
			this.toc = toc_item.TocView();
			toc_item.fetch();

		}
	}
});