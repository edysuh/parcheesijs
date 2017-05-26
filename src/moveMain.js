import { Move } from "./move";
import { Board } from "./board";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash";

export class MoveMain extends Move {
	constructor(pawn, start, dist) {
		super();
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
  move(board) {
		let newBoard = cloneDeep(board);
    let startSpace = newBoard.findPawnLocation(this.pawn);
		
		if (!isEqual(this.start, startSpace)) {
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
		this.pawn.distRemaining -= this.dist;
    
    return {'board': newBoard, 'bonus': bonus};
  }
	
	// check MoveMain consumes the proper roll, and that the move is allowed
	checkMove(rollsHash, isBonus) {
		if (!rollsHash[this.dist] && isBonus !== null) {
			throw new Error("Error: roll does not exist");
		}
		rollsHash[this.dist]--;
		
		return rollsHash;
	}
}
