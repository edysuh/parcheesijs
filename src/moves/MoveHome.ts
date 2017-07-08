import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../spaces/Space';

export class MoveHome implements Move {
  readonly pawn: Pawn;
  readonly start: Space;
  readonly dist: number;
  
	constructor(pawn: Pawn, start: Space, dist: number) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
	move(board: Board): { 'board': Board, 'bonus': number } {
		return { 'board': board, 'bonus': 0 };
	}
}
