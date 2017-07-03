import { Board } from '../Board';
import { Color } from '../defs';
import { Die } from '../Die';
import { Player } from '../players/Player';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';

export abstract class MPlayer extends Player { }

export class MFirstPlayer extends MPlayer {
	doMove(board: Board, dice: Die): void { }
}

export class MLastPlayer extends MPlayer {
	doMove(board: Board, dice: Die): void { }
}
