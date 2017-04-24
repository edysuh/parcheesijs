export class Player {
	constructor(color) {
		this._color = color;
		this._pawns = [];
		
		for (let i = 0; i < 4; i++) {
			this._pawns(i, this._color);
		}
	}
	
	takeTurn(board) {
		// var t = new Turn();
		// t.takeTurn(board, this);
	}
	
	doublesPenalty() {

	}
	
	getColor() {
		return this._color;
	}
	
	getPawn() {
		return this._pawns[0];
	}
	
	getPawnById(id) {
		for (let i = 0; i < 4; i++) {
			if (id === this._pawns[i].getId()) {
				return this._pawns[i];
			}
		}
	}
}
