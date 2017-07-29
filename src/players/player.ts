import * as net from 'net';

import { Board } from '../Board';
import { Color } from '../definitions';
import { Die } from '../Die';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';

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
		
		this._conn.on('data', data => {
			let str = data.toString();
			console.log(str);

			let obj = parse(str);

			if (obj['start-game']) {
				let name = this.startGame(obj['start-game'].color._text);
				let robj = {
					'name': { 
						_text: name
					}
				}
				console.log('robj', robj);
				let b = build(robj);
				console.log('b', b);
				this._conn.write(b);

			} else if (obj['do-move']) {

			} else if (obj['doubles-penalty']) {

			}
		});
		// switch for:
		// - startGame
		// - doMove
		// - doublesPenalty
	}
	
	startGame(color: Color): string {
		this._color = color;
		return this._color + ' player';
	}
	
	abstract doMove(board: Board, rolls: number[]): Move[];
	
	doublesPenalty(): void { }
}
