export class Space {
	constructor(i) {
		this._position = i;
		this._pawnsOnSpace = [];
		this._isSafety = false;
		this.isBlockade = false;
	}
	
	getPosition() {
		return this._position;
	}
	
	// just returning one is fine since, if there are two, they are both the same color
	getPawnOnSpace() {
		if (!this._pawnsOnSpace) {
			return null;
		}
		return this._pawnsOnSpace[0];
	}
	
	getPawnOnSpaceById(id, color) {
		for (let i = 0; i < this._pawnsOnSpace.length; i++) {
			if (!this._pawnsOnSpace[i]) {
				continue;
			} else if (id === this._pawnsOnSpace[i].getId() && 
								 color === this._pawnsOnSpace[i].getColor()) {
				return this._pawnsOnSpace[i];
			}
		}
		return null;
	}
	
	// pre: space doesn't already have two pawns
	// post: space has the new pawn
	setPawnOnSpace(pawn) {
		if (this._pawnsOnSpace.length < 2) {
			this._pawnsOnSpace.push(pawn);
		} else {
			throw new Error("too many pawns on space");
		}
	}
	
	removePawnOnSpace() {
		this._pawnsOnSpace.pop();
	}
	
	// pre: the pawn exists on this space?
	// post: the space no longer holds the pawn
	removePawnOnSpaceById(id) {
		for (let i = 0; i < this._pawnsOnSpace.length; i++) {
			if (id === this._pawnsOnSpace[i].getId()) {
				this._pawnsOnSpace.splice(i, 1);
			}
		}
	}
}
