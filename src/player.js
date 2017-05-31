import { Pawn } from "./pawn";
import { NUMPAWNS } from './def';
import { encode } from '../xml/encode';
import { parse } from '../xml/parse';
import net from 'net';

export class Player {
	constructor(color) {
		this._color = color;
		this.pawns = [];
		
		for (let i = 0; i < NUMPAWNS; i++) {
			this.pawns[i] = new Pawn(i, color);
		}
	}
	
	connectToGame() {
		// return stringNameColor;
		const conn = net.createConnection(8000, 'localhost', () => {
			conn.on('data', (data) => {
				let req = parse(data);
				
				switch (req.name) {
				// on startGame:
				// this._color = parse(data);
				// response: named player (color)
					case 'start-game':
						break;

				// on doMove:
				// call doMove
				// response: Moves array
					case 'do-move':
						let moves = this.doMove(board, roll);
						conn.write(encode(moves));
						break;

				// on doublesPenalty:
				// call doublesPenalty
				// response: void (?) this is executed on the server side?
					case 'doubles-penalty':
						break;
				}
			});
		});
	}
	
	getColor() {
		return this._color;
	}
	
	getPawnById(id) {
		for (let i = 0; i < this.pawns.length; i++) {
			if (id === this.pawns[i].getId()) {
				return this.pawns[i];
			}
		}
	}
	
	removeDonePawns() {
		for (let i = 0; i < this.pawns.length; i++) {
			if (this.pawns[i].distRemaining === 0) {
				this.pawns.splice(i, 1);
				i--;
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
