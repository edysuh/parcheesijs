import { Bop } from '../Bop';
import { Color } from '../defs';
import { Pawn } from '../Pawn';
import { SafeSpace } from './SafeSpace';

export class ColoredSafeSpace extends SafeSpace {
	color: Color;
	
	constructor(index: number, color: Color) {
		super(index);
		this.color = color;
	}
	
	// invariant: a pawn can only ever be on a ColoredSafeSpace immediately
	//		after coming out of the Nest
	isBop(pawn: Pawn): boolean {
		return (pawn.color == this.color);
	}
}
