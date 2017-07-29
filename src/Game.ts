import * as net from 'net';
import { cloneDeep } from 'lodash';

import { Board } from './Board';
import { Color, Colors } from './definitions';
import { Turn } from './Turn';
import { Player } from './players/Player';
import { SPlayer } from './players/SPlayer';
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

	startServer(): void {
		let server = net.createServer();

		server.on('connection', conn => {
			console.log('connection accepted');
			let p = new SPlayer(conn);
			this.register(p);
		});

		server.listen(8000, () => {
			console.log('game server started at port 8000');
		});
	}

	start(): void {
		if (this._players.length % 4 != 0) {
			for (let i = this._players.length % 4; i < Colors.length; i++) {
				this.register(new MFirstPlayer());
			}
		}

		let i = 0; 
		while (this._players.length > 0) {
			let players = this._players.splice(0, 4);
			console.log(i, this.play(players), "is the WINNER!");
			i++;
		}
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
