import { homeRowLocations, startingLocations, HOMEROWLENGTH } from '../src/def';
import { Board } from '../src/board';
import { TPlayer } from '../src/tplayer';
import { MPlayer } from '../src/mplayer';
// import { HPlayer } from '../src/hplayer';
// import { NPlayer } from '../src/nplayer';

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
	
	for (let color in dict) {
		let player;
		switch (dict[color]["type"]) {
			case "tplayer": {
				player = new TPlayer(color);
				break;
			}
			case "mplayer": {
				player = new MPlayer(color);
				break;
			}
			case "hplayer": {
				player = new HPlayer(color);
				break;
			}
			case "nplayer": {
				player = new NPlayer(color);
				break;
			}
		}
		playerList.push(player);
		
		for (let id in dict[color]["pawns"]) {
			let space = board.getSpaceAt(dict[color]["pawns"][id]);
			
			if (space.getPawnOnSpace()) {
				space.isBlockade = true;
			}
		
			// TODO: dont set different color pawns on the same space
			space.setPawnOnSpace(player.pawns[id]);
			
			calcPawnDistRem(player.pawns[id], dict[color]["pawns"][id]);
		}
	}
	
	return { 'board': board, 'playerList': playerList };
}

function calcPawnDistRem(pawn, spaceIndex) {
	if (spaceIndex >= homeRowLocations["home"]) {
		pawn.distRemaining = homeRowLocations["home"] + HOMEROWLENGTH - spaceIndex;
	} else if (spaceIndex < startingLocations[pawn.getColor()]) {
		pawn.distRemaining = 71 - (spaceIndex + 1 + 67 - startingLocations[pawn.getColor()]);
	} else {
		pawn.distRemaining = 71 + startingLocations[pawn.getColor()] - spaceIndex;
	}
}

