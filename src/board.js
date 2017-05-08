import { Space } from "./space";
import { NSPACES, SAFETIES, HOMEROWLENGTH, homeRowLocations } from "./def";

export class Board {
	constructor() {
		this._spaces = [];
		
		for (let i = 0; i < NSPACES; i++) {
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

		if (curr == this.getSpaceAt(homeRowLocations[color]["enter"] + HOMEROWLENGTH)) {
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
	
	// pre: none
	// post: will find the pawn if it exists, return null if not found
	findPawnLocation(pawn) {
		for (let i = 0; i < this._spaces.length; i++) {
			let foundPawn = this._spaces[i].getPawnOnSpaceById(pawn.getId());
			
			if (foundPawn) {
				return this._spaces[i];
			}
		}
		return null;
	}
}
