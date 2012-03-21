$(function() {

(function($) {
	// todo move this stuff into the proper namespaces
	window.LibraryItem = Backbone.Model.extend({

		idAttribute: "key",
		
		getViewBookUrl: function(book) {
			return "/views/viewer.html?book=" + this.get('key');
		},

		openInReader: function() {
			window.location = this.getViewBookUrl();
		},

		delete: function() {
			var key = this.get('key');
			Lawnchair(function() {
				var that = this; // <=== capture Lawnchair scope
				this.get(key, function(book) {
					if(book) {
						Readium.FileSystemApi(function(fs) {
							fs.rmdir(book.key);
							that.remove(key);
						});
					}
				});		
			});
		}
	});

	window.LibraryItems = Backbone.Collection.extend({

		model: LibraryItem,
		
	});

	window.LibraryItemView = Backbone.View.extend({

		tagName: 'div',

		className: "book-item clearfix",

		template: _.template( $('#library-item-template').html() ),

		initialize: function() {
			_.bindAll(this, "render");	
		},

		render: function() {
			var renderedContent = this.template({data: this.model.toJSON()});
			$(this.el).html(renderedContent);
			return this;
		},

		events: {
			"click .delete": function(e) {
				e.preventDefault();
				var confMessage;
				var selector = "#details-modal-" + this.model.get('key');
				confMessage  = "Are you sure you want to perminantly delete " 
				confMessage += this.model.get('title');
				confMessage += "?";


				if(confirm(confMessage)) {
					$(selector).modal('hide');
					this.model.delete();
					this.remove();
				}
			},

			"click .read": function(e) {
				this.model.openInReader();
			}
			
		}
	});

	window.LibraryItemsView = Backbone.View.extend({
		tagName: 'div',

		id: "library-items-container",

		className: 'row-view clearfix',

		template: _.template( $('#library-items-template').html() ),

		initialize: function() {
			_.bindAll(this, "render");
			this.collection.bind('reset', this.render);
			this.collection.bind('add',   this.addOne, this);
		},

		render: function() {
			var collection = this.collection;
			var $container = $(this.el);
			$container.html(this.template({}));
			this.$('#empty-message').toggle(this.collection.isEmpty());

			collection.each(function(item) {
				var view = new LibraryItemView({
					model: item,
					collection: collection,
					id: item.get('id')
				});
				$container.append( view.render().el );

			});
			
			// i dunno if this should go here
			$('#library-books-list').html(this.el)
			return this;
		},

		addOne: function(book) {
			var view = new LibraryItemView({
				model: book,
				collection: this.collection,
				id: book.get('id')
			});
			// we are adding so this should always be hidden!
			this.$('#empty-message').toggle(false);
			$(this.el).append( view.render().el );
		},

		events: {
			
		}
	});


	window.ExtractItem = Backbone.Model.extend({
		
		updateProgress: function(index, total) {
			var prog = index * 100 / total;
			this.set({
				progress: prog.toFixed().toString() + "%",
			});
		},

		start: function() {
			this.set({
				message: "Fetching ePUB",
				progress: 0,
				extracting: true
			});
		},

		end: function() {
			this.set({
				message: "Fetching ePUB",
				progress: 0,
				extracting: false
			});
		}


	});

	window.ExtractItemView = Backbone.View.extend({
		
		el: $('#progress-container')[0],

		template: _.template( $('#extracting-item-template').html() ),

		initialize: function() {
			_.bindAll(this, "render");	
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var $el = $(this.el);
			if( this.model.get('extracting') ) {
				
				$el.html(this.template(this.model.toJSON()));
				$el.show("slow");
			}
			else {
				$el.hide("slow");
			}
			return this;
		}
	});


	// the options
	window.ReadiumOptions = Backbone.Model.extend({

		defaults: {
			hijack_epub_urls: true,
			verbose_unpacking: true
		},

		sync: function(method, model, options) {
			// "create" create the model on the server
			// "read" : read this model from the server and return it
			// "update" : update the model on the server with the argument
			// "delete" : delete the model from the server.
			var json;
			var key = "READIUM_OPTIONS"

			if(method === "read") {
				json = window.localStorage.getItem(key);
				if(json) {
					// DON'T CHANGE IF NOTHING IN STORAGE
					model.attributes = (json && JSON.parse(json)) || {};	
				}
				else {
					options.error('Failed to load settings from local storage')
					return;
				}
			}

			if(method === "create" || method === "update") {
				window.localStorage.setItem(key, JSON.stringify(model.attributes) );
				
			}
			
			if(method === "delete") {
				// TODO: this is not deleting stuff...
				window.localStorage.removeItem(key);
			}
			options.success(model);
			
		}
	});

	window.ReadiumOptionsView = Backbone.View.extend({
		el: "#readium-options-modal",

		initialize: function() {
			this.model.on("change", this.render, this);
		},

		render: function() {
			var m = this.model;
			this.$('#verbose_unpacking').prop('checked', m.get("verbose_unpacking"));
			this.$('#hijack_epub_urls').prop('checked', m.get("hijack_epub_urls"));
		},

		events: {
    		"change #verbose_unpacking": "updateSettings",
    		"change #hijack_epub_urls": "updateSettings",
    		"click #save-settings-btn": "save"
  		},

  		updateSettings: function() {
  			var hijack = this.$('#hijack_epub_urls').prop('checked')
  			var unpack = this.$('#verbose_unpacking').prop('checked')
  			
			this.model.set({"verbose_unpacking": unpack});
			this.model.set({"hijack_epub_urls": hijack});
  		},

  		save: function() {
  			this.model.save();
  		}

	});

	window.options = new ReadiumOptions;
	window.optionsView = new ReadiumOptionsView({model: window.options});
	window.options.fetch({
		success: function() {
			//optionsView.render();
		}
	});
		
	window.extraction = new ExtractItem({extracting: false});
	window.extract_view = new ExtractItemView({model: extraction});
	extract_view.render();

	window.Library = new LibraryItems();
	window.lib_view = new LibraryItemsView({collection: window.Library});

})(jQuery);

var beginExtraction = function(url, filename) {
	 // Create a new window to the info page.
	 window.extraction.start();

	var extractOptions = {
		display_message: function(message) {
			window.extraction.set({
				message: message
			});
		},


var resetAndHideForm = function() {
	$('#add-book-modal').modal('hide');
};

var handleFileSelect = function(evt) {
	var files = evt.target.files; // FileList object
	var url = window.webkitURL.createObjectURL(files[0]);
	beginExtraction(url, files[0].name);
	resetAndHideForm();
};

/*
var flash = function(text, type) {
	var className = "alert";
	if(type) {
		className += " alert-" + type;
	}
	$('#flash-container').
		html('<div>'+text+'</div>').
		removeClass().
		addClass(className);
	
}


	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	document.getElementById('url-button').addEventListener('click', clickHandler, false);
	_lawnchair = new Lawnchair(function() {
		this.all(function(all) {
			window.Library.reset(all);							
		});
	});
	$("#block-view-btn").click(function(e) {
		$('#library-items-container').addClass("block-view").removeClass("row-view")
	});
	$("#row-view-btn").click(function(e) {
		$('#library-items-container').addClass("row-view").removeClass("block-view")
	});

	// TODO: use a Backbone router for this
	if(window.location.hash === "#options") {
		$('#readium-options-modal').modal('show')
	}
	/*
	$("#options-btn").click(function(e) {
		window.location = "/views/options.html";
	});
*/
	
});


