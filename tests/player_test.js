import { assert } from './tester';
import { Player } from '../src/player';
import { Board } from '../src/board';

export function player_test() {
	let b = new Board();
	let pl = new Player("green");
	
	b.getSpaceAt(40).setPawnOnSpace(pl._pawns[0]);
	b.getSpaceAt(50).setPawnOnSpace(pl._pawns[1]);
	b.getSpaceAt(60).setPawnOnSpace(pl._pawns[2]);
	b.getSpaceAt(2).setPawnOnSpace(pl._pawns[3]);
	
	pl._pawns[0].distRemaining = 73;
	pl._pawns[1].distRemaining = 63;
	pl._pawns[2].distRemaining = 53;
	pl._pawns[3].distRemaining = 43;

	pl.doublesPenalty(b);
	
	assert(!b.findPawnLocation(pl._pawns[3]), "PLAYER: doubles penalty, removed farthest pawn from board");
}
