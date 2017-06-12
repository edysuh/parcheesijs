export class Space {
	
}

export class HomeSpace extends Space {

}

export class MainSpace extends Space {
	constructor(index) {
		this.index = index;
	}
	
	getNextSpace(color) {
		// magic number
		if (this.index === homeRowLocations[color]["enter"]) {
			return new HomeRowSpace(0, color);
		}
		return new MainSpace((this.index + 1) % 68);
	}
}

export class SafeMainSpace extends MainSpace {
	
}

export class NestSpace extends Space {

}

export class HomeRowSpace extends Space {
	constructor(index, color) {
		this.index = index;
		this.color = color;
	}
	
	getNextSpace() {
		;
	}
}
