import { Board } from '../Board';
import { Color } from '../defs';
import { Die } from '../Die';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';

// should be abstract or interface
export abstract class Player {
	color: Color;
	
	startGame(color: Color): void {
		this.color = color;
	}
	
	// doMove(board: Board, dice: Die): Move[] { return [new Move()]; }
	doMove(board: Board, dice: Die): void { }
	
	doublesPenalty(): void { }
}
