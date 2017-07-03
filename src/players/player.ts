import { Board } from '../Board';
import { Die } from '../Die';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';

export class Player {
	startGame(color: string): void { }
	
	// doMove(board: Board, dice: Die): Move[] { return [new Move()]; }
	doMove(board: Board, dice: Die): void { }
	
	doublesPenalty(): void { }
}
