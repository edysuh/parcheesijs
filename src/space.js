export class Space {
	constructor(i, type) {
		this._position = i;
		this._type = type;
		this._pawnsOnSpace = [];
		this.isBlockade = false;
	}
	
	getPosition() {
		return this._position;
	}
	
	setPawnOnSpace(pawn) {
		// try ... catch exception?
		if (this._pawnsOnSpace.length < 2) {
			this._pawnsOnSpace.push(pawn);
		} else {
			console.log("too many pawns on space");
		}
	}
	
	removePawnOnSpace(pawn) {
		this._pawnsOnSpace.pop();
	}
	
	// just returning one is fine since, if there are two, they are both the same color
	getPawnOnSpace() {
		return this._pawnsOnSpace[0];
	}
}
