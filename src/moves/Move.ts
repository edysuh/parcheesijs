// export interface Move { }

import { Board } from '../Board';
import { MoveResult } from '../moves/MoveMain';
import { Cheat } from '../Cheat';

export abstract class Move { 
	abstract move(board: Board): MoveResult | Cheat;
}
