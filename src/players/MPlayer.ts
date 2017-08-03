import { cloneDeep } from 'lodash';

import { Board } from '../Board';
import { Color, NUM_PAWNS, Pair } from '../definitions';
import { Pawn } from '../Pawn';
import { Player } from '../players/Player';
import { Space } from '../spaces/Space';
import { NestSpace } from '../spaces/NestSpace';
import { MainSpace } from '../spaces/MainSpace';
import { HomeRowSpace } from '../spaces/HomeRowSpace';
import { HomeSpace } from '../spaces/HomeSpace';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { MoveHome } from '../moves/MoveHome';
import { EnterPiece } from '../moves/EnterPiece';

export abstract class MPlayer extends Player {

}

export class MFirstPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		return tryPawns(board, rolls, this.color, getPawnsInFirstOrder);
	}
}

export class MLastPlayer extends MPlayer {
	doMove(board: Board, rolls: number[]): Move[] {
		return tryPawns(board, rolls, this.color, getPawnsInLastOrder);
	}
}


// helpers 

export function	tryPawns(board: Board,
												 rolls: number[],
												 color: Color,
												 getPawnsInOrder: (b: Board, c: Color) => Pair[]): Move[] {
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
			// TODO: this will be necessary later to prevent blockades moving together
			// let saveBoard = cloneDeep(board);
			let move = enter ? new EnterPiece(pairs[i].pawn) : chooseMove(pairs[i], rolls[j]);

			try {
				let moveresult = move.move(board);
				board = moveresult.board;
				if (moveresult.bonus) {
					rolls.push(moveresult.bonus);
				}
				moves.push(move);

				canEnterWithSum = false;
				rolls.splice(j, 1);
				pairs = getPawnsInOrder(board, color);
				i = -1;
				break;
			} catch (e) {
				// board = cloneDeep(saveBoard);
			}
		}

		if (enter && !(moves[0] instanceof EnterPiece)) {
			rolls = saveRolls;
		}
		if (rolls.length == 0) { break; }
	}

	return moves;
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
export function chooseMove(pair: Pair, roll: number): Move {
	if (pair.space instanceof NestSpace && roll == 5) {
		return new EnterPiece(pair.pawn);
	} else if (pair.space instanceof MainSpace) {
		return new MoveMain(pair.pawn, pair.space, roll);
	} else if (pair.space instanceof HomeRowSpace) {
		return new MoveHome(pair.pawn, pair.space, roll);
	}
}
