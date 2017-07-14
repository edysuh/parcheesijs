import { cloneDeep } from 'lodash';

import { Board } from '../Board';
import { Color, NUM_PAWNS } from '../definitions';
import { Pawn } from '../Pawn';
import { Player } from '../players/Player';
import { Space } from '../spaces/Space';
import { HomeSpace } from '../spaces/HomeSpace';
import { NestSpace } from '../spaces/NestSpace';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { MoveHome } from '../moves/MoveHome';
import { EnterPiece } from '../moves/EnterPiece';

export abstract class MPlayer extends Player {
	tryPawns(board: Board,
										rolls: number[],
										callback: (b: Board, c: Color) =>
															 { 'pawn': Pawn, 'space': Space }[]): Move[] {
		let moves = [];
		let currBoard = cloneDeep(board);
		let pairs = callback(currBoard, this.color);

		for (let i = 0; i < rolls.length; i++) {
			for (let j = 0; j < pairs.length; j++) {
				let saveBoard = cloneDeep(currBoard);
				let move = chooseMove(pairs[j].pawn, pairs[j].space, rolls[i]);
				try {
					let moveresult = move.move(currBoard);
					currBoard = moveresult.board;
					// bonus?
					moves.push(move);
					pairs = callback(currBoard, this.color);
					break;
				} catch (e) {
					currBoard = cloneDeep(saveBoard);
					// console.log(e);
				}
				// no moves are possible?
			}
		}
		return moves;
	}
}

export class MFirstPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		return this.tryPawns(board, rolls, getPawnsInFirstOrder);
	}
}

export class MLastPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		return this.tryPawns(board, rolls, getPawnsInLastOrder);
	}
}


export function getPawnsInFirstOrder(board: Board, color: Color) {
	let pawnSpacePairs = [];

	for (let i = 0; i < NUM_PAWNS; i++) {
		let pawn = new Pawn(i, color);
		let space = board.getSpaceForPawn(pawn);
		if (!(space instanceof HomeSpace)) {
			pawnSpacePairs.push({ 'pawn': pawn, 'space': space });
		}
	}

	pawnSpacePairs.sort((prev, curr) =>
		prev.space.distanceFromHome(color) - curr.space.distanceFromHome(color));
	return pawnSpacePairs;
}

export function getPawnsInLastOrder(board: Board, color: Color) {
	return getPawnsInFirstOrder(board, color).reverse();
}

export function chooseMove(pawn: Pawn, space: Space, roll: number): Move {
	if (space instanceof NestSpace) {
		return new EnterPiece(pawn);
	} else if (space.distanceFromHome(pawn.color) == roll) {
		return new MoveHome(pawn, space, roll);
	// } else if (space.distanceFromHome(pawn.color) < roll) {
	// 	return null;
	} else {
		return new MoveMain(pawn, space, roll);
	}
}
