import { isEqual } from 'lodash';

import { Color } from '../definitions';
import { Pawn } from '../Pawn';

export abstract class Space {
	protected _pawns: Pawn[];

	constructor() {
		this._pawns = [];
	}

	get pawns() {
		return this._pawns;
	}

	// postcondition: replace bopped pawn on nest
	setPawn(pawn: Pawn): void {
		if (this._pawns.length == 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (this.isBop(pawn)) {
			this._pawns = [pawn];
		} else {
			this._pawns.push(pawn);
		}
	}

	removePawn(pawn: Pawn): void {
		let c = 0;
		for (let i = 0; i < this._pawns.length; i++) {
			if (isEqual(pawn, this._pawns[i])) {
				this._pawns.splice(i, 1);
				c++;
			}
		}
		if (c != 1) { throw new Error('could not the given pawn or found too many'); }
	}

	isBop(pawn: Pawn): boolean {
		return (this._pawns.length == 1 && 
						pawn.color != this._pawns[0].color);
	}
	
	isBlockade(): boolean {
		return (this._pawns.length == 2 && 
						this._pawns[0].color == this._pawns[1].color)
	}

	abstract getNextSpace(pawnColor: Color): Space;

	abstract equals(space: Space): boolean;
	
	abstract distanceFromHome(pawnColor: Color): number;
}
