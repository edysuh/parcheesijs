import { Board } from './board';
import { NPlayer } from './nplayer';
import { COLORS } from './def';
import { encode } from '../xml/encode';
import { parse } from '../xml/parse';
import net from 'net';

export class Game {
	constructor() {
		this.players = [];
	}

	register(player) {
		if (this.players.length >= 4) {
			throw new Error("Trying to add more than 4 players");
		}
		
		if (!COLORS.includes(player.getColor())) {
			this.players.push(player);
		}
	}
	
	startServer() {
		let playerCount = 0;
		let gameStarted = false;
		const server = net.createServer();
		
		server.listen(8000, () => {
			console.log("game server listening on port 8000");
		});
		
		server.on('connection', (conn) => {
			playerCount++;
			
			if (playerCount <= 4) {
				let color = COLORS[playerCount-1];
				let nplayer = new NPlayer(color, conn);
				this.players.push(nplayer);

				conn.write(color + "\n");
			}
			
			console.log(this.players);
			
			if (playerCount === 4) {
				this.start();
			}
		});
		
		// start game and send doMove/doublesPenalty requests to connections
	}
	
	start() {
		let board = new Board();
		let i = 0;
		
		while (!this.allPlayersDone) {
			let player = this.players[i];
			let t = new Turn(board, player);
			let rolls = t.rollDice();
			
			var newBoard = t.takeTurn(rolls);
			
			if (newBoard instanceof Board) {
				board = newBoard;
			} else {
				throw new Error("player cheated");
			}
			
			i = i === 3 ? 0 : i + 1;
		}
	}
	
	allPlayersDone() {
		return this.players.every(player => {
			return player.isDone();
		});
	}
}
