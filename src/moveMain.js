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
		let bonus;
		
		if (!isEqual(this.start, startSpace)) {
			throw new Error("pawn cannot be found");
		}
    
    if (super.isBlocked(newBoard, this.pawn, startSpace, this.dist)) {
      return null;
    }
    
    let destSpace = startSpace;
    for (let i = 0; i < this.dist; i++) {
			// if the player overshoots home
			if (!destSpace) {
				return null;
			}
      destSpace = newBoard.getNextSpace(destSpace, this.pawn.getColor());
    }
		
		// if dest space is not home
		if (destSpace) {
			if (!super.canMoveIfSafety(newBoard, this.pawn, destSpace)) {
				return null;
			}
				
			bonus = super.isBopOrBlockade(newBoard, destSpace);
			
			if (startSpace.isBlockade) {
				startSpace.isBlockade = false;
			}

			destSpace.setPawnOnSpace(this.pawn);
		}
		
		startSpace.removePawnOnSpaceById(this.pawn.getId());
		this.pawn.distRemaining -= this.dist;
		
		if (this.pawn.distRemaining === 0) {
			bonus = 10;
		}
    
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
