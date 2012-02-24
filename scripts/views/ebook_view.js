if( !window.Readium ) {
	window.Readium = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		Utils: {}
	};
}

Readium.Views.EBookView = Backbone.View.extend({


});


Readium.Views.NavWidgetView = Backbone.View.extend({

	el: $('#settings'),

	initialize: function() {
		this.model.on("change:two_up", this.render);
		this.model.on("change:full_screen", this.render);
	},

	render: function() {
		var ebook = this.model;
		this.$('#to-fs-icon').toggle( !ebook.get("full_screen") );
		this.$('#from-fs-icon').toggle( ebook.get("full_screen") );
		this.$('#two-up-icon').toggle( !ebook.get("two_up") );
		this.$('#one-up-icon').toggle( ebook.get("two_up") );
	},

	events: {
    	"#show-toc-button": this.model.toggleToc,
		"#increase-font-button": this.model.increaseFont,
		"#decrease-font-button": this.model.decreaseFont,
		"#fullscreen-button": this.model.toggleFullScreen,
		"#two-up-button": this.model.toggleTwoUp,
		"#page-back-button": this.model.prevPage,
		"#page-fwd-button": this.model.nextPage
  	},
});

			
		