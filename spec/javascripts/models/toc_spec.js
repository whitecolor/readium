var ncx = "";
ncx += '<?xml version="1.0" encoding="UTF-8"?>'
ncx += '<ncx xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" xmlns="http://www.daisy.org/z3986/2005/ncx/"'
ncx += 'version="2005-1" xml:lang="en">'
ncx += '<head>'
ncx += '<meta name="dtb:uid" content="code.google.com.epub-samples.wasteland-basic"/>'
ncx += '</head>'
ncx += '<docTitle>'
ncx += '<text>The Waste Land</text>'
ncx += '</docTitle>'
ncx += '<navMap>'
ncx += '<navPoint id="ch1">'
ncx += '<navLabel>'
ncx += '<text>I. THE BURIAL OF THE DEAD</text>'
ncx += '</navLabel>'
ncx += '<content src="wasteland-content.xhtml#ch1"/>'
ncx += '</navPoint>'
ncx += '<navPoint id="ch2">'
ncx += '<navLabel>'
ncx += '<text>II. A GAME OF CHESS</text>'
ncx += '</navLabel>'
ncx += '<content src="wasteland-content.xhtml#ch2"/>'
ncx += '</navPoint>'
ncx += '<navPoint id="ch3">'
ncx += '<navLabel>'
ncx += '<text>III. THE FIRE SERMON</text>'
ncx += '</navLabel>'
ncx += '<content src="wasteland-content.xhtml#ch3"/>'
ncx += '</navPoint>'
ncx += '<navPoint id="ch4">'
ncx += '<navLabel>'
ncx += '<text>IV. DEATH BY WATER</text>'
ncx += '</navLabel>'
ncx += '<content src="wasteland-content.xhtml#ch4"/>'
ncx += '</navPoint>'
ncx += '<navPoint id="ch5">'
ncx += '<navLabel>'
ncx += '<text>V. WHAT THE THUNDER SAID</text>'
ncx += '</navLabel>'
ncx += '<content src="wasteland-content.xhtml#ch5"/>'
ncx += '</navPoint>'
ncx += '<navPoint id="rearnotes">'
ncx += '<navLabel>'
ncx += '<text>NOTES ON "THE WASTE LAND"</text>'
ncx += '</navLabel>'
ncx += '<content src="wasteland-content.xhtml#rearnotes"/>'
ncx += '</navPoint>'
ncx += '</navMap>'
ncx += '</ncx>'

describe("construction an item", function() {
});

describe("parsing the ncx", function() {
    var toc;
    beforeEach(function() {
        toc = new Readium.Models.NcxToc({}, {});
    });

    it("parses the text", function() {
        var parsed = toc.parse(ncx);
    });

    it("parses the source", function() {
        var parsed = toc.parse(ncx);
    });
});