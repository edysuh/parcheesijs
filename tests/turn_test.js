import { assert, generateTestBoard } from './tester';
import { Turn } from '../src/turn';
import { Board } from '../src/board';
import { Player } from '../src/player';
import { MPlayer } from '../src/mplayer';
import { TPlayer } from '../src/tplayer';
import { Pawn } from '../src/pawn';
import { MoveMain } from '../src/moveMain';
import { EnterPiece } from '../src/enterPiece';

export function turn_test() {
	let d = {"blue": { "pawns": { 0: 40, 1: 20, 2: 60, 3: 30 }, "type": "tplayer" }, 
					 "green": { "pawns": {0: 51, 1: 24, 2: 63}, "type": "tplayer" } };
	let {board, playerList} = generateTestBoard(d);
	
	playerList[0].moves.push(new MoveMain(playerList[0].pawns[0], board.getSpaceAt(40), 6));
	playerList[0].moves.push(new MoveMain(playerList[0].pawns[1], board.getSpaceAt(20), 4));
	playerList[0].moves.push(new MoveMain(playerList[0].pawns[1], board.getSpaceAt(24), 20));
	
	let t = new Turn(board, playerList[0]);
	let newBoard = t.takeTurn([6, 4]);
	// if (board === newBoard) {
	// 	console.log("board equality");
	// } else {
	// 	console.log("not equal");
	// }
	
	assert(newBoard.findPawnLocation(playerList[0].pawns[0]) === newBoard.getSpaceAt(46), 
				 "TURN TEST: a basic turn");
	
	assert(newBoard.findPawnLocation(playerList[0].pawns[1]) === newBoard.getSpaceAt(44),
				 "TURN TEST: bop and do bonus move");
	
	// --------------------------------------------------------------------------
	
	d = {"blue": { "pawns": { 0: 40, 1: 20, 2: 60, 3: 30 }, "type": "mplayer" }};
	({board, playerList} = generateTestBoard(d));
	
	t = new Turn(board, playerList[0]);
	newBoard = t.takeTurn([4]);
}
