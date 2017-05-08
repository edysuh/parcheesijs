import { Player } from './player';
import { MoveMain } from './moveMain';

export class MPlayer extends Player {
	constructor(color) {
		super(color);
	}
	
	// mplayer implementation of abstract doMove
	// given a board and rolls, returns and Move array
	doMove(board, rolls) {
		let moves = [];
		
		rolls.forEach(roll => {
			console.log('roll', roll);
			let move = this.moveFirstPawn(board, roll);
			console.log('move', move);
			
			if (move) {
				moves.push(move);
			}
		});
		return moves;
	}
	
	// This player tries to move the frontmost pawn with each die roll. If the frontmost pawn cannot move, this player considers the one behind it, etc.
	// return a move that executes moving the first pawn
	moveFirstPawn(board, roll) {
		let pawnsByFar = this.pawns.sort((curr, prev) => {
			return curr.distRemaining - prev.distRemaining;
		});
		
		for (let i = 0; i < pawnsByFar.length; i++) {
			let pawnSpace = board.findPawnLocation(pawnsByFar[i]);
			
			if (!pawnSpace) {
				continue;
			}
			
			let mm = new MoveMain(pawnsByFar[i], pawnSpace, roll);
			console.log('mm', mm);
			let { newBoard, _ } = mm.move(board);
			
			if (newBoard) {
				return mm;
			} 
		}
		return null;
	}

	// This player tries to move the rearmost pawn with each die roll. If the rearmost pawn cannot move, this player considers the one in front of it, etc. (Note that once the rearmost pawn moves, it may no longer be the rearmost pawn.)
	// return a move that executes moving the last pawn
	moveLastPawn(board) {
		let pawnsByClose = this.pawns.sort((curr, prev) => {
			return prev.distRemaining - curr.distRemaining;
		});
		
		for (let i = 0; i < pawnsByFar.length; i++) {
			let pawnSpace = board.findPawnLocation(pawnsByClose[i]);
			
			if (!pawnSpace) {
				continue;
			}
			
			let mm = new MoveMain(pawnsByFar[i], pawnSpace, roll);
			let { newBoard, _ } = mm.move(board);
			
			if (newBoard) {
				return mm;
			} 
		}
		return null;
	}
}
