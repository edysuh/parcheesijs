import { Space } from "./space";
import { NSPACES, SAFETIES, homeRowLocations } from "./def";

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
	
	getNextSpace(curr, color) {
		if (!curr) {
		 	// console.error("current space is not defined");
		}
		
		if (curr === this.getSpaceAt(homeRowLocations[color]["enter"])) {
			return this.getSpaceAt(homeRowLocations[color]["home"]);
		}
		
		if (curr === this.getSpaceAt(67)) {
			return this.getSpaceAt(0);
		}
		
		return this.getSpaceAt(curr.getPosition() + 1);
	}
	
	// TODO: this function breaks if there are 2 pawns on a space
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
