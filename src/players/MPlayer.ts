import { cloneDeep } from 'lodash';

import { Board } from '../Board';
import { Color, NUM_PAWNS, Pair } from '../definitions';
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
					 getPawnsInOrder: (b: Board, c: Color) => Pair[]): Move[] {
		let moves = [];
		let pairs = getPawnsInOrder(board, this.color);
		let canEnterWithSum = rolls.length == 2 && (rolls[0] + rolls[1] == 5);

		for (let i = 0; i < pairs.length; i++) {
			if (canEnterWithSum && pairs[i].space instanceof NestSpace) {
				return [new EnterPiece(pairs[i].pawn)];
			}

			for (let j = 0; j < rolls.length; j++) {
				let saveBoard = cloneDeep(board);
				let move = chooseMove(pairs[i].pawn, pairs[i].space, rolls[j]);

				try {
					let moveresult = move.move(board);
					board = moveresult.board;
					if (moveresult.bonus) {
						rolls.push(moveresult.bonus);
					}
					moves.push(move);

					canEnterWithSum = false;
					rolls.splice(j, 1);
					pairs = getPawnsInOrder(board, this.color);
					i = -1;
					break;
				} catch (e) {
					board = cloneDeep(saveBoard);
					// console.log(e);
				}
			}
			if (rolls.length == 0) { break; }
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


export function getPawnsInFirstOrder(board: Board, color: Color): Pair[] {
	let pairs = [];

	for (let i = 0; i < NUM_PAWNS; i++) {
		let pawn = new Pawn(i, color);
		let space = board.getSpaceForPawn(pawn);
		if (!(space instanceof HomeSpace)) {
			pairs.push({ 'pawn': pawn, 'space': space });
		}
	}

	pairs.sort((prev, curr) =>
		prev.space.distanceFromHome(color) - curr.space.distanceFromHome(color));
	return pairs;
}

export function getPawnsInLastOrder(board: Board, color: Color): Pair[] {
	return getPawnsInFirstOrder(board, color).reverse();
}

// precondition: only call this in try...catch block to catch illegal moves
export function chooseMove(pawn: Pawn, space: Space, roll: number): Move {
	if (space instanceof NestSpace && roll == 5) {
		return new EnterPiece(pawn);
	} else if (space.distanceFromHome(pawn.color) == roll) {
		return new MoveHome(pawn, space, roll);
	} else {
		return new MoveMain(pawn, space, roll);
	}
}
