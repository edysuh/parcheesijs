import { enterHomeRowSpaces, HOME_ROW_LENGTH } from './def';

export class Space {
	// constructor() { }
	
}

export class NestSpace extends Space {

}

export class MainSpace extends Space {
	constructor(index) {
		super();
		this.index = index;
	}
	
	getNextSpace(color) {
		// magic number
		if (this.index === enterHomeRowSpaces[color]) {
			return new HomeRowSpace(0, color);
		}
		return new MainSpace((this.index + 1) % 68);
	}
}

export class SafeMainSpace extends MainSpace {

}

export class HomeSpace extends Space {

}

export class HomeRowSpace extends Space {
	constructor(index, color) {
		super();
		if (index >= HOME_ROW_LENGTH) {
			throw new Error("Home row space cannot have index greater than 7");
		}
		this.index = index;
		this.color = color;
	}
	
	getNextSpace() {
		
	}
}

let sms = new SafeMainSpace();
console.log(sms);
