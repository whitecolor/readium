describe("ebook", function() {
	
	describe("initialization", function() {

		var ebook;

		beforeEach(function() {
			ebook = new Readium.Models.EbookBase();
		});

		it("sets the page number to 1 by default", function() {
			expect(ebook.get("current_page")).toEqual(1);
		});

	});
});