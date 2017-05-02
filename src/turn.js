import { Die } from "./die";
import { Move } from "./move";
import { MoveMain } from "./moveMain";
import { EnterPiece } from "./enterPiece";

export class Turn {
	takeTurn(board, player) {
		let saveBoard = board;
		let doubleCounter = 0;
		let miniTurn = 1;
		
		// continue giving a player moves when rolls doubles, unless he rolls 3 in a row
		while (miniTurn > 0) {
			miniTurn--;
			
			let d1 = new Die();
			let d2 = new Die();
			let r1 = d1.roll();
			let r2 = d2.roll();
			
			let rolls = [];
			let rollsHash = new Array(7).fill(0, 1, 7);
			let playerMoves = [];
			
			// if player rolls doubles, give him 4 mini-moves and another pair of rolls
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
			// else just give him his pair of rolls and execute his turn
			} else {
				rolls = [r1, r2];
				playerMoves = player.doMove(board, rolls);
			}
			
			// hash the rolls
			rolls.forEach(el => { rollsHash[el]++; });

			var t = [{s: 55, d: 3}, {s: 55, d: 4}, {s: 58, d: 4}, {s: 59, d: 3}];
			// check for illegal blockade moves as pairs
			var startDist = playerMoves.map(move => { return { 's': move.start, 'd': move.dist }; });
			var duplMove = {};
			startDist.forEach(move => {
				if (duplMove[move.s]) {
					if (duplMove[move.s] == move.d) {
						return "Error: blockade attempted to move as a pair";
					}
					// if there are two moves from the same starting whose sum result in the same dest blockade
				} else {
					duplMove[move.s] = move.d;
				}
			});
			
			// while the player has moves left, check for validity of the move, and then execute
			while (playerMoves.length > 0) {
				let currMove = playerMoves.shift();
				var moveObj;
				var bonus;

				// check MoveMain consumes the proper roll, and that the move is allowed
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

				// check EnterPiece is properly using a 5 roll
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
				
				// if a bonus was returned from a move, give the player a bonus move
				if (bonus) {
					var bonusMove = player.doMove(board, bonus);
					playerMoves.push(bonusMove);
				}
			}
		}
		
		return board;
	}
}
