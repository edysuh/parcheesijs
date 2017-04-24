import { Move } from "./move";

export class MoveMain extends Move {
	// change this function to a virtual implementation of move.move()
  moveMain(board, pawn, dist) {
  // move(board, pawn, dist) {
    var startSpace = board.findPawnLocation(pawn);
    
    if (super.isBlocked(board, pawn, startSpace, dist)) {
			// to tell caller function that this move is invalid:
			// return false
      return board;
    }
    
    var destSpace = startSpace;
    
    for (var i = 0; i < dist; i++) {
      destSpace = board.getNextSpace(destSpace, pawn.getColor());
    }

    if (!super.canMoveIfSafety(board, pawn, destSpace)) {
			// to tell caller function that this move is invalid:
			// return false
      return board;
    }
      
    var existingPawn = destSpace.getPawnOnSpace();
    
    if (existingPawn) {
      if (existingPawn.getColor() === pawn.getColor()) {
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

    startSpace.removePawnOnSpace();
    destSpace.setPawnOnSpace(pawn);
    
    return board;
  }
}
