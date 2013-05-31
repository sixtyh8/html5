var jewel = {
	screens: {},
	settings{
		rows: 8,
		cols: 8,
		baseScore: 100,
		numJewelTypes: 7
	}
};

// Wait until main document is loaded
window.addEventListener("load", function(){

	Modernizr.addTest("standalone", function(){
		return (window.navigator.standalone != false);
	});

	// Start dynamic loading
	Modernizr.load([
		{
			// Default files - always loaded
			load: [
				"scripts/sizzle.js",
				"scripts/dom.js",
				"scripts/game.js"
			]
		}, {
			test: Modernizr.standalone,
			yep: "scripts/screen.splash.js",
			nope: "scripts/screen.splash-install.js",
			complete: function(){
				jewel.game.setup();
				if (Modernizr.standalone){
					jewel.game.showScreen("splash-screen");
				} else {
					jewel.game.showScreen("install-screen");
				}
			}
		}

	]);

	// Loading stage 2
	if (Modernizr.standalone){
		Modernizr.load([
			{
				load: [
					"scripts/screen.main-menu.js",
					"scripts/board.js"
				]
			}
		]);
	}

}, false);