import { Die } from "./die";
import { Move } from "./move";
import { MoveMain } from "./moveMain";
import { EnterPiece } from "./enterPiece";
import isEqual from "lodash";

export class Turn {
	constructor(board, player) {
		this.saveBoard = board;
		this.player = player;
		this.doubleCounter = 0;
		this.miniTurn = 1;
	}

	takeTurn(rolls) {
		let board = this.saveBoard;
		let doublesPenalty = false;
		
		while (this.miniTurn > 0) {
			this.miniTurn--;
			
			let rollsHash = new Array(7).fill(0, 1, 7);
			rolls.forEach(roll => { rollsHash[roll]++; });
			
			({rolls, doublesPenalty} = this.checkDoubles(rolls));
			if (doublesPenalty) { return this.player.doublesPenalty(); }
			
			// this needs to be a request over the network to a player
			let playerMoves = this.player.doMove(board, rolls);
			
			while (playerMoves.length > 0) {
				let currMove = playerMoves.shift();
				// console.log('currMove', currMove);
				let bonus = null;

				rollsHash = currMove.checkMove(rollsHash, bonus);
				({ board, bonus } = currMove.move(board));
				// console.log('board', board);
				if (board === null) { throw new Error("Error: cannot make move"); }
				
				if (bonus) {
					let bonusMove = this.player.doMove(board, [bonus]);
					playerMoves.push(bonusMove[0]);
				}
				
				this.player.removeDonePawns();
			}
		}
		
		let oldBlockades = this.saveBoard.findBlockades(this.player.getColor());
		let newBlockades = board.findBlockades(this.player.getColor());
		oldBlockades.forEach(oldb => {
			newBlockades.forEach(newb => {
				if (!isEqual(oldb, newb)) {
					throw new Error("Error: Blockade moved together");
				}
			});
		});
		
		return board;
	}
	
	rollDice() {
		let d1 = new Die();
		let d2 = new Die();
		let r1 = d1.roll();
		let r2 = d2.roll();
		
		return [r1, r2];
	}
	
	checkDoubles(rolls) {
		let doublesPenalty = false;
		
		if (rolls[0] === rolls[1]) {
			this.doubleCounter++;
			
			if (this.doubleCounter < 3) {
				rolls.push(7-rolls[0], 7-rolls[1]);
				this.miniTurn++;
			} else {
				doublesPenalty = true;
			}
		} 
		
		return { 'rolls': rolls, 'doublesPenalty': doublesPenalty };
	}
}
