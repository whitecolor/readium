(function() {
	// Saves options to localStorage.
	var saveOptions = function() {
		var value = $("input[name=optionsRewriteLink]:checked").val();
		localStorage["rewrite_link"] = value;
		return true;
	};

	// Restores radiobutton state to saved value from localStorage.
	var restoreOptions = function() {
		var rewrite_link = localStorage["rewrite_link"];
		if (!rewrite_link) {
			rewrite_link = "on";
		}
		$("input[name=optionsRewriteLink]").val([rewrite_link]);
	};

	// initialize
	$(function() {
		restoreOptions();
		$("#save-btn").click(function(e){
			saveOptions();
		});
	});
})();


