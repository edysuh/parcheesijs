import { PAWN_DISTANCE } from "./def";

export class Pawn {
  constructor(id, color) {
    this._id = id;
    this._color = color;
    this.distRemaining = PAWN_DISTANCE;
  }
  
  getId() {
    return this._id;
  }
  
  getColor() {
    return this._color;
  }
  
  decrDistRemaining() {
    if (this.distRemaining >= 0) {
      this.distRemaining--;
    } else {
      // PAWN IS HOME
    }
  }
}
