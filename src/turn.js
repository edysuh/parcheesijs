import { Die } from "./die";
import { Move } from "./move";
import { MoveMain } from "./moveMain";
import { EnterPiece } from "./enterPiece";

export class Turn {
	takeTurn(board, player) {
		let saveBoard = board;
		let doubleCounter = 0;
		let miniTurn = 1;
		
		while (miniTurn > 0) {
			miniTurn--;
			
			let d1 = new Die();
			let d2 = new Die();
			let r1 = d1.roll();
			let r2 = d2.roll();
			
			let rolls = [];
			let rollsHash = new Array(7).fill(0, 1, 7);
			let playerMoves = [];
			
			if (r1 === r2) {
				doubleCounter++;
				if (doubleCounter < 3) {
					rolls = [r1, r2, 7-r1, 7-r2];
					playerMoves = player.doMove(board, rolls);
					miniTurn++;
				} else {
					board = player.doublesPenalty();
					return board;
				}
			} else {
				rolls = [r1, r2];
				playerMoves = player.doMove(board, rolls);
			}
			
			rolls.forEach(el => { rollsHash[el]++; });
			
			while (playerMoves.length > 0) {
				let currMove = playerMoves.shift();
				var moveObj;
				var bonus;

				// cannot make move, due to either pawn not found, blockade, or safety-bop-attempt failure
				if (currMove instanceof MoveMain) {
					if (!rollsHash[currMove.dist]) {
						return "Error: roll does not exist";
					}
					rollsHash[currMove.dist]--;
					
					moveObj = currMove.move(board);
					board = moveObj[board];
					bonus = moveObj[bonus];

					if (!board) {
						return "Error: cannot make move";
					}
					
					currMove.pawn.distRemaining -= currMove.dist;
				}

				// checking for a 5 roll to enter piece
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
					
					moveObj = currMove.move(board);
					board = moveObj[board];
					bonus = moveObj[bonus];
					
					if (!board) {
						return "Error: cannot make enterpiece move";
					}
				}
				
				if (bonus) {
					var bonusMove = player.doMove(board, bonus);
					playerMoves.push(bonusMove);
				}
			}
		}
		
		return board;
	}
}






		// var d1 = new Die();
		// var d2 = new Die();
		
		// var r1 = d1.roll();
		// var r2 = d2.roll();
		
		// var moveQueue = [r1, r2];

		// while (moveQueue) {
		// 	if (r1 === r2) {
		// 		r1 = d1.roll();
		// 		r2 = d2.roll();
				
		// 		moveQueue.push(r1);
		// 		moveQueue.push(r2);
		// 		moveQueue.push(7-r1);
		// 		moveQueue.push(7-r2);
		// 	}
			
		// 	var dist = moveQueue.shift(); // r1 = 4
			
		// 	// if (move instanceof EnterPiece) {
		// 	// 	var move = new EnterPiece();
		// 	// } else if (move instanceof MoveMain()) {
		// 	// 	var move = new MoveMain();
		// 	// } else {
		// 	// 	var move = new Move();
		// 	// }
			
		// 	move.move(prevBoard, pawn, dist);
		// }

		// if rolls 5 or 1 and 4 or 2 and 3 {
			// var retboard = enterPiece(board, pawn);
			// retboard == oldboard;
		// 
			// how do we know that this move was invalid?
			// rather return false, we know the move was invalid
		// okayp = return false;
		// if (!(okayp = false)) turn is over;
		


		// game starts
		// first players turn
		// get an empty board
		// need to know what color player is
		// they roll dice
		// decide what move to take (decide? we re not AI here, need the outline of the decision)
		// need the infrastructure of the move that will be taken
		// move is taken by player (whether it be human or machine)
		// move returns to us (turn?) a new board state
		// return board state back up to (player?) game, for next players turn

		// Record r1 and r2 as a result. Whenever a player makes a move using r1 or r2, deduct it from the result and record it. When result =0, then we know that the player has used all of its possible moves and reutrn Boolean such as isDone = true; to end this turn. In case a player rolls a double, then result no longer is just r1 and r2. We need to implement a new result that is the combination of r1, r2, 7-r1 and 7-r2. Then, rest is the same as above.  



		/* turn is given a player and two dice rolls
		 *
		 * given the two dice rolls a player can do one of:
		 *		enter piece (associated with 5)
		 *		move a piece (main)
		 *		move a piece (home)
		 *		
		 *		queue of rolls/moves (include bops and bonuses)
		 *			- while more in queue, still take turn?
		 *
		 *		- check for blockades with each move
		 *
		 *		bop is a result of a move
		 *		blockade is a resule of a move
		 */

