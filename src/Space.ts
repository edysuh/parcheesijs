import { Color,
				 EnterHomeRowMap, 
				 NUM_HOME_ROW_SPACES, 
				 NUM_MAIN_SPACES, 
				 ColoredSafeties, 
				 Safeties } from './defs';
import { Bop } from './Bop';
import { Pawn } from './Pawn';

export abstract class Space {
	pawns: Pawn[];
	
	constructor() {
		this.pawns = [];
	}
	
	abstract getNextSpace(pcolor: Color): Space;
	
	// TODO likely poor design
	setPawnOnSpace(pawn: Pawn): Bop | null {
		if (this.pawns.length >= 2) {
			throw new Error("invalid attempt to set pawn on blockade");
		} else if (this.pawns.length == 1) {
			if (pawn.color == this.pawns[0].color) {
				this.pawns.push(pawn);
			} else {
				this.pawns = [pawn];
				return new Bop();
			}
		} else {
			this.pawns.push(pawn);
		}
		return null;
	}
}

export class NestSpace extends Space {
	getNextSpace(pcolor: Color): Space {
		// TODO
		return new NestSpace();
	}
}

export class MainSpace extends Space {
	index: number;
	
	constructor(index: number) {
		super();
		if (index >= NUM_MAIN_SPACES) {
			throw new Error("Main ring space cannot have index > 67");
		}
		this.index = index;
	}
	
	getNextSpace(pcolor: Color): Space {
		if (this.index === EnterHomeRowMap.get(pcolor)) {
			return new HomeRowSpace(0, pcolor);
		}
		
		// not sure if this is the best way to design this
		if (Safeties.includes(this.index + 1)) {
			return new SafeSpace(this.index + 1);
		} else if (ColoredSafeties.includes(this.index + 1)) {
			return new ColoredSafeSpace(this.index + 1);
		}
		
		return new MainSpace((this.index + 1) % NUM_MAIN_SPACES);
	}
}

export class SafeSpace extends MainSpace { }

export class ColoredSafeSpace extends SafeSpace { }

export class HomeRowSpace extends Space {
	index: number;
	color: Color;
	
	constructor(index: number, color: Color) {
		super();
		if (index >= NUM_HOME_ROW_SPACES) {
			throw new Error("Home row space cannot have index > 6");
		}
		this.index = index;
		this.color = color;
	}
	
	getNextSpace(pcolor?: Color): Space {
		if (this.index === NUM_HOME_ROW_SPACES - 1) {
			return new HomeSpace();
		}
		return new HomeRowSpace(this.index + 1, this.color);
	}
}

export class HomeSpace extends Space {
	getNextSpace(pcolor: Color): Space {
		return null;
	}
}
