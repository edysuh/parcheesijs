import { cloneDeep } from 'lodash';

import { Board } from './Board';
import { Die } from './Die';
import { Player } from './players/Player';
import { chooseMove } from './players/MPlayer';
import { Move } from './moves/Move';
import { EnterPiece } from './moves/EnterPiece';
import { MoveMain } from './moves/MoveMain';
import { MoveHome } from './moves/MoveHome';

export class Turn {
	private player: Player;

	constructor(player: Player) {
		this.player = player;
	}

	takeTurn(board: Board): Board {
		let dice = new Die();
		let doubles = 3;
		let miniturn = true;

		while (miniturn) {
			let rolls = [dice.roll(), dice.roll()];
			miniturn = false;

			if (rolls[0] == rolls[1]) {
				doubles--;
				if (doubles == 0) {
					// implement moving farthest pawn back
					this.player.doublesPenalty();
					break;
				} else {
					miniturn = true;
				}
				rolls.push(7 - rolls[0], 7 - rolls[1]);
			}

			let moves = this.player.doMove(board, rolls);
			let saveBoard = cloneDeep(board);

			for (let j = 0; j < moves.length; j++) {
				try {
					let moveresult = moves[j].move(board);
					board = moveresult.board;
					if (moveresult.bonus != 0) {
						rolls.push(moveresult.bonus);
					}
				} catch (e) {
					// clean board of their pawns?
					board = saveBoard;
					console.log(e, '\n', this.player.color, 'player cheated. youre out.\n');
					// players.splice(i, 1);
				}
			}

			if (!this.allRollsConsumed(board, moves, rolls)) {
					console.log(this.player.color, 'player cheated. youre out.\n');
			}
		}

		return board;
	}

	// The helper function accepts the original board, the final board, and the moves.
	// It checks to see if any blockades were moved together
	// and that all of the die rolls were used.
	checkBoardAfterMoves(board: Board, moves: Move[], rolls: number[]): boolean {

		return true;
	}

	allRollsConsumed(board: Board, moves: Move[], rolls: number[]): boolean {
		if (moves[0] instanceof EnterPiece && 
				rolls.length == 2 && (rolls[0] + rolls[1] == 5)) {
			return true;
		}

		for (let i = 0; i < moves.length; i++) {
			for (let j = 0; j < rolls.length; j++) {
				if (moves[i] instanceof EnterPiece) {
					if (rolls[j] == 5) {
						rolls.splice(j, 1);
						break;
					}
				} else if (moves[i] instanceof MoveMain) {
					if (rolls[j] == (<MoveMain>moves[i]).dist) {
						rolls.splice(j, 1);
						break;
					}
				} else if (moves[i] instanceof MoveHome) {
					if (rolls[j] == (<MoveHome>moves[i]).dist) {
						rolls.splice(j, 1);
						break;
					}
				}
			}
		}

		if (rolls.length == 0) { return true; }

		let pairs = board.getPlayerPawns(this.player.color);

		for (let i = 0; i < rolls.length; i++) {
			for (let j = 0; j < pairs.length; j++) {
				let move = chooseMove(pairs[j], rolls[i]);
				let errorThrown = false;
				try {
					move.move(board);
				} catch (e) {
					errorThrown = true;
				}
				if (!errorThrown) {
					return false;
				}
			}
		}

		return true;
	}
}
