import { Bop } from '../Bop';
import { Color } from '../definitions';
import { Pawn } from '../Pawn';
import { SafeSpace } from './SafeSpace';

export class ColoredSafeSpace extends SafeSpace {
	readonly color: Color;
	
	constructor(index: number, color: Color) {
		super(index);
		this.color = color;
	}
	
	// invariant: a pawn can only ever be on a ColoredSafeSpace immediately
	//		after coming out of the Nest
	setPawn(pawn: Pawn): void {
		if (this._pawns.length == 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (this.isBop(pawn)) {
			if (this.color == pawn.color) {
				this._pawns = [pawn];
			} else {
				throw new Error("invalid attempt to bop on a SafeSpace");
			}
		} else {
			this._pawns.push(pawn);
		}
	}
}
