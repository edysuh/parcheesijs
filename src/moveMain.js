import { Move } from "./move";

export class MoveMain extends Move {
	constructor(pawn, dist) {
		super();
		this.pawn = pawn;
		this.dist = dist;
	}
	
  move(board) {
    var startSpace = board.findPawnLocation(this.pawn);
		
		if (!startSpace) {
			console.log('startSpace', startSpace);
			
			return null;
		}
    
    if (super.isBlocked(board, this.pawn, startSpace, this.dist)) {
			console.log('isBlocked', isBlocked);
      return null;
    }
    
    var destSpace = startSpace;
    
    for (var i = 0; i < this.dist; i++) {
      destSpace = board.getNextSpace(destSpace, this.pawn.getColor());
    }

    if (!super.canMoveIfSafety(board, this.pawn, destSpace)) {
			console.log('canMoveIfSafety', canMoveIfSafety);
      return null;
    }
      
		// if (isBopOrBlockade(board, destSpace) === "blockade") {

		// if (isBopOrBlockade(board, destSpace) === "bop") {
		// 	bonus = 20;
		// }
		var bonus = super.isBopOrBlockade(board, destSpace);
    
    if (startSpace.isBlockade) {
      startSpace.isBlockade = false;
    }

    startSpace.removePawnOnSpaceById(this.pawn.getId());
    destSpace.setPawnOnSpace(this.pawn);
    
    return {'board': board, 'bonus': bonus};
  }
}
