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

		while (this._players) {
			let players = this._players.splice(0, 4);
			this.play(players);
		}
	}

	play(players: Player[]) {
		for (let i = 0; i < players.length; i++) {
			players[i].startGame(Colors[i]);
		}

		let board = new Board();
		let saveBoard = cloneDeep(board);
		let dice = new Die();
		let i = 0;

		while (board.gameOver() == null) {
			let currPlayer = players[i];
			console.log('currPlayer', currPlayer);
			console.log('////////////////');
			let currBoard = cloneDeep(saveBoard);
			let rolls = [dice.roll(), dice.roll()];

			let moves = currPlayer.doMove(currBoard, rolls);
			console.log('moves', moves);
			console.log('...................');

			for (let j = 0; j < moves.length; j++) {
				try {
					let moveresult = moves[j].move(currBoard);
					// board = moveresult.board;
					currBoard = moveresult.board;
					saveBoard = moveresult.board;
				} catch (e) {
					console.log(e)
				}
			}
			board.display();
			console.log('----------------------------------------------\n');

			i = (i == 3 ? 0 : i+1);
		}
	}
}
