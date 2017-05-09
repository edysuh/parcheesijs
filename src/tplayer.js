import { Player } from './player';

export class TPlayer extends Player {
	constructor(color) {
		super(color);
		this.moves = [];
	}
	
	// getColor() {
	// 	return super.getColor();
	// }
	
	// getPawnById(id) {
	// 	return super.getPawnById(id);
	// }

	doMove(board, rolls) {
		let execMove = [];
		rolls.forEach(roll => {
			if (roll === this.moves[0].dist) {
				let m = this.moves.shift();
				execMove.push(m);
			} else {
				throw new Error("write a fucking proper test");
			}
		});
		return execMove;
	}
	
	doublesPenalty(board) {
		super.doublesPenalty(board);
	}
}
