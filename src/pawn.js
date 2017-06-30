export class Pawn {
  constructor(id, color) {
    this.id = id;
    this.color = color;
		this.key = this.color + this.id;
  }
}
