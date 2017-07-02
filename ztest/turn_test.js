import { assert, generateTestBoard } from './tester';
import { Turn } from '../src/turn';
import { Board } from '../src/board';
import { Player } from '../src/player';
import { MPlayer } from '../src/mplayer';
import { TPlayer } from '../src/tplayer';
import { Pawn } from '../src/pawn';
import { MoveMain } from '../src/moveMain';
import { MoveHome } from '../src/moveHome';
import { EnterPiece } from '../src/enterPiece';

export function turn_test() {
	let d = {"blue": { "pawns": { 0: 40, 1: 20, 2: 60, 3: 30 }, "type": "tplayer" }, 
					 "green": { "pawns": {0: 51, 1: 24, 2: 63}, "type": "tplayer" } };
	let {board, playerList} = generateTestBoard(d);
	
	playerList[0].moves.push(new MoveMain(playerList[0].pawns[0], board.getSpaceAt(40), 6));
	playerList[0].moves.push(new MoveMain(playerList[0].pawns[1], board.getSpaceAt(20), 4));
	playerList[0].moves.push(new MoveMain(playerList[0].pawns[0], board.getSpaceAt(46), 20));
	
	let t = new Turn(board, playerList[0]);
	let newBoard = t.takeTurn([5, 4]);
	
	assert(newBoard.findPawnLocation(playerList[0].pawns[0]) === newBoard.getSpaceAt(66), 
				 "TURN TEST: a basic turn");
	
	assert(newBoard.findPawnLocation(playerList[0].pawns[1]) === newBoard.getSpaceAt(24),
				 "TURN TEST: bop and do bonus move");

	// --------------------------------------------------------------------------
	
	d = {"blue": { "pawns": { 0: 70, 1: 60 }, "type": "tplayer" }};
	({board, playerList} = generateTestBoard(d));
	
	playerList[0].moves.push(new MoveHome(playerList[0].pawns[0], board.getSpaceAt(70), 5));
	playerList[0].moves.push(new MoveHome(playerList[0].pawns[1], board.getSpaceAt(60), 10));
	
	t = new Turn(board, playerList[0]);
	newBoard = t.takeTurn([5]);
	
	console.log(newBoard.findPawnLocation(playerList[0].pawns[0]));
	assert(!playerList[0].getPawnById(0), "TURN: pawn is done");
	
	// --------------------------------------------------------------------------
	
	d = {"blue": { "pawns": { 0: 40, 1: 20, 2: 60, 3: 30 }, "type": "mplayer" }};
	({board, playerList} = generateTestBoard(d));
	
	t = new Turn(board, playerList[0]);
	newBoard = t.takeTurn([4]);
}