import { Move } from "./move";
import { startingLocations } from "./def";

export class EnterPiece extends Move {
	// change this function to a virtual implementation of move.move()
	enterPiece(board, pawn) {
	// move(board, pawn) {
		var pawnColorStartSpace = startingLocations[pawn.getColor()];
		var pawnStarting = board.getSpaceAt(pawnColorStartSpace);
		
		if (super.isBlocked(board, pawn, board.getSpaceAt(pawnColorStartSpace - 1), 1)) {
			// to tell caller function that this move is invalid:
			// return false
			return board;
		}
		
		pawnStarting.setPawnOnSpace(pawn);
		
		return board;
	}
}
