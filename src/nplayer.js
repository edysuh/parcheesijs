import { Player } from './player';

export class NPlayer extends Player {
	constructor(color, conn) {
		super(color);
		this.conn = conn;
	}
	
	doMove() {
		this.conn.write(encode(domove, board, roll));
		
		// wait for a response
		this.conn.on("data", (data) => {
			return movesArray;
		});
	}
	
	doublesPenalty() {
		this.conn.write(encode(doublesPenalty));
		
		// return void;
	}
}
