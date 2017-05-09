import { Pawn } from "./pawn";
import { NUMPAWNS } from './def';
import net from 'net';
import { encode } from '../xml/encode';
import { parse } from '../xml/parse';

export class Player {
	constructor(color) {
		this._color = color;
		this._name = color + " player";
		this.pawns = [];
		
		for (let i = 0; i < NUMPAWNS; i++) {
			this.pawns[i] = new Pawn(i, color);
		}
	}
	
	connectToGame() {
		const client = net.createConnection(8000, 'localhost', () => {
			// receive player color first
			// client.on('data', (data) => {
			// 	this._color = data;
			// });

			// client.write(encode(this._name));
			client.write(this._name);
		});
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
