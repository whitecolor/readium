// This is the namespace and initialization code that is used by
// by the library view of the chrome extension

window.Readium = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	Utils: {},
	Init: function() {

		window.options = Readium.Models.ReadiumOptions.getInstance();
		window.optionsView = new Readium.Views.ReadiumOptionsView({model: window.options});
			
		window._library = new Readium.Collections.LibraryItems();
		window._lib_view = new Readium.Views.LibraryItemsView({collection: window._library});
		window._fp_view = new Readium.Views.FilePickerView({collection: window._library});
		window.router = new Readium.Routers.LibraryRouter({picker: window._fp_view});
		Backbone.history.start({pushState: false, root: "views/library.html"});

		// load the library data from localstorage and 
		// use it trigger a reset event on the library
		_lawnchair = new Lawnchair(function() {
			this.all(function(all) {
				window._library.reset(all);							
			});
		});

		// TODO: this is not how we should do this, we should use a proper backbone view.
		$("#block-view-btn").click(function(e) {
			$('#library-items-container').addClass("block-view").removeClass("row-view")
		});
		$("#row-view-btn").click(function(e) {
			$('#library-items-container').addClass("row-view").removeClass("block-view")
		});			
	}
};

$(function() {
	// call the initialization code when the dom is loaded
	window.Readium.Init();
});