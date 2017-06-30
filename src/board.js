import { Colors, NUM_PAWNS } from './def';
import { Space, NestSpace, MainSpace, HomeRowSpace, HomeSpace } from './space';
import { Pawn } from './pawn';
import isEqual from 'lodash';

export class Board {
	constructor() {
		// initialize all pawns here?
		this.pawns = [];
		this.pawnPositions = new Map();
		this.blockades = [];
		
		for (let i = 0; i < Colors.length; i++) {
			for (let j = 0; j < NUM_PAWNS; j++) {
				let pawn = new Pawn(j, Colors[i]);
				this.pawns.push(pawn);
				this.pawnPositions.set(pawn.key, new NestSpace());
			}
		}
	}

	setPawnOnSpace(pawn, space) {
		this.pawnPositions.set(pawn.key, space);
	}
	
	getSpaceForPawn(pawn) {
		return this.pawnPositions.get(pawn.key);
	}
	
	// error check for whether this space has two colored pawns
	setColoredBlockade(space, color) {
		this.blockades.push({'space': space, 'color': color});
	}
	
	removeBlockade(space) {
		for (let i = 0; i < this.blockades.length; i++) {
			if (isEqual(this.blockades[i].space, space)) {
				this.blockades.splice(i, 1);
			}
		}
	}
}
