import { Space, NestSpace, MainSpace, HomeRowSpace, HomeSpace } from "./space";

export class Board {
	constructor() {
		// initialize all pawns here?
		this.pawnPositions = Map();
		this.blockades = Map();
	}

	setPawnOnSpace(pawn, space) {
		this.pawnPositions[pawn] = space;
	}
	
	// error check for whether this space has two colored pawns
	setColoredBlockade(color, space) {
		this.blockades[space] = color;
	}
}
