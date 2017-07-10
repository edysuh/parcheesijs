import { isEqual } from 'lodash';

import { Bop } from './Bop';
import { Color, Colors, NUM_PAWNS } from './definitions';
import { Space } from './spaces/Space';
import { NestSpace } from './spaces/NestSpace';
import { Pawn, pid } from './Pawn';

export interface Blockade {
	space: Space,
	color: Color
}

export class Board {
	// private?
	blockades: Blockade[];
	pawnSpaces: Map<Color, Map<pid, Space>>;

	constructor() {
		this.blockades = [];
		this.pawnSpaces = new Map();

		for (let i = 0; i < Colors.length; i++) {
			let pidToSpace = new Map();
			for (let j = 0; j < NUM_PAWNS; j++) {
				pidToSpace.set(j, new NestSpace(Colors[i]));
			}
			this.pawnSpaces.set(Colors[i], pidToSpace);
		}
	}

	// procondition: isBop move helper has already been called
	// space.setPawn(pawn) is now uncoupled from this method due to issues with equality
	setPawnOnSpace(pawn: Pawn, space: Space): void {
		// space.setPawn(pawn);
		this.pawnSpaces.get(pawn.color).set(pawn.id, space);
		if (this.getPawnsOnSpace(space).length == 2) {
			this.setBlockade(pawn.color, space);
		}
	}

	getPawnsOnSpace(space: Space): Pawn[] {
		let pawns = [];
		for (let [color, pidToSpace] of this.pawnSpaces) {
			for (let [pid, pspace] of pidToSpace) {
				if (isEqual(space, pspace)) {
					pawns.push(new Pawn(pid, color));
				}
			}
		}
		return pawns;
	}

	getSpaceForPawn(pawn: Pawn): Space {
		return this.pawnSpaces.get(pawn.color).get(pawn.id);
	}

	setBlockade(color: Color, space: Space): void {
		let pawnsOnSpace = this.getPawnsOnSpace(space);
		if (pawnsOnSpace.length != 2) { throw new Error("invalid attempt to form blockade"); }
		this.blockades.push(<Blockade>{ "color": color, "space": space });
	}

	removeBlockade(space: Space): void {
		for (let i = 0; i < this.blockades.length; i++) {
			if (isEqual(space, this.blockades[i].space)) {
				this.blockades.splice(i, 1);
			}
		}
	}

	isBlockade(space: Space): boolean {
		for (let i = 0; i < this.blockades.length; i++) {
			if (isEqual(space, this.blockades[i].space)) {
				return true;
			}
		}
		return false;
	}
}
