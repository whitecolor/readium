Readium.Models.Toc=Backbone.Model.extend({sync:BBFileSystemSync,initialize:function(a){this.file_path=a.file_path;this.book=a.book;this.book.on("change:toc_visible",this.setVisibility,this);this.book.on("change:toolbar_visible",this.setTocVis,this)},handleLink:function(a){this.book.goToHref(a)},setVisibility:function(){this.set("visible",this.book.get("toc_visible"))},hide:function(){this.book.set("toc_visible",!1)},setTocVis:function(){this.book.get("toolbar_visible")||this.book.set("toc_visible",
!1)},defaults:{visible:!1}},{XHTML_MIME:"application/xhtml+xml",XML_MIME:"text/xml",NCX_MIME:"application/x-dtbncx+xml",getToc:function(a,b){var c=a.get("media_type");if(c===Readium.Models.Toc.XHTML_MIME||c===Readium.Models.Toc.XML_MIME)return new Readium.Models.XhtmlToc(b);else if(c===Readium.Models.Toc.NCX_MIME)return new Readium.Models.NcxToc(b)}});
Readium.Models.NcxToc=Readium.Models.Toc.extend({jath_template:{title:"//ncx:docTitle/ncx:text",navs:["//ncx:navMap/ncx:navPoint",{text:"ncx:navLabel/ncx:text",href:"ncx:content/@src"}]},parse:function(a){typeof a==="string"&&(a=(new window.DOMParser).parseFromString(a,"text/xml"));Jath.resolver=function(a){return a==="ncx"?"http://www.daisy.org/z3986/2005/ncx/":""};return Jath.parse(this.jath_template,a)},TocView:function(){return new Readium.Views.NcxTocView({model:this})}});
Readium.Models.XhtmlToc=Readium.Models.Toc.extend({parse:function(a){var b={};typeof a==="string"&&(a=(new window.DOMParser).parseFromString(a,"text/xml"));b.title=$("title",a).text();b.body=$("body",a);return b},TocView:function(){return new Readium.Views.XhtmlTocView({model:this})}});
