import { cloneDeep } from 'lodash';

import { Board } from './Board';
import { Color, Colors } from './definitions';
import { Die } from './Die';
import { Move } from './moves/Move';
import { Player } from './players/Player';
import { MFirstPlayer } from './players/MPlayer';

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

		let winner;
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
		let dice = new Die();
		let i = 0;

		while (board.gameOver() == null) {
			let currPlayer = players[i];
			// let saveBoard = cloneDeep(board);
			let doubles = 3;
			let miniturn = true;

			while (miniturn) {
				miniturn = false;

				let rolls = [dice.roll(), dice.roll()];
				if (rolls[0] == rolls[1]) {
					doubles--;
					if (doubles == 0) {
						currPlayer.doublesPenalty();
						break;
					} else {
						miniturn = true;
					}
					rolls.push(7 - rolls[0], 7 - rolls[1]);
				}

				let rollsConsumed: { [key: number]: number } = {};
				rolls.forEach(r => rollsConsumed[r] = (rollsConsumed[r] ? rollsConsumed[r]+1 : 1));

				let moves = currPlayer.doMove(board, rolls);
				let saveBoard = cloneDeep(board);

				for (let j = 0; j < moves.length; j++) {
					try {
						let moveresult = moves[j].move(board);
						board = moveresult.board;

					} catch (e) {
						// board = saveBoard;
						console.log(e, '\n', currPlayer.color, 'player cheated. youre out.\n');
						players.splice(i, 1);
					}
				}

				// this.checkBoardAfterMoves(board, moves);
			}

			i = (i == players.length - 1 ? 0 : i + 1);
		}

		return board.gameOver();
	}

	// The helper function accepts the original board, the final board, and the moves.
	// It checks to see if any blockades were moved together
	// and that all of the die rolls were used.
	checkBoardAfterMoves(board: Board, moves: Move[]): boolean {
		return false;
	}

	// how to check die completion/usage?
}
