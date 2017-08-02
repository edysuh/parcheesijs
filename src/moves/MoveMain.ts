import { cloneDeep } from 'lodash';

import { Board } from '../Board';
import { MoveResult } from '../definitions';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../spaces/Space';
import { MainSpace } from '../spaces/MainSpace';
import { HomeSpace } from '../spaces/HomeSpace';

export class MoveMain implements Move {
  readonly pawn: Pawn;
  readonly start: Space;
  readonly dist: number;

	constructor(pawn: Pawn, start: Space, dist: number) {
		this.pawn = pawn;
		this.start = start;
		this.dist = dist;
	}

	move(board: Board): MoveResult {
		let newBoard = cloneDeep(board);
		let currSpace = this.start;
		let bonus = 0;

		if (!(currSpace instanceof MainSpace)) {
			throw new Error("MoveMain cannot move pawns not on the main ring");
		}

		if (!currSpace.equals(newBoard.getSpaceForPawn(this.pawn))) {
			throw new Error("specified pawn is not on the specified space");
		}

		for (let i = 0; i < this.dist; i++) {
			currSpace = currSpace.getNextSpace(this.pawn.color);
			if (newBoard.isBlockade(currSpace)) {
				throw new Error("tried to make a move past a blockade");
			}
		}

		if (newBoard.isBop(this.pawn, currSpace)) {
			bonus = 20;
		}

		if (currSpace instanceof HomeSpace) {
			bonus = 10;
		}

		newBoard.setPawnOnSpace(this.pawn, currSpace);

		return { 'board': newBoard, 'bonus': bonus };
	}
}
