import { Space } from "./space";
import { NSPACES, SAFETIES, HOMEROWLEN, homeRowLocations } from "./def";

export class Board {
	constructor() {
		this._spaces = [];
		
		for (var i = 0; i < NSPACES; i++) {
			this._spaces[i] = new Space(i);
		}
		
		for (i = 0; i < SAFETIES.length; i++) {
			this._spaces[SAFETIES[i]]._isSafety = true;
		}
	}
	
	getSpaceAt(i) {
		return this._spaces[i];
	}
	
	// precondition: curr is a space
	// postcondition: returned is a space (or null?)
	getNextSpace(curr, color) {
		if (!curr) {
			throw new Error("current space is not defined");
		}

		if (curr == this.getSpaceAt(homeRowLocations[color]["enter"] + HOMEROWLEN)) {
			// return null;
			throw new Error("pawn is on his last space");
		}
		
		if (curr === this.getSpaceAt(homeRowLocations[color]["enter"])) {
			return this.getSpaceAt(homeRowLocations[color]["home"]);
		}
		
		if (curr === this.getSpaceAt(67)) {
			return this.getSpaceAt(0);
		}
		
		return this.getSpaceAt(curr.getPosition() + 1);
	}
	
	findPawnLocation(pawn) {
		for (var i = 0; i < this._spaces.length; i++) {
			var foundPawn = this._spaces[i].getPawnOnSpaceById(pawn.getId());
			
			if (foundPawn) {
				return this._spaces[i];
			}
		}
		return null;
	}
}
