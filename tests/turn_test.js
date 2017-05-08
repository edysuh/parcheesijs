import { assert } from './tester';
import { Turn } from '../src/turn';
import { Board } from '../src/board';
import { Player } from '../src/player';
import { MPlayer } from '../src/mplayer';

export function turn_test() {
	let player1 = new MPlayer("blue");
	let b = new Board();
	b.getSpaceAt(40).setPawnOnSpace(player1.pawns[0]);
	b.getSpaceAt(50).setPawnOnSpace(player1.pawns[1]);
	b.getSpaceAt(60).setPawnOnSpace(player1.pawns[2]);
	b.getSpaceAt(2).setPawnOnSpace(player1.pawns[3]);
	
	player1.pawns[0].distRemaining = 73;
	player1.pawns[1].distRemaining = 63;
	player1.pawns[2].distRemaining = 53;
	player1.pawns[3].distRemaining = 43;
	
	let t = new Turn();
	
	let newBoard = t.takeTurn(b, player1);
}
