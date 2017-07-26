import { cloneDeep } from 'lodash';

import { Board } from './Board';
import { Color, Colors } from './definitions';
import { Turn } from './Turn';
import { Player } from './players/Player';
import { MFirstPlayer, MLastPlayer } from './players/MPlayer';

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
			let turn = new Turn(players[i]);
			board = turn.takeTurn(board);

			i = (i == players.length - 1 ? 0 : i + 1);
		}

		return board.gameOver();
	}
}
