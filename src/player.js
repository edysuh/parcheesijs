import { Pawn } from "./pawn";
import { Move } from "./move";
import { MoveMain } from './moveMain';
import { EnterPiece } from './enterPiece';

export class Player {
	constructor(color) {
		this._color = color;
		this._pawns = [];
		
		for (let i = 0; i < 4; i++) {
			this._pawns[i] = new Pawn(i, color);
		}
	}
	
	getColor() {
		return this._color;
	}
	
	getPawnById(id) {
		for (let i = 0; i < 4; i++) {
			if (id === this._pawns[i].getId()) {
				return this._pawns[i];
			}
		}
	}
	
	// abstract function that is different for humans and machines
	// given a board and array of rolls, return an array of the moves the player decided on
	// TODO: temporary doMove for testing
	doMove(board, rolls) {
		let p = this._pawns[0];
		let moves = [];
		let m;

		rolls.forEach(dist => {
			if (dist === 5) {
				p = this._pawns[1];
				m = new EnterPiece(p);
			} else {
				m = new MoveMain(p, board.findPawnLocation(p), dist);
			}
			moves.push(m);
		});
		
		return moves;
	}
	
	doublesPenalty(board) {
		let pawnDistArr = [];
		for (let i=0; i<this._pawns.length; i++) {
			pawnDistArr[i] = this._pawns[i].distRemaining;
		}
		
		var farPawnDist = pawnDistArr.reduce((prev, curr) => {
			return prev < curr ? prev : curr;
		});
		
		for (let i=0; i<this._pawns.length; i++) {
			if (this._pawns[i].distRemaining === farPawnDist) {
				var pawnSpace = board.findPawnLocation(this._pawns[i]); 
				pawnSpace.removePawnOnSpaceById(i);
				// make reset-to-starting function for pawn?
				this._pawns[i].distRemaining = 75;
			}
		}
		return board; 
	}		
}
