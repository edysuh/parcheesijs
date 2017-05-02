import { assert } from './tester';
import { Turn } from '../src/turn';
import { Board } from '../src/board';
import { Player } from '../src/player';

export function turn_test() {
	let player1 = new Player("blue");
	let b = new Board();
	b.getSpaceAt(10).setPawnOnSpace(player1._pawns[0]);
	let t = new Turn();
	
	let newBoard = t.takeTurn(b, player1);
}
