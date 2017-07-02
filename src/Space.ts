import { EnterHomeRowMap, 
				 NUM_HOME_ROW_SPACES, 
				 NUM_MAIN_SPACES, 
				 ColoredSafeties, 
				 Safeties } from './defs';

export class Space { }

export class NestSpace extends Space { }

export class MainSpace extends Space {
	index: number;
	
	constructor(index: number) {
		super();
		if (index >= NUM_MAIN_SPACES) {
			throw new Error("Main ring space cannot have index > 67");
		}
		this.index = index;
	}
	
	getNextSpace(color: string): Space {
		if (this.index === EnterHomeRowMap.get(color)) {
			return new HomeRowSpace(0, color);
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
	color: string;
	
	constructor(index: number, color: string) {
		super();
		if (index >= NUM_HOME_ROW_SPACES) {
			throw new Error("Home row space cannot have index > 6");
		}
		this.index = index;
		this.color = color;
	}
	
	getNextSpace(color?: string) {
		if (this.index === NUM_HOME_ROW_SPACES - 1) {
			return new HomeSpace();
		}
		return new HomeRowSpace(this.index + 1, this.color);
	}
}

export class HomeSpace extends Space { }
