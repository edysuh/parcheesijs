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
	
	getPawnOnSpaceById(id) {
		for (let i = 0; i < this._pawnsOnSpace.length; i++) {
			if (id === this._pawnsOnSpace[i].getId()) {
				return this._pawnsOnSpace[i];
			}
		}
		return null;
	}
	
	setPawnOnSpace(pawn) {
		// try ... catch exception?
		if (this._pawnsOnSpace.length < 2) {
			this._pawnsOnSpace.push(pawn);
		} else {
			// console.error("too many pawns on space");
		}
	}
	
	removePawnOnSpace() {
		this._pawnsOnSpace.pop();
	}
	
	removePawnOnSpaceById(id) {
		for (let i = 0; i < this._pawnsOnSpace.length; i++) {
			if (id === this._pawnsOnSpace[i].getId()) {
				this._pawnsOnSpace.splice(i, 1);
			}
		}
	}
}
