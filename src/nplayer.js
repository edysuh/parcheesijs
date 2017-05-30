import { Player } from './player';
import { encode } from '../xml/encode';
import { parse } from '../xml/parse';

export class NPlayer extends Player {
	constructor(color, conn) {
		super(color);
		this.conn = conn;
	}
	
	doMove(board, roll) {
		this.conn.write(encode(domove, board, roll));
		
		// wait for a response
		this.conn.on("data", (data) => {
			return movesArray;
		});
	}
	
	doublesPenalty(board) {
		this.conn.write(encode(doublesPenalty));
		
		// return void;
	}
}
