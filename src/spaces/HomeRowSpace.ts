import { Color, NUM_HOME_ROW_SPACES } from '../definitions';
import { Pawn } from '../Pawn';
import { Space } from './Space';
import { HomeSpace } from './HomeSpace';

export class HomeRowSpace extends Space {
	readonly index: number;
	readonly color: Color;
	
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
			return new HomeSpace(this.color);
		}
		return new HomeRowSpace(this.index + 1, this.color);
	}
}

