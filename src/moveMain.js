import { Move } from "./move";

export class MoveMain extends Move {
	constructor(pawn, dist) {
		super();
		this.pawn = pawn;
		// this._start = start;
		this.dist = dist;
	}
	
	// change this function to a virtual implementation of move.move()
  // moveMain(board, pawn, dist) {
  move(board) {
    var startSpace = board.findPawnLocation(this.pawn);
		
		if (!startSpace) {
			return null;
		}
    
    if (super.isBlocked(board, this.pawn, startSpace, this.dist)) {
      return null;
    }
    
    var destSpace = startSpace;
    
    for (var i = 0; i < this.dist; i++) {
      destSpace = board.getNextSpace(destSpace, this.pawn.getColor());
    }

    if (!super.canMoveIfSafety(board, this.pawn, destSpace)) {
      return null;
    }
      
    var existingPawn = destSpace.getPawnOnSpace();
    
    if (existingPawn) {
      if (existingPawn.getColor() === this.pawn.getColor()) {
        destSpace.isBlockade = true;
      } else {
        // bop
				// 
				// remove pawn from this space
				// (dont need to send to start since we don't have a start space)
				// pawn lands on this space
				// reward a bonus move of 20
      }
    }
    
    if (startSpace.isBlockade) {
      startSpace.isBlockade = false;
    }

    startSpace.removePawnOnSpaceById(this.pawn.getId());
    destSpace.setPawnOnSpace(this.pawn);
    
    return board;
  }
}
