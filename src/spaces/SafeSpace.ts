import { MainSpace } from './MainSpace';
import { Pawn } from '../Pawn';

export class SafeSpace extends MainSpace {
	setPawn(pawn: Pawn): void {
		if (this.pawns.length == 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (this.isBop(pawn)) {
			throw new Error("invalid attempt to bop on a SafeSpace");
		} else {
			this.pawns.push(pawn);
		}
	}
}
