import { Board } from "./board";

export class Move {
	move() { }
	
  canMoveIfSafety(board, pawn, dest) {
		// if (dest.getPawnOnSpace()) {
		// 	if (dest._isSafety && pawn.getColor() !== dest.getPawnOnSpace().getColor()) {
		// 		return false;
		// 	}
		// }
		// return true;
		
		return !(dest._isSafety && 
						dest.getPawnOnSpace() &&
						dest.getPawnOnSpace().getColor() !== pawn.getColor());
	}

  isBlocked(board, pawn, start, distance) {
  var curr = start;

    for (var i = 0; i < distance; i++) {
      if (board.getNextSpace(curr, pawn.getColor()).isBlockade) {
        return true;
      } else {
        curr = board.getNextSpace(curr, pawn.getColor());
      }
    }
    return false;
  }
}
