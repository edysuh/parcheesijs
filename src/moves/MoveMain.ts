import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../Space';

export class MoveMain implements Move {
  pawn: Pawn;
  start: Space;
  dist: number;
  
	constructor(pawn: Pawn, start: Space, dist: number) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
	move(board: Board): { 'board': Board, 'bonus': number } {

		return { 'board': new Board(), 'bonus': 0 };
	}
}
