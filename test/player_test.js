import { assert } from './tester';
import { Player } from '../src/player';
import { Board } from '../src/board';

export function player_test() {
	let b = new Board();
	let pl = new Player("green");
	
	b.getSpaceAt(40).setPawnOnSpace(pl.pawns[0]);
	b.getSpaceAt(50).setPawnOnSpace(pl.pawns[1]);
	b.getSpaceAt(60).setPawnOnSpace(pl.pawns[2]);
	b.getSpaceAt(2).setPawnOnSpace(pl.pawns[3]);
	
	pl.pawns[0].distRemaining = 73;
	pl.pawns[1].distRemaining = 63;
	pl.pawns[2].distRemaining = 53;
	pl.pawns[3].distRemaining = 43;

	pl.doublesPenalty(b);
	
	assert(!b.findPawnLocation(pl.pawns[3]), "PLAYER: doubles penalty, removed farthest pawn from board");
}
