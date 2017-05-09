import { Board } from './board';
import { COLORS } from './def';

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
	
	start() {
		let board = new Board();
		let i = 0;
		
		// TODO: change this to vary for M and H players
		COLORS.forEach(color => {
			let np = new Player(color);
			register(player);
		});
		
		while (!this.allPlayersDone) {
			let player = this.players[i];
			let t = new Turn();
			
			var newBoard = t.takeTurn(board, player, t.rollDice());
			
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
