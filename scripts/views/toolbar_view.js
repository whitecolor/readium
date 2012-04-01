Readium.Views.ToolbarView = Backbone.View.extend({

	el: "#toolbar-el",

	initialize: function() {
		this.model.on("change:toolbar_visible", this.render, this);
	},

	render: function() {
		console.log("toolbar render called")
		this.$('#show-toolbar-button').toggle( !this.model.get("toolbar_visible") );
		this.$('#top-bar').toggle( this.model.get("toolbar_visible") );
		return this;
	},

	events: {
		"click #hide-toolbar-button": "hide_toolbar",
		"click #show-toolbar-button": "show_toolbar",
		"click #back-to-lib-button": "show_library"
	},

	show_toolbar: function() {
		this.model.set("toolbar_visible", true);
	},

	hide_toolbar: function() {
		this.model.set("toolbar_visible", false);
	},

	show_library: function() {
		window.router.navigate('/', {trigger: true});
	},
});
