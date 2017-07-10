import { cloneDeep, isEqual } from 'lodash';

import { Bop } from '../Bop';
import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../spaces/Space';

export class MoveMain implements Move {
  readonly pawn: Pawn;
  readonly start: Space;
  readonly dist: number;

	constructor(pawn: Pawn, start: Space, dist: number) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}

	move(board: Board): { 'board': Board, 'bonus': number } {
		let nboard = cloneDeep(board);
		let currSpace = cloneDeep(this.start);
		let bonus = 0;

		if (!isEqual(currSpace, nboard.getSpaceForPawn(this.pawn))) {
			throw new Error("specified pawn is not on the specified space");
		}

		for (let i = 0; i < this.dist; i++) {
			currSpace = currSpace.getNextSpace(this.pawn.color);
			if (nboard.isBlockade(currSpace)) {
				throw new Error("tried to make a move past a blockade");
			}
		}

		// this currSpace is a new space, not one on the board
		currSpace.setPawn(this.pawn);
		nboard.setPawnOnSpace(this.pawn, currSpace);
		
		if (currSpace.isBop(this.pawn)) {
			bonus = 10;
		}

		// might be better to have like a Board::calculateAllBlockades function
		if (board.isBlockade(this.start)) { nboard.removeBlockade(this.start); }

		return { 'board': nboard, 'bonus': bonus };
	}
}
