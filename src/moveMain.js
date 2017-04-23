import { Move } from "./move";

export class MoveMain extends Move {
  moveMain(board, pawn, dist) {
    var startSpace = board.findPawnLocation(pawn);
    
    if (super.isBlocked(board, pawn, startSpace, dist)) {
      return board;
    }
    
    var destSpace = startSpace;
    
    for (var i = 0; i < dist; i++) {
      destSpace = board.getNextSpace(destSpace, pawn.getColor());
    }

    if (!super.canMoveIfSafety(board, pawn, destSpace)) {
      return board;
    }
      
    var existingPawn = destSpace.getPawnOnSpace();
    
    if (existingPawn) {
      if (existingPawn.getColor() === pawn.getColor()) {
        destSpace.isBlockade = true;
      } else {
        // bop
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
