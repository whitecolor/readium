Readium.Routers.ViewerRouter=Backbone.Router.extend({routes:{"viewer.html?book=:key":"openBook","*splat":"splat_handler"},openBook:function(b){var a=_.find(window.ReadiumLibraryData,function(a){return a.key===b});a?(window._book=new Readium.Models.Ebook(a),window._applicationView=new Readium.Views.ViewerApplicationView({model:window._book}),window._applicationView.render()):alert("The book you requested does not exist")},splat_handler:function(b){console.log(b)}});
