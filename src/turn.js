import { Move } from "./move";
import { moveMain } from "./moveMain";
import { enterPiece } from "./enterPiece";

export class Turn {
	takeTurn(prevBoard, player) {
		var d1 = new Die();
		var d2 = new Die();
		
		var r1 = d1.roll();
		var r2 = d2.roll();
		
		var moveQueue = [r1, r2];

		while (moveQueue) {
			if (r1 === r2) {
				r1 = d1.roll();
				r2 = d2.roll();
				
				moveQueue.push(r1);
				moveQueue.push(r2);
				moveQueue.push(7-r1);
				moveQueue.push(7-r2);
			}
			
			var dist = moveQueue.shift(); // r1 = 4
			
			// if (move instanceof EnterPiece) {
			// 	var move = new EnterPiece();
			// } else if (move instanceof MoveMain()) {
			// 	var move = new MoveMain();
			// } else {
			// 	var move = new Move();
			// }
			
			move.move(prevBoard, pawn, dist);
		}

		






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
	}
}

