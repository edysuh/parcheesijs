import { cloneDeep } from 'lodash';

import { Board } from './Board';
import { Color, Colors } from './definitions';
import { Die } from './Die';
import { Player } from './players/Player';
import { MFirstPlayer, MLastPlayer, chooseMove } from './players/MPlayer';
import { Move } from './moves/Move';
import { EnterPiece } from './moves/EnterPiece';

export class Game {
	private _players: Player[];

	constructor() {
		this._players = [];
	}

	get players() {
		return this._players;
	}

	register(player: Player): void {
		this._players.push(player);
	}

	start() {
		if (this._players.length % 4 != 0) {
			for (let i = this._players.length % 4; i < Colors.length; i++) {
				this._players.push(new MFirstPlayer());
			}
		}

		while (this._players.length > 0) {
			let players = this._players.splice(0, 4);
			console.log(this.play(players), "is the WINNER!");
		}
		// console.log('no more games.');
	}

	play(players: Player[]): Color {
		for (let i = 0; i < players.length; i++) {
			players[i].startGame(Colors[i]);
		}

		let board = new Board();
		let i = 0;

		while (board.gameOver() == null) {
			board = this.takeTurn(board, players[i]);

			i = (i == players.length - 1 ? 0 : i + 1);
		}

		return board.gameOver();
	}

	takeTurn(board: Board, player: Player): Board {
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
					player.doublesPenalty();
					break;
				} else {
					miniturn = true;
				}
				rolls.push(7 - rolls[0], 7 - rolls[1]);
			}

			let moves = player.doMove(board, rolls);
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
					console.log(e, '\n', player.color, 'player cheated. youre out.\n');
					// players.splice(i, 1);
				}
			}

			// if (!this.checkBoardAfterMoves(board, moves, rolls)) {
			// 	console.log(player.color, 'player cheated');
			// }
		}

		return board;
	}

	// The helper function accepts the original board, the final board, and the moves.
	// It checks to see if any blockades were moved together
	// and that all of the die rolls were used.
	checkBoardAfterMoves(board: Board, moves: Move[], rolls: number[]): boolean {
		let rollsConsumed: { [key: number]: number } = {};
		rolls.forEach(r => rollsConsumed[r] = (rollsConsumed[r] ? rollsConsumed[r]+1 : 1));

		return true;
	}

	allRollsConsumed(board: Board, color: Color, moves: Move[], rolls: number[]): boolean {
		for (let i = 0; i < moves.length; i++) {
			if (moves[i] instanceof EnterPiece &&
					rolls.length == 2 && (rolls[0] + rolls[1] == 5)) {
				return true;
			}
			for (let j = 0; j < rolls.length; j++) {
				;
			}
		}

		let pairs = board.getPlayerPawns(color);

		for (let i = 0; i < rolls.length; i++) {
			for (let j = 0; j < pairs.length; j++) {
				let move = chooseMove(pairs[j].pawn, pairs[j].space, rolls[i]);
				try {
					let moveresult = move.move(board);
				} catch (e) {

				}
			}
		}

		return true;
	}
}
