Readium.Views.OptionsView = Backbone.View.extend({

	el: '#viewer-settings-modal',

	initialize: function() {
		this.model.on("change:current_theme", this.renderTheme, this);
		this.model.on("change:two_up", this.renderUpMode, this);
		this.model.on("change:current_margin", this.renderMarginRadio, this);
	},

	render: function() {
		this.renderTheme();
		this.renderUpMode();
		this.renderMarginRadio();
		return this;
	},

	renderTheme: function() {
		this.$('#preview-text')[0].className = this.model.get("current_theme");
		return this;
	},

	renderUpMode: function() {
		var twoUp = this.model.get("two_up");
		this.$("#one-up-option").toggleClass("selected", !twoUp);
		this.$("#two-up-option").toggleClass("selected", twoUp);
		return this;
	},

	renderMarginRadio: function() {
		var id = "#margin-option-" + this.model.get("current_margin");
		this.$('.margin-radio').toggleClass("selected", false);
		this.$(id).toggleClass("selected", true);
		return this;
	},

	events: {
    	"click .theme-option": 		"selectTheme",
    	"click .margin-radio": 		"selectMargin",
    	"click #one-up-option": function(e) { this.model.set("two_up", false) },
		"click #two-up-option": function(e) { this.model.set("two_up", true) }
  	},

  	selectTheme: function(e) {
  		var id = e.srcElement.id;
  		if(id === "default-theme-option" ) this.model.set("current_theme", "default-theme");
		if(id === "night-theme-option" ) this.model.set("current_theme", "night-theme");
		if(id === "parchment-theme-option" ) this.model.set("current_theme", "parchment-theme");
		if(id === "ballard-theme-option" ) this.model.set("current_theme", "ballard-theme");
		if(id === "vancouver-theme-option" ) this.model.set("current_theme", "vancouver-theme");
  	},

  	selectMargin: function(e) {
  		var id = e.srcElement.id;
  		var num = id[id.length - 1];
  		if(num === "1" ) this.model.set("current_margin", 1);
		if(num === "2" ) this.model.set("current_margin", 2);
		if(num === "3" ) this.model.set("current_margin", 3);
		if(num === "4" ) this.model.set("current_margin", 4);
		if(num === "5" ) this.model.set("current_margin", 5);
  	}


});