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
	rem: number[];
}

interface legalResult {
	board: Board;
	move: Move;
	rem: number[];
}

interface MoveList {
	board: Board;
	moves: Move[];
}

export class TournamentPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		let movelists = buildMoveLists({ board: board, moves: []}, rolls, this.color, []);

		for (let i = 0; i < movelists.length; i++) {
			if (rolls.length == 2 && rolls[0] + rolls[1] == 5) {
				if (movelists[i].moves[0] instanceof EnterPiece) {
					console.log('\n -----> movelists[i].moves', movelists[i].moves);
					return movelists[i].moves;
				}
			}
			if (movelists[i].moves.length == rolls.length) {
				console.log('\n -----> movelists[i].moves', movelists[i].moves);
				return movelists[i].moves;
			}
		}

		return [];
	}
}

export function buildMoveLists(currlist: MoveList,
															 rolls: number[],
															 color: Color,
															 movelists: MoveList[]): MoveList[] {
	let initMoves = getPossibleMovesList(rolls, currlist.board.getPlayerPawns(color));
	let legal = tryMoves(currlist.board, initMoves, color);

	for (let i = 0; i < legal.length; i++) {
		let nextmoves = [...currlist.moves];
		nextmoves.push(legal[i].move);
		let nextlist = { board: legal[i].board, moves: nextmoves };

		if (legal[i].rem.length == 0) {
			movelists.push(nextlist);
		}

		buildMoveLists(nextlist, legal[i].rem, color, movelists);
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

			// let nextRolls = [...possibleMoves[i].rem];
			let nextRolls = possibleMoves[i].rem;
			if (moveresult.bonus) {
				nextRolls.push(moveresult.bonus);
			}

			legalMoves.push({
				board: moveresult.board,
				move: possibleMoves[i].move,
				rem: nextRolls
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
			list.push({ move: new EnterPiece(pairs[i].pawn), rem: [] });
			continue;
		}

		for (let j = 0; j < rolls.length; j++) {
			let move = chooseMove(pairs[i], rolls[j]);
			if (move) {
				let remRolls = [...rolls];
				remRolls.splice(j, 1);
				list.push({ move: move, rem: remRolls });
			}
		}
	}

	return list;
}

// export function buildMoveLists(board: Board,
// 															 rolls: number[],
// 															 color: Color,
// 															 movelists: MoveList[]): MoveList[] {

// 	console.log('movelists', rolls, movelists);
// 	if (!rolls) {
// 		return movelists;
// 	}

// 	let initMoves = getPossibleMovesList(rolls, board.getPlayerPawns(color));
// 	let legal = tryMoves(board, initMoves, color);

// 	for (let i = 0; i < legal.length; i++) {
// 		let ml = buildMoveLists(legal[i].board, legal[i].rolls, color, movelists);
// 	}

// 	return movelists;
// }

