import * as net from 'net';

import { Board } from '../Board';
import { Color } from '../definitions';
import { Move } from '../moves/Move';
import { Player } from './Player';

import { parse } from '../xml/parse';
import { build } from '../xml/build';

// place holders
import { Pawn } from '../Pawn';
import { EnterPiece } from '../moves/EnterPiece';

export class SPlayer extends Player {
	constructor(conn: net.Socket) {
		super();
		this._conn = conn;
	}

	connectToGame(): void {
		throw new Error('SPlayer should not connect to game');
	}

	startGame(color: Color): string {
		// encode startGame and send over network
		this._color = color;

		let obj = 
			{ 'start-game': {
				'color': { 
					_text: color
				} 
			}
		};
		// overload the function
		let xml = build('start-game', color);
		this._conn.write(xml);

		this._conn.on('data', data => {
			let name = parse(data.toString());
			return name;
		});
	}

	// encode board and rolls and shoot doMove message
	// receive moves array, parse it, and return it
	doMove(board: Board, rolls: number[]): Move[] {
		return [new EnterPiece(new Pawn(1, Color.blue))];
	}

	// receive void message and thats it
	doublesPenalty(): void { }
}
