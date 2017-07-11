import { Board } from '../Board';
import { Color } from '../definitions';
import { Die } from '../Die';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';

// should be abstract or interface
export abstract class Player {
	protected color: Color;
	
	startGame(color: Color): void {
		this.color = color;
	}
	
	abstract doMove(board: Board, rolls: number[]): Move[];
	
	doublesPenalty(): void { }
}
