import { Color } from './definitions';

export type pkey = string;

export class Pawn {
	readonly id: number;
	readonly color: Color;
	readonly key: pkey;
	
  constructor(id: number, color: Color) {
    this.id = id;
    this.color = color;
		this.key = Color[this.color].toString() + this.id;
  }
}
