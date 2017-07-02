import { Color } from './defs';

export class Pawn {
	id: number;
	color: Color;
	key: string;
	
  constructor(id: number, color: Color) {
    this.id = id;
    this.color = color;
		this.key = Color[this.color].toString() + this.id;
  }
}
