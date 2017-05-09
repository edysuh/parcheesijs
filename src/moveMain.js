import { Move } from "./move";
import { Board } from "./board";

export class MoveMain extends Move {
	constructor(pawn, start, dist) {
		super();
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
  move(board) {
		let newBoard = board;
    let startSpace = newBoard.findPawnLocation(this.pawn);
		
		if (this.start !== startSpace) {
			throw new Error("pawn cannot be found");
		}
    
    if (super.isBlocked(newBoard, this.pawn, startSpace, this.dist)) {
			console.log("blocked");
      return null;
    }
    
    let destSpace = startSpace;
    
    for (let i = 0; i < this.dist; i++) {
      destSpace = newBoard.getNextSpace(destSpace, this.pawn.getColor());
    }

    if (!super.canMoveIfSafety(newBoard, this.pawn, destSpace)) {
			console.log("safety");
      return null;
    }
      
		let bonus = super.isBopOrBlockade(newBoard, destSpace);
    
    if (startSpace.isBlockade) {
      startSpace.isBlockade = false;
    }

    startSpace.removePawnOnSpaceById(this.pawn.getId());
    destSpace.setPawnOnSpace(this.pawn);
		
		// if (board === newBoard) {
		// 	console.log("board equality");
		// } else {
		// 	console.log("not equal");
		// }
		
		this.pawn.distRemaining -= this.dist;
    
    return {'board': newBoard, 'bonus': bonus};
  }
}
