import { enterHomeRowSpaces, NUM_HOME_ROW_SPACES, NUM_MAIN_SPACES } from './def';

export class Space { }

export class NestSpace extends Space { }

export class MainSpace extends Space {
	constructor(index) {
		super();
		if (index >= NUM_MAIN_SPACES) {
			throw new Error("Main ring space cannot have index > 67");
		}
		this.index = index;
	}
	
	getNextSpace(color) {
		if (this.index === enterHomeRowSpaces[color]) {
			return new HomeRowSpace(0, color);
		}
		return new MainSpace((this.index + 1) % NUM_MAIN_SPACES);
	}
}

/////////////////////////////////////////////////////////////
export class SafeMainSpace extends MainSpace { }
/////////////////////////////////////////////////////////////

export class HomeRowSpace extends Space {
	constructor(index, color) {
		super();
		if (index >= NUM_HOME_ROW_SPACES) {
			throw new Error("Home row space cannot have index > 6");
		}
		this.index = index;
		this.color = color;
	}
	
	// color parameter will be unused
	getNextSpace() {
		if (this.index === NUM_HOME_ROW_SPACES - 1) {
			return new HomeSpace();
		}
		return new HomeRowSpace(this.index + 1, this.color);
	}
}

export class HomeSpace extends Space { }
