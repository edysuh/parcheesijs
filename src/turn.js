import { Die } from "./die";
import { Move } from "./move";
import { MoveMain } from "./moveMain";
import { EnterPiece } from "./enterPiece";

export class Turn {
	takeTurn(board, player, rolls) {
		let saveBoard = board;
		let doubleCounter = 0;
		let miniTurn = 1;
		
		// continue giving a player moves when rolls doubles, unless he rolls 3 in a row
		while (miniTurn > 0) {
			miniTurn--;
			
			let rollsHash = new Array(7).fill(0, 1, 7);
			rolls.forEach(el => { rollsHash[el]++; });

			let playerMoves = [];
			
			// if player rolls doubles, give him 4 mini-moves and another pair of rolls
			if (rolls[0] === rolls[1]) {
				doubleCounter++;
				if (doubleCounter < 3) {
					rolls.push(7-rolls[0], 7-rolls[1]);
					playerMoves = player.doMove(board, rolls);
					miniTurn++;
				} else {
					board = player.doublesPenalty();
					return board;
				}
			// else just give him his pair of rolls and execute his turn
			} else {
				playerMoves = player.doMove(board, rolls);
			}
			
			// while the player has moves left, check for validity of the move, and then execute
			while (playerMoves.length > 0) {
				let currMove = playerMoves.shift();
				let bonus = null;

				// check MoveMain consumes the proper roll, and that the move is allowed
				if (currMove instanceof MoveMain) {
					if (!rollsHash[currMove.dist]) {
						return "Error: roll does not exist";
					}
					rollsHash[currMove.dist]--;
					
					({ board, bonus } = currMove.move(board));

					if (!board) {
						return "Error: cannot make move";
					}
				}

				// check EnterPiece is properly using a "5 roll"
				if (currMove instanceof EnterPiece) {
					if (rollsHash[5]) {
						rollsHash[5]--;
					} else if (rollsHash[1] && rollsHash[4]) {
						rollsHash[1]--;
						rollsHash[4]--;
					} else if (rollsHash[2] && rollsHash[3]) {
						rollsHash[2]--;
						rollsHash[3]--;
					} else {
						return "Error: didnt roll a 5";
					}
					
					({ board, bonus } = currMove.move(board));
					
					if (!board) {
						return "Error: cannot make enterpiece move";
					}
				}
				
				// if a bonus was returned from a move, give the player a bonus move
				if (bonus) {
					let bonusMove = player.doMove(board, bonus);
					playerMoves.push(bonusMove);
				}
			}
		}

		// TODO: check for illegal blockade moves as pairs by comparing board states
			
		return board;
	}
	
	rollDice() {
		let d1 = new Die();
		let d2 = new Die();
		let r1 = d1.roll();
		let r2 = d2.roll();
		
		return [r1, r2];
	}
}
