import { Board } from './board';
import { COLORS } from './def';
import express from 'express';

// TODO: COMPLETELY UNTESTED
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
		var app = express();
		console.log('app', app);

		app.get('/', (req, res) => {
			res.send("hello from game.js");
			// parse req and execute commands
			// at first, wait for four players to register, then run start game
		});

		app.listen(8000, () => {
			console.log("game.js listening on port 8000");
		});
	}
	
	start() {
		let board = new Board();
		let i = 0;
		
		while (!this.allPlayersDone) {
			let player = this.players[i];
			let t = new Turn();
			
			var newBoard = t.takeTurn(board, player);
			// var newBoard = t.takeTurn(board, player, t.rollDice());
			
			if (newBoard instanceof Board) {
				board = newBoard;
			} else {
				// kick player out; he cheated
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
