import { Board } from '../Board';
import { Color } from '../defs';
import { Die } from '../Die';
import { Player } from '../players/Player';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { MainSpace } from '../spaces/MainSpace';

import { Pawn } from '../Pawn';

export abstract class MPlayer extends Player { 
	doMove(board: Board, rolls: number[]): Move[] {
		let moves = [];
		for (let i = 0; i < rolls.length; i++) {
			moves.push(new MoveMain(new Pawn(0, Color.blue), new MainSpace(0), rolls[i]));
		}
		return moves;
	}
}

export class MFirstPlayer extends MPlayer { }

export class MLastPlayer extends MPlayer { }
