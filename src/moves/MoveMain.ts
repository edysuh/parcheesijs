import { Board } from '../board';
import { Move } from '../move';

export class MoveMain extends Move {
	constructor(pawn, start, dist) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
	move(board) { }
}
