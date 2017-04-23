import { Board } from "./board";

export class Move {
    canMoveIfSafety(board, pawn, dest) {
		if (dest._isSafety && pawn.getColor() !== dest.getPawnOnSpace().getColor()) {
			return false;
		}
		return true;
	}

    isBlocked(board, pawn, start, distance) {
		var curr = start;
		
        for (var i = 0; i < distance; i++) {
            if (board.getNextSpace(curr).isBlockade) {
                return true;
            } else {
                curr = board.getNextSpace(curr);
            }
        }
        return false;
    }
}
