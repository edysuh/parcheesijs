import { isEqual } from 'lodash';

import { Bop } from './Bop';
import { Color, Colors, NUM_PAWNS } from './definitions';
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

	constructor() {
		this.pawns = new Map();
		this.pawnPositions = new Map();
		this.blockades = [];

		for (let i = 0; i < Colors.length; i++) {
			for (let j = 0; j < NUM_PAWNS; j++) {
				let pawn = new Pawn(j, Colors[i]);
				this.pawns.set(pawn.key, pawn);
				this.pawnPositions.set(pawn.key, new NestSpace(Colors[i]));
			}
		}
	}

	// procondition: isBop move helper has been called ????
	setPawnOnSpace(pawn: Pawn, space: Space): Bop | null {
		let pawnsOnSpace = this.getPawnsOnSpace(space);
		if (pawnsOnSpace.length >= 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (pawnsOnSpace.length == 1) {
			if (pawn.color == pawnsOnSpace[0].color) {
				this.pawnPositions.set(pawn.key, space);
				this.setBlockade(space, pawn.color);
			} else {
				this.pawnPositions.delete(pawnsOnSpace[0].key);
				this.pawnPositions.set(pawn.key, space);
				return new Bop();
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

	removePawnOnSpace(pawn: Pawn, space: Space): void {

	}

	setBlockade(space: Space, color: Color): void {
		let pawnsOnSpace = this.getPawnsOnSpace(space);
		if (pawnsOnSpace.length != 2) { throw new Error("invalid attempt to form blockade"); }
		this.blockades.push(<Blockade>{"space": space, "color": color});
	}

	removeBlockade(space: Space): void {
		for (let i = 0; i < this.blockades.length; i++) {
			if (isEqual(space, this.blockades[i].space)) {
				this.blockades.splice(i, 1);
			}
		}
	}

	isBlockade(space: Space): boolean {
		// should loop through blockades list to match with parameter
		return (this.getPawnsOnSpace(space).length == 2);
	}
	
	// getPlayerPawnPositions(color: Color) {
	// 	let pawns = [];
	// 	for (let [pkey, pawn] of this.pawns) {
			
	// 	}
	// }
}
