import { cloneDeep, isEqual } from 'lodash';

import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../spaces/Space';

export class MoveMain implements Move {
  pawn: Pawn;
  start: Space;
  dist: number;
  
	constructor(pawn: Pawn, start: Space, dist: number) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}
	
	// immutability would be interesting across the system
	move(board: Board): { 'board': Board, 'bonus': number } {
		let nboard = cloneDeep(board);
		let currSpace = this.start;
		
		if (!isEqual(currSpace, nboard.getSpaceForPawn(this.pawn))) {
			throw new Error("pawn is not on the specified space");
		}
		
		for (let i = 0; i < this.dist; i++) {
			try {
				let next = currSpace.getNextSpace(this.pawn.color);
				// will accidentally bop all pawns on the way
				let bopP = nboard.setPawnOnSpace(this.pawn, next);
			} catch (e) {
				// return new Cheat();
				throw e;
			}
		}

		return { 'board': new Board(), 'bonus': 0 };
	}
}
