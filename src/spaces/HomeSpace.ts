import { Color } from '../definitions';
import { Pawn } from '../Pawn';
import { Space } from './Space';

export class HomeSpace extends Space {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
	}
	
	setPawn(pawn: Pawn): void {
		if (this.color != pawn.color) { throw new Error("pawn is on wrong color home"); }
		if (this._pawns.length >= 4) { throw new Error("max 4 pawns in home"); }
		this._pawns.push(pawn);
	}

	getNextSpace(pawnColor?: Color): Space {
		throw new Error("no next space; move likely overshot home");
	}
	
	isBlockade(): boolean {
		return false;
	}

	equals(space: Space): boolean {
		return (space instanceof HomeSpace && this.color == space.color);
	}
	
	distanceFromHome(pawnColor?: Color): number {
		return 0;
	}
}
