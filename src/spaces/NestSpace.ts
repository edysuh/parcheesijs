import { Color, StartMap, PAWN_DISTANCE } from '../definitions';
import { Pawn } from '../Pawn';
import { Space } from './Space';
import { ColoredSafeSpace } from './ColoredSafeSpace';


export class NestSpace extends Space {
	readonly color: Color;

	constructor(color: Color) {
		super();
		this.color = color;
	}

	setPawn(pawn: Pawn): void {
		if (this.color != pawn.color) { throw new Error("pawn is on wrong color nest"); }
		if (this._pawns.length >= 4) { throw new Error("max 4 pawns in the nest"); }
		this._pawns.push(pawn);
	}
	
	isBlockade(): boolean {
		return false;
	}
	
	getNextSpace(pawnColor?: Color): Space {
		return new ColoredSafeSpace(StartMap.get(this.color), this.color);
	}
	
	equals(space: Space): boolean {
		return (space instanceof NestSpace && this.color == space.color);
	}
	
	distanceFromHome(pawnColor: Color): number {
		return PAWN_DISTANCE;
	}
}
