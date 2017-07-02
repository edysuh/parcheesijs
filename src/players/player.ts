import { Board } from '../Board';
import { Die } from '../Die';
import { Move } from '../moves/Move';

export class Player {
	startGame(color: string): void { }
	
	doMove(board: Board, dice: Die): Move[] { return [new Move()]; }
	
	doublesPenalty(): void { }
}
