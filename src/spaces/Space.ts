import { Color } from '../definitions';
import { Bop } from '../Bop';
import { Pawn } from '../Pawn';

export abstract class Space {
	pawns: Pawn[];

	constructor() {
		this.pawns = [];
	}
	
	abstract getNextSpace(pcolor: Color): Space;
	
	// precondition: isBop is always called before this function is used
	// some code duplication across subclasses: Space -> SafeSpace -> ColoredSafeSpace
	setPawn(pawn: Pawn): void {
		if (this.pawns.length == 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (this.isBop(pawn)) {
			this.pawns = [pawn];
		} else {
			this.pawns.push(pawn);
		}
	}
	
	isBop(pawn: Pawn): boolean {
		return (this.pawns.length == 1 && pawn.color != this.pawns[0].color);
	}
}
