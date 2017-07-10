import { Color } from './definitions';

export type pid = number;

export class Pawn {
	readonly id: pid;
	readonly color: Color;
	
  constructor(id: number, color: Color) {
    this.id = id;
    this.color = color;
  }
}
