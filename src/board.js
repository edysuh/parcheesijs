import { Space } from "./space";

var NSPACES = 95;

export class Board {
	constructor() {
		this._spaces = [];
		
		for (var i = 0; i < NSPACES; i++) {
			// add differentiation by types
			this._spaces[i] = new Space(i, "");
		}
	}
	
	getSpaceAt(i) {
		return this._spaces[i];
	}
	
	getNextSpace(curr) {
		// add cases for situations when entering into home row (and others?)
		if (!curr) {
			console.error("current space is not defined");
		}
		
		return this._spaces[curr.getPosition() + 1];
	}
	
	// return space or pawn?
	findPawnLocation(pawn) {
		for (var i = 0; i < this._spaces.length; i++) {
			var tpawn = this._spaces[i].getPawnOnSpace();
			
			if (tpawn) {
				if (pawn === tpawn) {
					return this._spaces[i];
				}
			}
		}
	}
}
