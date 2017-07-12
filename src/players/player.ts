import { Board } from '../Board';
import { Color } from '../definitions';
import { Die } from '../Die';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';

// should be abstract or interface
export abstract class Player {
	protected _color: Color;
	
	startGame(color: Color): void {
		this._color = color;
	}
	
	get color() {
		return this._color;
	}
	
	abstract doMove(board: Board, rolls: number[]): Move[];
	
	doublesPenalty(): void { }
}
