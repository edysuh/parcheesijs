import { Color, EnterHomeRowMap, NUM_MAIN_SPACES, Safeties, ColoredSafeties } from '../definitions';
import { Bop } from '../Bop';
import { Pawn } from '../Pawn';
import { Space } from './Space';
import { ColoredSafeSpace } from './ColoredSafeSpace';
import { SafeSpace } from './SafeSpace';
import { HomeRowSpace } from './HomeRowSpace';

export class MainSpace extends Space {
	readonly index: number;

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

		if (Safeties.includes(this.index + 1)) {
			return new SafeSpace(this.index + 1);
		} else if (ColoredSafeties.has(this.index + 1)) {
			return new ColoredSafeSpace(this.index + 1, ColoredSafeties.get(this.index + 1));
		}

		return new MainSpace((this.index + 1) % NUM_MAIN_SPACES);
	}
}
