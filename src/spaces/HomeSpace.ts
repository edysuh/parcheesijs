import { Color } from '../definitions';
import { Pawn } from '../Pawn';
import { Space } from './Space';

export class HomeSpace extends Space {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
	}
	
	setPawn(pawn: Pawn): null {
		if (this.color != pawn.color) { throw new Error("pawn is on wrong color home"); }
		if (this._pawns.length >= 4) { throw new Error("max 4 pawns in home"); }
		this._pawns.push(pawn);
		return null;
	}

	getNextSpace(pcolor?: Color): Space {
		throw new Error("no next space");
	}
	
	isBlockade(): boolean {
		return false;
	}

	equals(space: Space): boolean {
		return (space instanceof HomeSpace && this.color == space.color);
	}
}
