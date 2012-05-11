Readium.Collections.SpinePresenter = Backbone.Collection.extend({

	model: Readium.Models.ManifestItemPresenter

});

Readium.Models.ManifestItemPresenter = Backbone.Model.extend({
	
	parseViewportTag: function(viewportTag) {
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
	},

	parseMetaTags: function() {
		var parser = new window.DOMParser();
		var dom = parser.parseFromString(this.get('current_content'), 'text/xml');
		var tag = dom.getElementsByName("viewport")[0];
		if(tag) {
			var pageSize = this.parseViewportTag(tag);
			this.set({"meta_width": pageSize.width, "meta_height": pageSize.height})
			return {meta_width: pageSize.width, meta_height: pageSize.height};
		}
		return null;
	}
	
});