import { Space } from "./space";
import { NSPACES, SAFETIES } from "./def";

export class Board {
	constructor() {
		this._spaces = [];
		
		for (var i = 0; i < NSPACES; i++) {
			this._spaces[i] = new Space(i);
		}
		
		// better way without accessing a (private) member?
		for (i = 0; i < SAFETIES.length; i++) {
			this._spaces[SAFETIES[i]]._isSafety = true;
		}
	}
	
	getSpaceAt(i) {
		return this._spaces[i];
	}
	
	getNextSpace(curr) {
		if (!curr) {
		 	// console.error("current space is not defined");
		}
		
		// add cases for situations when entering into home row (and others?)
		
		
		return this._spaces[curr.getPosition() + 1];
	}
	
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
