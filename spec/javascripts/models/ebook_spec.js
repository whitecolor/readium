describe("ebook", function() {

	var pacDocStub = {
		on: function() {},
		fetch: function() {},
		set: function() {},
		get: function() {}
	}

	
	describe("initialization", function() {

		var ebook;
		
		beforeEach(function() {
			
			spyOn(Readium.Models, "PackageDocument").andReturn(pacDocStub);
		});

		it('constructs the package document', function() {
			ebook = new Readium.Models.EbookBase({"package_doc_path": "banana"});
			expect(Readium.Models.PackageDocument).toHaveBeenCalled();
		});

		it('passes the "package_doc_path" path to packDoc contructor', function() {
			ebook = new Readium.Models.EbookBase({"package_doc_path": "banana"});
			var args = Readium.Models.PackageDocument.mostRecentCall.args;
			expect(args[1].file_path).toEqual("banana");
		});

		it("calls fetch on the package document", function() {
			spyOn(pacDocStub, "fetch");
			ebook = new Readium.Models.EbookBase({"package_doc_path": "banana"});
			expect(pacDocStub.fetch).toHaveBeenCalled()
		});

		it("sets the page number after successful fetch", function() {
			spyOn(pacDocStub, "fetch");
			spyOn(pacDocStub, "set");
			ebook = new Readium.Models.EbookBase({"package_doc_path": "banana"});
			var args = pacDocStub.fetch.mostRecentCall.args;
			args[0].success();
			expect(pacDocStub.set).toHaveBeenCalled();	
		});

	});


	describe("paginating", function() {

		var ebook;
		
		beforeEach(function() {
			pacDocStub.goToNextSection = function() {}
			spyOn(Readium.Models, "PackageDocument").andReturn(pacDocStub);
			ebook = new Readium.Models.EbookBase;
		});

		it('sets the current page to 1 by default', function() {
			ebook = new Readium.Models.EbookBase({"package_doc_path": "banana"});
			expect(ebook.get("current_page")).toEqual(1);
		});

		it("increments the page number if there are more pages", function() {
			ebook.set({"num_pages": 10});
			ebook.nextPage();
			expect(ebook.get("current_page")).toEqual(2);
		});

		it('increments the section of package doc if there are no more pages', function() {
			spyOn(pacDocStub, "goToNextSection").andReturn(true);
			ebook.set({"num_pages": 10});
			ebook.set({"current_page": 10});
			ebook.nextPage();
			expect(pacDocStub.goToNextSection).toHaveBeenCalled()
			expect(ebook.get("current_page")).toEqual(1);
		})

	});

});