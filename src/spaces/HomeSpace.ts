import { Color } from '../defs';
import { Space } from './Space';

export class HomeSpace extends Space {
	getNextSpace(pcolor?: Color): Space {
		return null;
	}
	
	// override Space::setPawn
}
