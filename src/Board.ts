import { isEqual } from 'lodash';

import { Color, Colors, NUM_PAWNS, Pair } from './definitions';
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

	// for debugging
	display(): void {
		console.log('\n--------------------------------------------');
		for (let i = 0; i < this._spaces.length; i++) {
			console.log(this._spaces[i]);
		}
		console.log('--------------------------------------------\n');
	}

	setPawnOnSpace(pawn: Pawn, space: Space): void {
		let setSpace = this.getSpaceOnBoard(space);
		if (!setSpace) {
			setSpace = space;
			this._spaces.push(setSpace);
		}

		let old = this.getSpaceForPawn(pawn);
		old.removePawn(pawn);
		if (old.pawns.length == 0) {
			this._spaces.splice(this._spaces.indexOf(old), 1);
		}

		if (setSpace.isBop(pawn)) {
			let bopped = setSpace.pawns[0];
			let nest = this.getSpaceOnBoard(new NestSpace(bopped.color));
			if (!nest) {
				nest = new NestSpace(bopped.color);
				this._spaces.push(nest);
			}
			nest.setPawn(bopped);
		}

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

	getPlayerPawns(color: Color): Pair[] {
		let pairs = [];
		for (let i = 0; i < NUM_PAWNS; i++) {
			let pawn = new Pawn(i, color);
			let space = this.getSpaceForPawn(pawn);
			pairs.push({ 'pawn': pawn, 'space': space });
		}
		return pairs;
	}

	// matches arbitrarily given space with a space on Board, by index (and sometimes color),
	// in order to have access to the stored pawns
	// can be bad to be calling this when given space doesnt have any pawns?
	getSpaceOnBoard(space: Space): Space {
		return this._spaces.filter(sp => space.equals(sp))[0];
	}

	isBop(pawn: Pawn, space: Space): boolean {
		let sp = this.getSpaceOnBoard(space);
		if (sp) {
			return sp.isBop(pawn);
		}
		return false;
	}

	isBlockade(space: Space): boolean {
		let sp = this.getSpaceOnBoard(space);
		if (sp) {
			return sp.isBlockade();
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
