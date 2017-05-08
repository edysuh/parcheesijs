import { Board } from "./board";

export class Move {
	move() { }
	
	// pre: assure pawn is landing on dest
	// post: bool
  canMoveIfSafety(board, pawn, dest) {
		return !(dest._isSafety && 
						dest.getPawnOnSpace() &&
						dest.getPawnOnSpace().getColor() !== pawn.getColor());
	}

	// pre: start and dist are spaces, pawn is on start
	// post: bool
  isBlocked(board, pawn, start, distance) {
  let curr = start;

    for (let i = 0; i < distance; i++) {
      if (board.getNextSpace(curr, pawn.getColor()).isBlockade) {
        return true;
      } else {
        curr = board.getNextSpace(curr, pawn.getColor());
      }
    }
    return false;
  }
	
	// pre: dest is a space on the board
	// post: returns the bonus of 20 if bopped, returns null if not bop
	// post: also will set blockade on space if same color pawn exist
	isBopOrBlockade(board, dest) {
    let existingPawn = dest.getPawnOnSpace();
    
    if (existingPawn) {
      if (existingPawn.getColor() === this.pawn.getColor()) {
        dest.isBlockade = true;
      } else {
				dest.removePawnOnSpaceById(existingPawn.getId());
				existingPawn.distRemaining = 75;
				
				return 20;
      }
    }
		return null;
	}
}
