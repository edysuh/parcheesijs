import { Move } from "./move";

export class MoveMain extends Move {
	constructor(pawn, start, dist) {
		super();
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
  move(board) {
    var startSpace = board.findPawnLocation(this.pawn);
		if (this.start !== startSpace) {
			throw new Error("pawn cannot be found");
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
      
		var bonus = super.isBopOrBlockade(board, destSpace);
    
    if (startSpace.isBlockade) {
      startSpace.isBlockade = false;
    }

    startSpace.removePawnOnSpaceById(this.pawn.getId());
    destSpace.setPawnOnSpace(this.pawn);
    
    return {'board': board, 'bonus': bonus};
  }
}
