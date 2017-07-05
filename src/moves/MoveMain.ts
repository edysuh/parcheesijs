import { cloneDeep, isEqual } from 'lodash';

import { Bop } from '../Bop';
import { Board } from '../Board';
import { Cheat } from '../Cheat';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../spaces/Space';
// import { MainSpace } from '../spaces/MainSpace';
// import { HomeRowSpace } from '../spaces/HomeRowSpace';

export interface MoveResult {
	board: Board;
	bonus: number;
}

export function isMoveResult(result: MoveResult | Cheat): result is MoveResult {
	return (<MoveResult>result).board !== undefined;
}

export class MoveMain implements Move {
  pawn: Pawn;
  start: Space;
  // start: MainSpace | HomeRowSpace;
  dist: number;

	// constructor(pawn: Pawn, start: MainSpace | HomeRowSpace, dist: number) {
	constructor(pawn: Pawn, start: Space, dist: number) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}

	move(board: Board): MoveResult | Cheat {
		let nboard = cloneDeep(board);
		let currSpace = cloneDeep(this.start);
		let bonus = 0;

		if (!isEqual(currSpace, nboard.getSpaceForPawn(this.pawn))) {
			throw new Error("pawn is not on the specified space");
		}

		for (let i = 0; i < this.dist; i++) {
			currSpace = currSpace.getNextSpace(this.pawn.color);
			if (nboard.isBlockade(currSpace)) {
				// TODO how to handle cheating / throwing errors
				// throw new Error("tried to make a move past a blockade");
				return new Cheat();
			}
		}

		// try ... catch maybeBop
		let maybeBop = nboard.setPawnOnSpace(this.pawn, currSpace);
		if (maybeBop instanceof Bop) {
			bonus = 10;
		}
		
		// might be better to have like a Board::calculateAllBlockades function
		if (board.isBlockade(this.start)) { nboard.removeBlockade(this.start); }

		return <MoveResult>{ 'board': nboard, 'bonus': bonus };
	}
}
