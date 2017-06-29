import { homeRowLocations } from './def';


function Space() { }


function NestSpace() { 
	Space.call(this);
}
NestSpace.prototype = Object.create(Space.prototype);


function MainSpace(index) {
	Space.call(this);
	this.index = index;
	
	this.getNextSpace = (color) => {
		if (this.index === homeRowLocations[color]["enter"]) {
			return new HomeRowSpace(0, color);
		}
		return new MainSpace((this.index + 1) % 68);
	};
}
MainSpace.prototype = Object.create(Space.prototype);


function SafeMainSpace() {
	MainSpace.call(this);
}
SafeMainSpace.prototype = Object.create(MainSpace.prototype);


let sms = new SafeMainSpace();
console.log(sms);
console.log(sms.getNextSpace("blue"));
