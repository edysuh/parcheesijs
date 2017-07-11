import { isEqual } from 'lodash';

import { Bop } from './Bop';
import { Color, Colors, NUM_PAWNS } from './definitions';
import { Space } from './spaces/Space';
import { NestSpace } from './spaces/NestSpace';
import { Pawn, pid } from './Pawn';

export class Board {
	private _spaces: Space[];

	constructor() {
		this._spaces = [];

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
	}

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
	
	isBop(pawn: Pawn, space: Space): boolean {
		let ret = this._spaces.filter(sp => space.equals(sp))[0];
		if (ret) { return ret.isBop(pawn); }
		return false;
	}
	
	isBlockade(space: Space): boolean {
		let ret = this._spaces.filter(sp => space.equals(sp))[0];
		if (ret) { return ret.isBlockade(); }
		return false;
	}
}
