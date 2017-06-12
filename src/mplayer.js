import { Player } from './player';
import { MoveMain } from './moveMain';
import cloneDeep from "lodash/cloneDeep";

export class MPlayer extends Player {
	constructor(color) {
		super(color);
	}
	
	// mplayer implementation of abstract doMove
	// given a board and rolls, returns and Move array
	doMove(board, rolls) {
		let moves = [];
		
		rolls.forEach(roll => {
			// console.log('roll', roll);
			// let move = this.moveFirstPawn(board, roll);
			let move = this.moveLastPawn(board, roll);
			// console.log('movemove', move);
			
			if (move) {
				moves.push(move);
			}
		});
		
		return moves;
	}
	
	moveFirstPawn(board, roll) {
		let pawnsByFar = this.pawns.sort((curr, prev) => {
			return curr.distRemaining - prev.distRemaining;
		});
		// console.log('pawnsByFar', pawnsByFar);
		return this.tryAllPawns(board, roll, pawnsByFar);
	}

	moveLastPawn(board, roll) {
		let pawnsByClose = this.pawns.sort((curr, prev) => {
			return prev.distRemaining - curr.distRemaining;
		});
		// console.log('pawnsByClose', pawnsByClose);
		return this.tryAllPawns(board, roll, pawnsByClose);
	}
	
	tryAllPawns(board, roll, pawnList) {
		let thisPawns = cloneDeep(pawnList);
		for (let i = 0; i < thisPawns.length; i++) {
			// let thisBoard = cloneDeep(board);
			let pawnSpace = thisBoard.findPawnLocation(thisPawns[i]);
			// console.log('pawnSpace', pawnSpace);
			
			// // is in Start
			// if (!pawnSpace) {
			// 	continue;
			// }
			
			let mm = new MoveMain(thisPawns[i], pawnSpace, roll);
			// console.log('mm', mm);
			let { board: newBoard, bonus: _ } = mm.move(thisBoard);
			// console.log('newBoard', newBoard);
			
			if (newBoard) {
				return new MoveMain(pawnList[i], pawnSpace, roll);
			} 
		}
		return null;
	}
}
