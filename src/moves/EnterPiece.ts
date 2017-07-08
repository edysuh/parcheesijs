import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Move } from './Move';

export class EnterPiece implements Move {
  readonly pawn: Pawn;
  
	constructor(pawn: Pawn) {
		this.pawn = pawn;
	}
	
	move(board: Board): { 'board': Board, 'bonus': number } {
		return { 'board': board, 'bonus': 0 };
	}
}
