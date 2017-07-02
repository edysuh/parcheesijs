import { Move } from "./move";
import { startingLocations } from "./def";
import cloneDeep from "lodash/cloneDeep";

export class EnterPiece extends Move {
	constructor(pawn) {
		super();
		this.pawn = pawn;
	}

	// pre: assure that the starting space is not blocked
	// post: starting space now has the newly entered pawn
	move(board) {
		let newBoard = cloneDeep(board);
		let pawnColorStartSpace = startingLocations[this.pawn.getColor()];
		let pawnStarting = newBoard.getSpaceAt(pawnColorStartSpace);
		
		if (super.isBlocked(newBoard, this.pawn, newBoard.getSpaceAt(pawnColorStartSpace - 1), 1)) {
			return null;
		}
		
		let bonus = super.isBopOrBlockade(newBoard, pawnStarting);
		
		pawnStarting.setPawnOnSpace(this.pawn);
		
    return {'board': newBoard, 'bonus': bonus};
	}
	
	// check EnterPiece is properly using a "5 roll"
	checkMove(rollsHash) {
		if (rollsHash[5]) {
			rollsHash[5]--;
		} else if (rollsHash[1] && rollsHash[4]) {
			rollsHash[1]--;
			rollsHash[4]--;
		} else if (rollsHash[2] && rollsHash[3]) {
			rollsHash[2]--;
			rollsHash[3]--;
		} else {
			throw new Error("Error: didnt roll a 5");
		}
		
		return rollsHash;
	}
}
