import { Board } from '../Board';
import { Color, NUM_PAWNS } from '../definitions';
import { Die } from '../Die';
import { Player } from '../players/Player';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { Space } from '../spaces/Space';
import { MainSpace } from '../spaces/MainSpace';
import { NestSpace } from '../spaces/NestSpace';
import { cloneDeep } from 'lodash';

import { Pawn } from '../Pawn';

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
			let mm = new MoveMain(pairs[j].pawn, pairs[j].space, rolls[i]);
			try {
				let ret = mm.move(currBoard);
				currBoard = ret.board;
				// bonus?
				moves.push(mm);
				pairs = callback(currBoard, color);
				break;
			} catch (e) {
				currBoard = cloneDeep(board);
				// cloneDeep should be the last board, not the original
				// console.log(e);
			}
		}
	}
	// pairs.map(p => console.log(p.space, p.space.distanceFromHome(color)));
	return moves;
}

export function getPawnsInFirstOrder(board: Board, color: Color) {
	let pawnSpacePairs = [];
	
	for (let i = 0; i < NUM_PAWNS; i++) {
		let pawn = new Pawn(i, color);
		pawnSpacePairs.push({ 'pawn': pawn, 'space': board.getSpaceForPawn(pawn) });
	}
	
	pawnSpacePairs.sort((prev, curr) => 
		prev.space.distanceFromHome(color) - curr.space.distanceFromHome(color));
	return pawnSpacePairs;
}

function getPawnsInLastOrder(board: Board, color: Color) {
	return getPawnsInFirstOrder(board, color).reverse();
}
