import { cloneDeep } from 'lodash';
import { Board } from './Board';
import { Color, Colors } from './definitions';
import { Die } from './Die';
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
		for (let i = this._players.length % 4; i < Colors.length; i++) {
			this._players.push(new MFirstPlayer());
		}

		let winner;
		while (this._players.length > 0) {
			let players = this._players.splice(0, 4);
			winner = this.play(players);
		}
		console.log(winner, "is the WINNER!");
	}

	play(players: Player[]): Color {
		for (let i = 0; i < players.length; i++) {
			players[i].startGame(Colors[i]);
		}

		let board = new Board();
		let saveBoard = cloneDeep(board);
		let dice = new Die();
		let i = 0;

		while (board.gameOver() == null) {
			let currPlayer = players[i];
			// console.log(Math.floor(turns/4));
			// console.log('currPlayer', currPlayer);
			// console.log('////////////////');
			let saveBoard = cloneDeep(board);
			let rolls = [dice.roll(), dice.roll()];

			let moves = currPlayer.doMove(board, rolls);
			// console.log('moves', moves);
			// console.log('...................');

			for (let j = 0; j < moves.length; j++) {
				try {
					let moveresult = moves[j].move(board);
					board = moveresult.board;
				} catch (e) {
					board = cloneDeep(saveBoard);
					console.log(e)
				}
			}
			// board.display();
			// console.log('----------------------------------------------\n');

			i = (i == 3 ? 0 : i+1);
		}

		return board.gameOver();
	}
}
