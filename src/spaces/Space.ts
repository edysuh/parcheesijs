import { Color } from '../defs';
import { Bop } from '../Bop';
import { Pawn } from '../Pawn';

export abstract class Space {
	pawns: Pawn[];

	constructor() {
		this.pawns = [];
	}

	// TODO should not do this?
	abstract getNextSpace(pcolor: Color): Space;

	// TODO multiple return types likely poor design
	// setPawn(pawn: Pawn): Bop | null {
	// 	if (this.pawns.length >= 2) {
	// 		throw new Error("invalid attempt to set pawn on blockade");
	// 	} else if (this.pawns.length == 1) {
	// 		if (pawn.color == this.pawns[0].color) {
	// 			this.pawns.push(pawn);
	// 		} else {
	// 			this.pawns = [pawn];
	// 			return new Bop();
	// 		}
	// 	} else {
	// 		this.pawns.push(pawn);
	// 	}
	// 	return null;
	// }

	setPawn(pawn: Pawn): void {
		if (this.pawns.length >= 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (this.pawns.length == 1) {
			if (pawn.color == this.pawns[0].color) {
				this.pawns.push(pawn);
			} else {
				this.pawns = [pawn];
			}
		} else {
			this.pawns.push(pawn);
		}
	}
}
