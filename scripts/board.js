jewel.board = (function(){
	var settings,
		jewels,
		cols,
		rows,
		baseScore,
		numJewelTypes;

	function initialize(){
		settings = jewel.settings;
		numJewelTypes = settings.numJewelTypes;
		baseScore = settings.baseScore;
		cols = settings.cols;
		rows = settings.rows;
		fillBoard();
	}

	function print(){
		
	}

	return {
		/* Exposed functions go here */
	}
})();