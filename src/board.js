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
			return null;
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
