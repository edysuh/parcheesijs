import { Board } from "./board";
import { Space } from "./space";
import { Pawn } from "./pawn";
import { Die } from "./die";
import { Move } from "./move";
import { MoveMain } from "./moveMain";
import { EnterPiece } from "./enterPiece";

// given a board, a pair (array) of dice rolls (already rolled), and an array of moves,
// return either an updated board, or an error
export function rulesChecker(board, rolls, moves) {
	let saveBoard = board;

	while (moves.length > 0) {
		let currMove = moves.shift();

		// cannot make move, due to either pawn not found, blockade, or safety-bop-attempt failure
		if (currMove instanceof MoveMain) {
			board = currMove.move(board);

			if (!board) {
				return "Error: cannot make move";
			}
		}

		// checking for a 5 roll to enter piece
		if (currMove instanceof EnterPiece) {
			if (rolls[0] + rolls[1] === 5 || rolls[0] === 5 || rolls[1] === 5) {
				board = currMove.move(board);
			}

			if (!board) {
				return "Error: didnt roll a 5";
			}
		}
	}
	
	return board;
}
