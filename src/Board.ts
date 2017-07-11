import { isEqual } from 'lodash';

import { Bop } from './Bop';
import { Color, Colors, NUM_PAWNS } from './definitions';
import { Space } from './spaces/Space';
import { NestSpace } from './spaces/NestSpace';
import { HomeSpace } from './spaces/HomeSpace';
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
	
	get spaces() {
		return this._spaces;
	}

	setPawnOnSpace(pawn: Pawn, space: Space): void {
		let setSpace = this._spaces.filter(sp => space.equals(sp))[0];
		if (!setSpace) {
			setSpace = space;
			this._spaces.push(setSpace);
		}
		this.removePawn(pawn);
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
	
	removePawn(pawn: Pawn): void {
		let c = 0;
		for (let i = 0; i < this._spaces.length; i++) {
			for (let j = 0; j < this._spaces[i].pawns.length; j++) {
				if (isEqual(pawn, this._spaces[i].pawns[j])) {
					this._spaces[i].removePawn(pawn);
					if (this._spaces[i].pawns.length == 0) { this._spaces.splice(i, 1); }
					c++;
				}
			}
		}
		if (c != 1) { throw new Error("pawn to be removed doesnt exist on the board"); }
	}
	
	isBop(pawn: Pawn, space: Space): boolean {
		let ret = this._spaces.filter(sp => space.equals(sp))[0];
		if (ret) {
			return ret.isBop(pawn);
		}
		return false;
	}
	
	isBlockade(space: Space): boolean {
		let ret = this._spaces.filter(sp => space.equals(sp))[0];
		if (ret) {
			return ret.isBlockade();
		}
		return false;
	}
	
	gameOver(): Color | null {
		for (let i = 0; i < this._spaces.length; i++) {
			if (this._spaces[i] instanceof HomeSpace) {
				if (this._spaces[i].pawns.length == 4) {
					return this._spaces[i].pawns[0].color;
				}
			}
		}
		return null;
	}
}
