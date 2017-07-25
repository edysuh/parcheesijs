import { Board } from '../Board';
import { MoveResult } from '../definitions';

export interface Move { 
	move(board: Board): MoveResult;
}
