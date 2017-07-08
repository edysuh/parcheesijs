import { Board } from '../Board';

export interface Move { 
	move(board: Board): { 'board': Board, 'bonus': number };
}
