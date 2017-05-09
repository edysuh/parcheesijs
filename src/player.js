import { Pawn } from "./pawn";
import { NUMPAWNS } from './def';

export class Player {
	constructor(color) {
		this._color = color;
		this._name = color + " player";
		this.pawns = [];
		
		for (let i = 0; i < NUMPAWNS; i++) {
			this.pawns[i] = new Pawn(i, color);
		}
	}
	
	register() {
		// encode this._name and send over the network
	}
	
	getColor() {
		return this._color;
	}
	
	getPawnById(id) {
		for (let i = 0; i < NUMPAWNS; i++) {
			if (id === this.pawns[i].getId()) {
				return this.pawns[i];
			}
		}
	}
	
	// abstract function that, given a board and rolls, returns and Move array
	doMove(board, rolls) { }
	
  doublesPenalty(board) {
    let farPawn = this.pawns.reduce((prev, curr) => {
      return prev.distRemaining < curr.distRemaining ? prev : curr;
    });
    let pawnSpace = board.findPawnLocation(farPawn);
			
		if (pawnSpace) {
			pawnSpace.removePawnOnSpaceById(farPawn.getId());
			farPawn.resetToStart();
		}
  }
	
	isDone() {
		return this.pawns > 0;
	}
}
