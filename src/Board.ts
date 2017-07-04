import { isEqual } from 'lodash';

import { Bop } from './Bop';
import { Color, Colors, NUM_PAWNS } from './defs';
import { Space } from './spaces/Space';
import { NestSpace } from './spaces/NestSpace';
import { Pawn, pkey } from './Pawn';

export interface Blockade {
	space: Space,
	color: Color
}

export class Board {
	pawns: Map<pkey, Pawn>;
	pawnPositions: Map<pkey, Space>;
	blockades: Blockade[];
	
	// example of gorilla with the banana?
	pawnSpaces: Map<pkey, Space>;
	
	constructor() {
		// pawn keys
		this.pawns = new Map();
		this.pawnPositions = new Map();
		this.blockades = [];
		
		this.pawnSpaces = new Map();
		
		for (let i = 0; i < Colors.length; i++) {
			for (let j = 0; j < NUM_PAWNS; j++) {
				let pawn = new Pawn(j, Colors[i]);
				this.pawns.set(pawn.key, pawn);
				this.pawnPositions.set(pawn.key, new NestSpace(Colors[i]));
			}
		}
		
		for (let i = 0; i < Colors.length; i++) {
			for (let j = 0; j < NUM_PAWNS; j++) {
				let pawn = new Pawn(j, Colors[i]);
				let space = new NestSpace(Colors[i]);
				space.setPawn(pawn);
				this.pawnSpaces.set(pawn.key, space);
			}
		}
	}
	
	setPawn(pawn: Pawn, space: Space): void {
		// better to keep these independent?
		// space.setPawn(pawn);
		this.pawnSpaces.set(pawn.key, space);
	}

	setPawnOnSpace(pawn: Pawn, space: Space): Bop | null {
		let pawnsOnSpace = this.getPawnsOnSpace(space);
		if (pawnsOnSpace.length >= 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (pawnsOnSpace.length == 1) {
			if (pawn.color == pawnsOnSpace[0].color) {
				this.pawnPositions.set(pawn.key, space);
				this.setColoredBlockade(space, pawn.color);
			} else {
				this.pawnPositions.delete(pawnsOnSpace[0].key);
				this.pawnPositions.set(pawn.key, space);
				return new Bop();
				// bop?
			}
		} else {
			this.pawnPositions.set(pawn.key, space);
		}
		return null;
	}
	
	getPawnsOnSpace(space: Space): Pawn[] {
		let pawns = [];
		for (let [ppkey, ppspace] of this.pawnPositions) {
			if (isEqual(space, ppspace)) {
				pawns.push(this.pawns.get(ppkey));
			}
		}
		return pawns;
	}
	
	getSpaceForPawn(pawn: Pawn): Space {
		return this.pawnPositions.get(pawn.key);
	}
	
	removePawnOnSpace(pawn: Pawn, space: Space): void { }
	
	setColoredBlockade(space: Space, color: Color): void {
		let pawnsOnSpace = this.getPawnsOnSpace(space);
		// console.log('pawnsOnSpace', pawnsOnSpace.length);
		if (pawnsOnSpace.length != 2) { throw new Error("invalid attempt to form blockade"); }
		this.blockades.push(<Blockade>({"space": space, "color": color}));
	}
	
	removeBlockade(space: Space): void {
		for (let i = 0; i < this.blockades.length; i++) {
			if (isEqual(space, this.blockades[i].space)) {
				this.blockades.splice(i, 1);
			}
		}
	}
}
