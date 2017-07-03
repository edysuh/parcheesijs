import { Color, NUM_COLORS, NUM_PAWNS } from './defs';
import { Space, NestSpace, MainSpace, HomeRowSpace, HomeSpace } from './Space';
import { Pawn } from './Pawn';
import { isEqual } from 'lodash';

export interface Blockade {
	space: Space,
	color: Color
}

export class Board {
	pawns: Pawn[];
	pawnPositions: Map<string, Space>;
	blockades: Blockade[];
	
	constructor() {
		// pawn keys
		this.pawns = [];
		this.pawnPositions = new Map();
		this.blockades = [];
		
		let colors = [Color.blue, Color.yellow, Color.green, Color.red];
		
		for (let i = 0; i < colors.length; i++) {
			for (let j = 0; j < NUM_PAWNS; j++) {
				let pawn = new Pawn(j, colors[i]);
				this.pawns.push(pawn);
				this.pawnPositions.set(pawn.key, new NestSpace());
			}
		}
	}

	setPawnOnSpace(pawn: Pawn, space: Space): void {
		let count = this.countPawnsOnSpace(space);
		if (count >= 2) {
			throw new Error("invalid attempt to set pawn on space with two existing pawns");
		} else if (count == 1) {
			this.pawnPositions.set(pawn.key, space);
			this.setColoredBlockade(space, pawn.color);
		} else {
			this.pawnPositions.set(pawn.key, space);
		}
	}
	
	getSpaceForPawn(pawn: Pawn): Space {
		return this.pawnPositions.get(pawn.key);
	}
	
	removePawnOnSpace(pawn: Pawn, space: Space): void { }
	
	setColoredBlockade(space: Space, color: Color): void {
		let count = this.countPawnsOnSpace(space);
		if (count != 2) { throw new Error("invalid attempt to set blockade"); }
		this.blockades.push(<Blockade>({"space": space, "color": color}));
	}
	
	removeBlockade(space: Space): void {
		for (let i = 0; i < this.blockades.length; i++) {
			if (isEqual(this.blockades[i].space, space)) {
				this.blockades.splice(i, 1);
			}
		}
	}
	
	countPawnsOnSpace(space: Space): number {
		let count = 0;
		for (let [_, pspace] of this.pawnPositions) {
			if (isEqual(space, pspace)) { count++; }
		}
		return count;
	}
}
