import { Move } from "./move";
import { startingLocations } from "./def";

export class EnterPiece extends Move {
	enterPiece(board, pawn) {
		// modify canMove to check for whether theres a blockade on starting space
		var pawnColorStartSpace = startingLocations[pawn.getColor()];
		var pawnStarting = board.getSpaceAt(pawnColorStartSpace);
		
		if (super.isBlocked(board, pawn, board.getSpaceAt(pawnColorStartSpace - 1), 1)) {
			return board;
		}
		
		pawnStarting.setPawnOnSpace(pawn);
		
		return board;
	}
}
