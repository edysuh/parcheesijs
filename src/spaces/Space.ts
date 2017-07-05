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
}
