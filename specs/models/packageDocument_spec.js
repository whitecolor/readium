describe("PackageDocument", function() {

	var packageDocument;

	beforeEach(function() {
		// nothing
	});

	it("has a cover-image", function() {
		var domString = '<package><metadata></metadata><manifest>'+
			'  <item id="notes" href="notes.xhtml" media-type="application/xhtml+xml"/>'+
			'  <item id="cov" href="./images/cover.svg" properties="cover-image" media-type="image/svg+xml"/>'+
			'  <item id="f1" href="./images/fig1.jpg" media-type="image/jpeg"/>'+
			'</manifest></package>';
		packageDocument = Readium.PackageDocument(domString);
		expect(packageDocument.getMetaData().cover_href).toEqual("./images/cover.svg");
	});

	it("has a cover-image with multiple values separated with spaces", function() {
		var domString = '<package><metadata></metadata><manifest>'+
			'  <item id="notes" href="notes.xhtml" media-type="application/xhtml+xml"/>'+
			'  <item id="cov" href="./images/cover.svg" properties="cover-image svg" media-type="image/svg+xml"/>'+
			'  <item id="f1" href="./images/fig1.jpg" media-type="image/jpeg"/>'+
			'</manifest></package>';
		packageDocument = Readium.PackageDocument(domString);
		expect(packageDocument.getMetaData().cover_href).toEqual("./images/cover.svg");
	});

});