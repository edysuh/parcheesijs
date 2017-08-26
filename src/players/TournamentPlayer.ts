import { cloneDeep } from 'lodash';

import { MPlayer, getPawnsInLastOrder, chooseMove } from './MPlayer';
import { Board } from '../Board';
import { Color, Pair, MoveResult } from '../definitions';
import { Space } from '../spaces/Space';
import { NestSpace } from '../spaces/NestSpace';
import { MainSpace } from '../spaces/MainSpace';
import { HomeRowSpace } from '../spaces/HomeRowSpace';
import { HomeSpace } from '../spaces/HomeSpace';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { MoveHome } from '../moves/MoveHome';
import { EnterPiece } from '../moves/EnterPiece';
import { checkBlockadeMoves } from '../Turn';

interface MoveRollsPair {
	move: Move;
	rolls: number[];
}

export class TournamentPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		let initialMoves = getPossibleMovesList(rolls, board.getPlayerPawns(this.color));

		return;
	}
}

export function tryMoves(board: Board, possibleMoves: MoveRollsPair[]): Move[] {
	for (let i = 0; i < possibleMoves.length; i++) {
		try {
			let currMove = possibleMoves[i];
			let moveresult = currMove.move.move(board);
			// checkBlockadeMoves(saveBoard, moveresult.board, color);

			let newRolls = currMove.rolls;
			if (moveresult.bonus) {
				newRolls.push(moveresult.bonus);
			}

			let tryAgain = getPossibleMovesList(newRolls,
																					moveresult.board.getPlayerPawns(this.color));
		} catch (e) { }
	}
	return;
}


export function getPossibleMovesList(rolls: number[], pairs: Pair[]): MoveRollsPair[] {
	let list = [];

	for (let i = 0; i < pairs.length; i++) {
		if (pairs[i].space instanceof NestSpace &&
				rolls.length == 2 && (rolls[0] + rolls[1] == 5)) {
			list.push({ move: new EnterPiece(pairs[i].pawn), rolls: [] });
			continue;
		}

		for (let j = 0; j < rolls.length; j++) {
			let move = chooseMove(pairs[i], rolls[j]);
			if (move) {
				let remRolls = [...rolls];
				remRolls.splice(j, 1);
				list.push({ move: move, rolls: remRolls });
			}
		}
	}

	return list;
}

function tryPawns(board: Board,
									rolls: number[],
									color: Color,
									getPawnsInOrder: (b: Board, c: Color) => Pair[]): Move[] {
	let saveBoard = cloneDeep(board);
	let moves = [];
	let pairs = getPawnsInOrder(board, color);
	let canEnterWithSum = rolls.length == 2 && (rolls[0] + rolls[1] == 5);

	for (let i = 0; i < pairs.length; i++) {
		let saveRolls = cloneDeep(rolls);
		let enter = false;
		if (canEnterWithSum && pairs[i].space instanceof NestSpace) {
			enter = true;
			rolls = [5];
		}

		for (let j = 0; j < rolls.length; j++) {
			let move = enter ? new EnterPiece(pairs[i].pawn) : chooseMove(pairs[i], rolls[j]);

			try {
				let moveresult = move.move(board);
				checkBlockadeMoves(saveBoard, moveresult.board, color);

				// no errors: accept the move; change the board and take any bonuses
				board = moveresult.board;
				if (moveresult.bonus) {
					rolls.push(moveresult.bonus);
				}
				moves.push(move);

				// consume a roll and reset the outer loop to iterate through the new board
				canEnterWithSum = false;
				rolls.splice(j, 1);
				pairs = getPawnsInOrder(board, color);
				i = -1;
				break;
			} catch (e) {
				// console.log('e', e);
			}
		}

		// tried an enter piece with a sum, but no available moves: reset rolls
		if (enter && !(moves[0] instanceof EnterPiece)) {
			rolls = saveRolls;
		}
		if (rolls.length == 0) { break; }
	}

	return moves;
}


// pass around the list of possible moves with their corresponding pairs,
//		return rolls remaining
//		can now handle enter piece at a higher level

// export function getEnterMoveWithSum(board: Board, rolls: number[], color: Color): EnterPiece {
// 	if (rolls.length == 2 && (rolls[0] + rolls[1] == 5)) {
// 		let pairsInStart = board.getPlayerPawns(color)
// 												 .filter(pair => (pair.space instanceof EnterPiece));
// 		if (pairsInStart) {
// 			let ep = new EnterPiece(pairsInStart.pop().pawn);
// 			try {
// 				ep.move(board);
// 				return ep;
// 			} catch (e) { }
// 		}
// 	}
// 	// return remaining rolls too?
// }

