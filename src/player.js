export class Player {
	constructor(color) {
		this._color = color;
		this._pawns = [];
		
		for (let i = 0; i < 4; i++) {
			this._pawns(i, this._color);
		}
	}
	
	// takeTurn(board) {
		// var t = new Turn();
		// t.takeTurn(board, this);
	// }
	
	// abstract function that is different for humans and machines
	// given a board and array of rolls, return an array of the moves the player decided on
	doMove(board, rolls) {
		
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
