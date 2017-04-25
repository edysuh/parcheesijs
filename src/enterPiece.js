import { Move } from "./move";
import { startingLocations } from "./def";

export class EnterPiece extends Move {
	constructor(pawn) {
		super();
		this.pawn = pawn;
	}

	move(board) {
		var pawnColorStartSpace = startingLocations[this.pawn.getColor()];
		var pawnStarting = board.getSpaceAt(pawnColorStartSpace);
		
		if (super.isBlocked(board, this.pawn, board.getSpaceAt(pawnColorStartSpace - 1), 1)) {
			// to tell caller function that this move is invalid:
			// return false
			return board;
		}
		
		pawnStarting.setPawnOnSpace(this.pawn);
		
		return board;
	}
}
