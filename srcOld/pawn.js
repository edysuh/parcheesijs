export class Pawn {
  constructor(id, color) {
    this._id = id;
    this._color = color;
  }
  
  get id() {
    return this._id;
  }
  
  get color() {
    return this._color;
  }
}
