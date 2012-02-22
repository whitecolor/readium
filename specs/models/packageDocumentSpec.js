// I would really like to port our packageDocument class over to a 
// backbone object. This is the spec for this port. It is using Jath
// to conver the XML => JSON
describe('packDocNew', function() {

	// an example of an epub 2 package doc
	var xmlString = '';
	xmlString += '<?xml version="1.0" encoding="UTF-8"?>'
	xmlString += '<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="ean" version="2.0">'
	xmlString += '<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns="http://www.idpf.org/2007/opf">'
  	xmlString += "<dc:title>L'espagnol dans votre poche</dc:title>"
  	xmlString += "<dc:creator></dc:creator>"
  	xmlString += "<dc:publisher>Larousse</dc:publisher>"
  	xmlString += "<dc:description>Lorem Ipsum Dolor sed</dc:description>"
  	xmlString += "<dc:rights>copyright something or other</dc:rights>"
  	xmlString += "<dc:identifier id='ean'>9782035862464</dc:identifier>"
  	xmlString += "<dc:language>fr</dc:language>"
	xmlString += "</metadata>"
	xmlString += '<manifest>'
	xmlString += '<item id="css" href="styles.css" media-type="text/css" />'
	xmlString += '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />'
	xmlString += '<item id="cover" href="images/cover.jpg" media-type="image/jpeg"/>'
	xmlString += '<item id="font2" href="Fonts/HighlanderStd-Medium.otf" media-type="application/x-font-otf"/>'
	xmlString += '<item id="font3" href="Fonts/HighlanderStd-BookItalic.otf" media-type="application/x-font-otf"/>'
	xmlString += "</manifest>"
	xmlString += '<spine toc="ncx">'
	xmlString += '<itemref idref="Page_1"/><itemref idref="Page_2"/><itemref idref="Page_3"/>'
	xmlString += '</spine>'
	xmlString += '</package>';

	var packDoc;

	beforeEach(function() {
		packDoc = new Readium.Models.PackageDocumentBase({}, {url: "blah"});
	});

	describe('parsing the package document xml', function() {

		var dom;

		beforeEach(function() {
			var parser = new window.DOMParser;
			dom = parser.parseFromString(xmlString, 'text/xml');
		});

		it('parses the spine nodes from xml', function() {	
			var res = packDoc.parse(dom);		
			expect(res.spine.length).toEqual(3);
		});

		it('parses the epub version number', function() {
			var res = packDoc.parse(dom);
			expect(res.metadata.version).toEqual("2.0");
		});

		it('parses the title', function() {
			var res = packDoc.parse(dom);
			expect(res.metadata.title).toEqual("L'espagnol dans votre poche");
		});

		it('parses the manifest as a collection', function() {
			var res = packDoc.parse(dom);
			expect(typeof res.manifest.reset).toEqual("function")
		});
	});

	describe('default values', function() {
		
	});

	describe('fetching the xml from the fs', function() {

		it('accepts a url in the constructor', function() {
			packDoc = new Readium.Models.PackageDocumentBase({}, {url: "url"});
			expect(packDoc.url).toEqual("url");
		});
	});

	describe("EBook", function() {
		
		var ebook;

		beforeEach(function() {
			packDoc = new Readium.Models.PackageDocumentBase({}, {url: "blah"});
			var parser = new window.DOMParser;
			var dom = parser.parseFromString(xmlString, 'text/xml');
			var res = packDoc.parse(dom);
			ebook = new Readium.Models.EBook(res)	
		});

		it('sets the default spine position', function() {
			expect(ebook.get("spine_position")).toEqual(0);
		});

		it('does not have a spine_position < 0', function() {
			expect(ebook.hasPrevSection()).toBeFalsy();
		});

		it('does not have a spine_position > spine.length - 1', function() {
			ebook.set({spine_position: 2});
			expect(ebook.hasNextSection()).toBeFalsy();
		});

		it('is not valid if the spine position is invalid', function() {
			ebook.set({spine_position: 100});
			expect(ebook.isValid()).toBeFalsy();
		});

	})
	
	
})


