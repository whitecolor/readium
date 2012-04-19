Readium.Routers.ApplicationRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.collection = options.collection;
	},


	routes: {
		"view_book/:id": "openBook",
		"details/:id": "bookDetails",
		"": "showLibrary"
	},

	openBook: function(key) {
		alert("show a book");
		this.showViewer();
		var book_attrs = this.collection.get(key).toJSON();
		if(book_attrs.fixed_layout) {
			console.log('initializing fixed layout book');
			window._book = new Readium.Models.AppleFixedEbook(book_attrs);
		}
		else {
			console.log('initializing reflowable book');
			window._book = new Readium.Models.ReflowableEbook(book_attrs);
		}
		
		window._libraryView = new Readium.Views.ViewerApplicationView({
			model: window._book
		});
		this.changePage(window._libraryView);
	},

	showLibrary: function() {
		var v = new Readium.Views.LibraryItemsView({collection: window.Library});
		this.changePage(v);
	},

	bookDetails: function(key) {
		var m = this.collection.get(key);
		var v = new Readium.Views.LibraryItemModalView({model: m});
		this.changePage(v);
	},

	showViewer: function() {
		$("#readium-library-activity").toggle(false);
		$("#readium-viewer-activity").toggle(true);
	},

	splat_handler: function(splat) {
		console.log(splat);
		//this.changePage(new )
	},

	changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        $.mobile.changePage($(page.el), {changeHash:false});
    },

    showModal: function(el) {
    	$(el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        $.mobile.changePage($(page.el), {changeHash:false});
    }

}); 

$(function() {
	//window.options = Readium.Models.ReadiumOptions.getInstance();
	//window.optionsView = new Readium.Views.ReadiumOptionsView({model: window.options});
	window.Library = new Readium.Collections.LibraryItems(window.ReadiumLibraryData);
	window.router = new Readium.Routers.ApplicationRouter({collection: window.Library});

	Backbone.history.start({pushState: false})
	// window.Library.fetch();
	//window.Library.trigger('reset');
	
});

// need to remove pages from the dom because jquery mobile has been
// disabled
$('div[data-role="page"]').live('pagehide', function (event, ui) {
    $(event.currentTarget).remove();
});
