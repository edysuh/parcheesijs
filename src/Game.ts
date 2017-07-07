import { cloneDeep } from 'lodash';
import { Board } from './Board';
import { Color, Colors } from './defs';
import { Die } from './Die';
import { isMoveResult } from './moves/MoveMain';
import { Player } from './players/Player';
import { MFirstPlayer } from './players/MPlayer';

export class Game {
	players: Player[];

	constructor() {
		this.players = [];
	}

	register(player: Player): void {
		this.players.push(player);
	}

	start() {
		for (let i = this.players.length % 4; i < Colors.length; i++) {
			this.players.push(new MFirstPlayer());
		}

		while (this.players) {
			let players = this.players.splice(0, 4);
			this.play(players);
		}
	}

	play(players: Player[]) {
		for (let i = 0; i < players.length; i++) {
			players[i].startGame(Colors[i]);
		}

		let board = new Board();
		let i = 0;
		
		while (!this.gameOver(board)) {
			let currPlayer = players[i];
			let currBoard = cloneDeep(board);
			let rolls = [(new Die()).roll(), (new Die()).roll()];
			
			currPlayer.doMove(currBoard, rolls);
			
			let ret = moves[i].move(currBoard);
			if (isMoveResult(ret)) {
				board = ret.board;
			} else { }

			i = (i == 3) ? 0 : i+1;
		}

// 		while (!this.gameOver(board)) {
// 			let currPlayer = players[i];
// 			let currBoard = cloneDeep(board);
// 			let rolls = [(new Die()).roll(), (new Die()).roll()];
// 			let hasTurnsRemaining = true;
// 			let doublesRemaining = 3;
// 			// check doubles and give extra rolls
// 			// also check for blockade moves

// 			while (hasTurnsRemaining) {
// 				let moves = currPlayer.doMove(currBoard, rolls);
// 				hasTurnsRemaining = false;

// 				// apply moves to board and check for validity
// 				for (let i = 0; i < moves.length; i++) {
// 					let ret = moves[i].move(currBoard);
// 					if (isMoveResult(ret)) {
// 						board = ret.board;
// 						if (ret.bonus) {
// 							rolls = [ret.bonus];
// 							hasTurnsRemaining = true;
// 						}
// 					} else {
// 						// player cheated: kick him out
// 						// board = board;
// 					}
// 				}
// 			}


// 			i = (i == 3) ? 0 : i+1;
// 		}
	}

			// // apply moves to board and check for validity
			// for (let i = 0; i < moves.length; i++) {
			// 	try {
			// 		let ret = moves[i].move(currBoard);
			// 		board = ret.board;
			// 	} catch (e) {
			// 		// player cheated
			// 	}
			// }

	gameOver(board: Board): boolean {
		return true;
	}
}
