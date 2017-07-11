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
	private _spaces: Space[];
	blockades: Blockade[];

	constructor() {
		this._spaces = [];
		this.blockades = [];

		for (let i = 0; i < Colors.length; i++) {
			let nest = new NestSpace(Colors[i]);
			this._spaces.push(nest);
			for (let j = 0; j < NUM_PAWNS; j++) {
				nest.setPawn(new Pawn(j, Colors[i]));
			}
		}
	}

	setPawnOnSpace(pawn: Pawn, space: Space): void {
		let setSpace = this._spaces.filter(sp => space.equals(sp))[0];

		if (!setSpace) {
			setSpace = space;
			this._spaces.push(setSpace);
		}

		this.getSpaceForPawn(pawn).removePawn(pawn);
		setSpace.setPawn(pawn);

		if (setSpace.pawns.length == 2) {
			this.setBlockade(pawn.color, setSpace);
		}
	}

	// getPawnsOnSpace(space: Space): Pawn[] {
	// 	let sp = this._spaces.filter(sp => { space.equals(sp) })[0];
	// 	if (!sp) { throw new Error('given space has no pawns'); }
	// 	return sp.pawns;
	// }

	getSpaceForPawn(pawn: Pawn): Space {
		for (let i = 0; i < this._spaces.length; i++) {
			for (let j = 0; j < this._spaces[i].pawns.length; j++) {
				if (isEqual(pawn, this._spaces[i].pawns[j])) {
					return this._spaces[i];
				}
			}
		}
		throw new Error("given pawn is not on a space");
	}

	setBlockade(color: Color, space: Space): void {
		// let pawnsOnSpace = this.getPawnsOnSpace(space);
		// console.log('setBlockade: pawnsOnSpace', pawnsOnSpace);
		if (space.pawns.length != 2) { throw new Error("invalid attempt to form blockade"); }
		this.blockades.push(<Blockade>{ "color": color, "space": space });
	}

	removeBlockade(space: Space): void {
		for (let i = 0; i < this.blockades.length; i++) {
			if (space.equals(this.blockades[i].space)) {
				this.blockades.splice(i, 1);
			}
		}
	}

	isBlockade(space: Space): boolean {
		for (let i = 0; i < this.blockades.length; i++) {
			if (space.equals(this.blockades[i].space)) {
				return true;
			}
		}
		return false;
	}
}
