import { Board } from '../Board';
import { Color, NUM_PAWNS } from '../definitions';
import { Die } from '../Die';
import { Player } from '../players/Player';
import { Move } from '../moves/Move';
import { MoveMain } from '../moves/MoveMain';
import { MainSpace } from '../spaces/MainSpace';
import { NestSpace } from '../spaces/NestSpace';
import { cloneDeep } from 'lodash';

import { Pawn } from '../Pawn';

export abstract class MPlayer extends Player {
	doMove(board: Board, rolls: number[]): Move[] {
		let moves = [];
		let currBoard = cloneDeep(board);
		let pairs = getPawnsInFirstOrder(currBoard, this.color);
		
		for (let i = 0; i < rolls.length; i++) {
			for (let j = 0; j < pairs.length; j++) {
				let mm = new MoveMain(pairs[j].pawn, pairs[j].space, rolls[i]);
				try {
					let ret = mm.move(currBoard);
					currBoard = ret.board;
					// bonus?
					moves.push(mm);
					pairs = getPawnsInFirstOrder(currBoard, this.color);
					break;
				} catch (e) {
					currBoard = cloneDeep(board);
					console.log(e);
				}
			}
		}
		for (let i = 0; i < currBoard.spaces.length; i++) {
			console.log(currBoard.spaces[i]);
		}
		return moves;
	}
}

export class MFirstPlayer extends MPlayer { }

export class MLastPlayer extends MPlayer { }

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
