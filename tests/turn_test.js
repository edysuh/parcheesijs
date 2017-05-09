import { assert } from './tester';
import { Turn } from '../src/turn';
import { Board } from '../src/board';
import { Player } from '../src/player';
import { MPlayer } from '../src/mplayer';

export function turn_test() {
	let d = {"blue": { 0: 40, 1: 50, 2: 60, 3: 2 } };
	
	let {board, plist} = generateTestBoard(d);
	
	let t = new Turn();
	let newBoard = t.takeTurn(b, player1, [1, 2]);
}
