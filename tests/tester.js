export function assert(bool, string) {
	if (!bool) {
		console.error("-- TEST FAILED: -- " + string);
	} else {
    console.log("TEST PASSED: " + string);
  }
}


 // dict should look like:
// { "color" : { id: spaceAt, id2: spaceAt2 ...}, color2: ... }
export function generateTestBoard(dict) {
	// compute distRemaining for each pawn
	let board = new Board();
	let playerList = [];
	
	dict.forEach((color, pawns) => {
		let player = new Player(color);
		
		pawns.forEach((id, spaceAt) => {
			let space = board.getSpaceAt(spaceAt);
			space.setPawnOnSpace(player.pawns[id]);
			
			if (space.getPawnOnSpace()) {
				space.isBlockade = true;
			}
		});
	});
	
	// and playerList
	return board;
}


			// switch (color) {
			// 	case "blue": {
			// 		player.pawns[id].distRemaining = 75 + startingLocations["blue"] - spaceAt;
			// 	}
			// 	case "yellow": {
			// 		player.pawns[id].distRemaining = 75 + startingLocations["blue"] - spaceAt;
			// 	}
			// 	case "green": {

			// 	}
			// 	case "red": {
			// 		if (spaceAt < 55)

			// 	}
			// }
