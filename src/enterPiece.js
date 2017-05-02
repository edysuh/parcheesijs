import { Move } from "./move";
import { startingLocations } from "./def";

export class EnterPiece extends Move {
	constructor(pawn) {
		super();
		this.pawn = pawn;
	}

	// pre: assure that the starting space is not blocked
	// post: starting space now has the newly entered pawn
	move(board) {
		var pawnColorStartSpace = startingLocations[this.pawn.getColor()];
		var pawnStarting = board.getSpaceAt(pawnColorStartSpace);
		
		if (super.isBlocked(board, this.pawn, board.getSpaceAt(pawnColorStartSpace - 1), 1)) {
			return null;
		}
		
		var bonus = super.isBopOrBlockade(board, pawnStarting);
		
		pawnStarting.setPawnOnSpace(this.pawn);
		
    return {'board': board, 'bonus': bonus};
	}
}
