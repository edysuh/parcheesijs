import { homeRowLocations, startingLocations, HOMEROWLENGTH } from '../src/def';

export function assert(bool, string) {
	if (!bool) {
		console.error("-- TEST FAILED: -- " + string);
	} else {
    console.log("TEST PASSED: " + string);
  }
}


// dict should look like:
// { "color" : { id: spaceIndex, id2: spaceAt2 ...}, color2: ...}
export function generateTestBoard(dict) {
	let board = new Board();
	let playerList = [];
	
	dict.forEach((color, pawns) => {
		let player = new Player(color);
		
		pawns.forEach((id, spaceIndex) => {
			let space = board.getSpaceAt(spaceIndex);
			space.setPawnOnSpace(player.pawns[id]);
			
			if (space.getPawnOnSpace()) {
				space.isBlockade = true;
			}
			
			calcPawnDistRem(player.pawns[id], spaceIndex);
		});
	});
	
	return {'board': board, 'playerList': playerList};
}

function calcPawnDistRem(pawn, spaceIndex) {
	if (spaceIndex >= homeRowLocations["home"]) {
		pawn.distRemaining = homeRowLocations["home"] + HOMEROWLENGTH - spaceIndex;
	} else if (spaceIndex < startingLocations[color]) {
		pawn.distRemaining = 71 - (spaceIndex + 1 + 67 - startingLocations[color]);
	} else {
		pawn.distRemaining = 71 + startingLocations[color] - spaceIndex;
	}
}

