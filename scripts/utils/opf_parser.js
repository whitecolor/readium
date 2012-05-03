
Readium.Utils.OPFParser = function(opf) {
 
     function MiniXMLQuery(xmlDoc) {
        
        this.xmlDoc = xmlDoc
        
        this.checkParents = function (element, parents) {
            if (parents.length == 0) {
                return true;
            } else {
                var parent = element.parentNode
                if (parent && parent.nodeName === parents.pop()) {
                    return this.checkParents(parent, parents)
                } else {
                    return false
                }
            }
        }
        
        this.get = function (elements) {
            var path = elements.split('/')
            if (path.length === 1 && path[0] === '') {
                return new Array(this.xmlDoc)
            } else { 
                var result = []
                var el = this.xmlDoc.getElementsByTagName(_.last(path))
                _.each(el, function (e) {
                    if (this.checkParents(e, path.slice(0, -1)))
                        result.push(e)
                });
                return result
            }
        },
        
        this.text = function (elements) {
            try {
                var result = '';
                _.each(this.get(elements), function(e, i) {
                    if (i > 0) result += ", "
                    result += e.textContent
                });
                return result;
            } catch (err) {
                return ''
            }
        },
        
        this.attr = function (elements, attribute) {
            var result = ''
            if (arguments.length == 1) {
                attribute = elements
                elements = ''
            }
            _.each(this.get(elements), function(e, i) {
                var attr = e.attributes.getNamedItem(attribute)
                if (attr) {
                    result = attr.value
                    return false
                }
            });
            return result
        },
        
        this.textByAttrValue = function (element, attribute, value) {
            var result = ''
            _.each(this.get(element), function(e, i) {
                var attr = e.attributes.getNamedItem(attribute)
                if (attr && attr.value === value) {
                    result = e.textContent
                }
            });
            return result
        }
        
        this.each = function (element, func) {
            _.each(this.get(element), function (e, i) {
                func(MiniXMLQuery.apply(Object(), [e], i));
            });
        }
        
        return this
    }

    p = MiniXMLQuery(opf);

    result = {
        'metadata': {
        	id: p.text('metadata/identifier'),
	        epub_version: p.attr('package', 'version'),
	        title: p.text('metadata/title'),
	        author: p.text('metadata/creator'),
	        publisher: p.text('metadata/publisher'),
	        description: p.text('metadata/description'),
	        rights: p.text('metadata/rights'),
	        language: p.text('metadata/language'),
	        pubdate: p.text('metadata/date'),
	        modified_date: p.textByAttrValue('metadata/meta', 
	            'property', 'dcterms:modified'),
	        layout: p.textByAttrValue('metadata/meta', 
	            'property', 'rendition:layout'),
	        spread: p.textByAttrValue('metadata/meta', 
	            'property', 'rendition:spread'),
	        orientation: p.textByAttrValue('metadata/meta', 
	            'property', 'rendition:orientation'),
	        //ncx: p.attr('spine', 'toc')
        },
        'manifest': [],
        'spine': [],
        'bindings': [],
    }
    
    p.each('manifest/item', function (node) {
        result.manifest.push({
            id : node.attr('id'),
            href : node.attr('href'),
            media_type : node.attr('media-type'),
            properties : node.attr('properties'),
        });
    });
    
    p.each('spine/itemref', function (node) {
        result.spine.push({
            idref : node.attr('idref'),
            properties : node.attr('properties'),
        });
    });
    
    p.each('bindings/mediaType', function (node) {
        result.spine.push({
            handler : node.attr('handler'),
            media_type : node.attr('media-type'),
        });
    });
    
    return result
}
