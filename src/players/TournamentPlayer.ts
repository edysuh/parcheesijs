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

interface MoveRemRolls {
	move: Move;
	rolls: number[];
}

interface legalResult {
	board: Board;
	move: Move;
	rolls: number[];
}

interface MoveList {
	board: Board;
	moves: Move[];
}

export class TournamentPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		return;
	}
}

export function buildMoveLists(board: Board, 
															 rolls: number[],
															 color: Color,
															 movelists: MoveList[]): MoveList[] {
	
	console.log('movelists', rolls, movelists);
	if (!rolls) {
		return movelists;
	}

	let initMoves = getPossibleMovesList(rolls, board.getPlayerPawns(color));
	let legal = tryMoves(board, initMoves, color);

	for (let i = 0; i < legal.length; i++) {
		let ml = buildMoveLists(legal[i].board, legal[i].rolls, color, movelists);
		console.log('ml', ml);
		movelists.push(...ml);
	}

	return movelists;
}

// pass through the move list, and arrive at a final board state at the end of recursion
// move list should be an array of arrays that hold that branch of moves/board state
export function tryMoves(board: Board,
												 possibleMoves: MoveRemRolls[],
												 color: Color): legalResult[] {
	let legalMoves = [];

	for (let i = 0; i < possibleMoves.length; i++) {
		try {
			let moveresult = possibleMoves[i].move.move(board);
			// need to pass around the original board (or one level up)
			checkBlockadeMoves(board, moveresult.board, color);

			// let nextRolls = [...possibleMoves[i].rolls];
			let nextRolls = possibleMoves[i].rolls;
			if (moveresult.bonus) {
				nextRolls.push(moveresult.bonus);
			}

			legalMoves.push({ 
				board: moveresult.board,
				move: possibleMoves[i].move,
				rolls: nextRolls
			});
		} catch (e) { }
	}

	return legalMoves;
}

export function getPossibleMovesList(rolls: number[], pairs: Pair[]): MoveRemRolls[] {
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


// export function buildMoveLists(board: Board, 
// 															 rolls: number[],
// 															 color: Color,
// 															 moves: Move[]): MoveList {
// 	if (!rolls) {
// 		return { board, moves };
// 	}

// 	let initMoves = getPossibleMovesList(rolls, board.getPlayerPawns(color));
// 	let legal = tryMoves(board, initMoves, color);

// 	for (let i = 0; i < legal.length; i++) {
// 		// buildMoveLists(legal[i].board, legal[i].rolls, color);

// 		moves.push([legal[i]]);

// 		let next = getPossibleMovesList(legal[i].rolls, legal[i].board.getPlayerPawns(color));
// 		let nextLegal = tryMoves(legal[i].board, next, color);

// 		moves[i].push();
// 	}

// 	return;
// }

