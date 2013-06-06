var jewel = {
	screens : {},
	settings : {
		rows : 8,
		cols : 8,
		baseScore : 100,
		numJewelTypes : 7
	},
	images : {}
};

// Wait until main document is loaded
window.addEventListener("load", function(){

	// Determine jewel size
	var jewelProto = document.getElementById("jewel-proto"),
		rect = jewelProto.getBoundingClientRect();

	jewel.settings.jewelSize = rect.width;

	Modernizr.addTest("standalone", function(){
		return (window.navigator.standalone != false);
	});

	yepnope.addPrefix("preload", function(resource){
		resource.noexec = true;
		return resource;
	});

	var numPreload = 0, 
		numLoaded = 0;

	yepnope.addPrefix("loader", function(resource){
		// console.log("loading: " + resource.url);
		var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
		resource.noexec = isImage;

		numPreload++;
		resource.autoCallback = function(e){
			// console.log("Finished loading: " + resource.url);
			numLoaded++;
			if(isImage){
				var image = new Image();
				image.src = resource.url;
				jewel.images[resource.url] = image;
			}
		};
		return resource;
	});

	function getLoadProgress(){
		if(numPreload > 0){
			return numLoaded / numPreload;
		} else {
			return 0;
		}
	}

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
					jewel.game.showScreen("splash-screen", getLoadProgress);
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
				load : [
					"scripts/screen.main-menu.js",
					"scripts/board.js"
				]
			}, {
				test : Modernizr.webworkers,
				yep : [
					"loader!scripts/board.worker-interface.js",
					"preload!scripts/board.worker.js"
				],
				nope : "loader!scripts/board.js" 
			}, {
				load : ["loader!scripts/screen.main-menu.js",
						"loader!images/jewels" + jewel.settings.jewelSize + ".png"
				]
			}
		]);
	}

}, false);