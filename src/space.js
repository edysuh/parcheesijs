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
		return this._pawnsOnSpace[0];
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
}
