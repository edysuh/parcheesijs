import * as net from 'net';

import { Board } from '../Board';
import { Color } from '../definitions';
import { Die } from '../Die';
import { Move } from '../moves/Move';

import { parse } from '../xml/parse';
import { build } from '../xml/build';

export abstract class Player {
	protected _color: Color;
	protected _conn: net.Socket;

	get color() {
		return this._color;
	}

	get conn() {
		return this._conn;
	}

	connectToGame(): void {
		this._conn = net.createConnection(8000, 'localhost');
		// console.log('connected to game');

		this._conn.on('error', (e) => {
			console.log(e, 'connection error');
		});
		
		this._conn.on('data', data => {
			let xml = data.toString();
			let parsed = parse(xml);
			let built;

			switch (parsed.type) {
				case 'start-game':
					let name = this.startGame(parsed.color);
					built = build('name', name);
					this._conn.write(built);
					break;

				case 'do-move':
					let moves = this.doMove(parsed.board, parsed.dice);
					built = build('moves', moves);
					this._conn.write(built);
					break;

				case 'doubles-penalty':
					built = build('void');
					this._conn.write(built);
					break;
			}
		});
	}
	
	startGame(color: Color): string {
		this._color = color;
		return 'tsplayer';
	}
	
	abstract doMove(board: Board, rolls: number[]): Move[];
	
	doublesPenalty(): void { }
}
