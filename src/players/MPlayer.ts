import { Board } from '../Board';
import { Color, NUM_PAWNS } from '../definitions';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { Pawn } from '../Pawn';
import { Player } from '../players/Player';
import { cloneDeep } from 'lodash';
import { Space } from '../spaces/Space';
import { HomeSpace } from '../spaces/HomeSpace';

export abstract class MPlayer extends Player { }

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

function tryPawns(board: Board,
									rolls: number[],
									color: Color,
									callback: (b: Board, c: Color) =>
														 { 'pawn': Pawn, 'space': Space }[]): Move[] {
	let moves = [];
	let currBoard = cloneDeep(board);
	let pairs = callback(currBoard, color);

	for (let i = 0; i < rolls.length; i++) {
		for (let j = 0; j < pairs.length; j++) {
			// add enterpiece and movehome
			let saveBoard = cloneDeep(currBoard);
			let mm = new MoveMain(pairs[j].pawn, pairs[j].space, rolls[i]);
			try {
				let moveresult = mm.move(currBoard);
				currBoard = moveresult.board;
				// bonus?
				moves.push(mm);
				pairs = callback(currBoard, color);
				// start again from pairs[0]?
				break;
			} catch (e) {
				currBoard = cloneDeep(saveBoard);
				// console.log(e);
			}
			// no moves are possible?
		}
	}
	// pairs.map(p => console.log(p.space, p.space.distanceFromHome(color)));
	return moves;
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

function getPawnsInLastOrder(board: Board, color: Color) {
	return getPawnsInFirstOrder(board, color).reverse();
}
