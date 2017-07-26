import { should } from 'chai';
should();

import { Color } from '../src/definitions';
import { Board } from '../src/Board';
import { Pawn } from '../src/Pawn';
import { Turn } from '../src/Turn';
import { MainSpace } from '../src/spaces/MainSpace';
import { HomeRowSpace } from '../src/spaces/HomeRowSpace';
import { Move } from '../src/moves/Move';
import { EnterPiece } from '../src/moves/EnterPiece';
import { MoveMain } from '../src/moves/MoveMain';
import { MoveHome } from '../src/moves/MoveHome';
import { MFirstPlayer } from '../src/players/MPlayer';

describe("Turn", function() {
	it('should not be able to move another players pawns');

	it('should not be able to ignore a die roll', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(2);
		let moves = [new EnterPiece(pawn),
								 new MoveMain(pawn, space, 2),
								 new MoveHome(pawn, space, 4)];
		let rolls = [2, 5, 4];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});

	it('should not be able to ignore a die roll', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(2);
		board.setPawnOnSpace(pawn, space);
		let moves = [new EnterPiece(pawn),
								 new MoveMain(pawn, space, 2),
								 new MoveMain(pawn, space, 4)];
		let rolls = [2, 5, 6, 4];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.false;
	});

	it('should allow for no move, due to a blockade', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(2);
		board.setPawnOnSpace(pawn, space);

		let b1 = new Pawn(1, Color.green);
		let b2 = new Pawn(2, Color.green);
		let block = new MainSpace(4);
		board.setPawnOnSpace(b1, block);
		board.setPawnOnSpace(b2, block);

		let moves: Move[] = [];
		let rolls = [6, 6, 10, 20];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});

	it('should allow for just first die, due to a blockade', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(2);
		board.setPawnOnSpace(pawn, space);

		let b1 = new Pawn(1, Color.green);
		let b2 = new Pawn(2, Color.green);
		let block = new MainSpace(4);
		board.setPawnOnSpace(b1, block);
		board.setPawnOnSpace(b2, block);

		let moves = [new MoveMain(pawn, space, 2)];
		let rolls = [2, 6];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});

	it('should allow for just second die, due to a blockade', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(2);
		board.setPawnOnSpace(pawn, space);

		let b1 = new Pawn(1, Color.green);
		let b2 = new Pawn(2, Color.green);
		let block = new MainSpace(4);
		board.setPawnOnSpace(b1, block);
		board.setPawnOnSpace(b2, block);

		let moves = [new MoveMain(pawn, space, 2)];
		let rolls = [6, 2];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});

	it('should be able to bop, but dont take bonus of 20', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(20);
		board.setPawnOnSpace(pawn, space);

		let boppawn = new Pawn(1, Color.green);
		let bopspace = new MainSpace(24);
		board.setPawnOnSpace(boppawn, bopspace);

		let b1 = new Pawn(2, Color.red);
		let b2 = new Pawn(3, Color.red);
		let block = new MainSpace(30);
		board.setPawnOnSpace(b1, block);
		board.setPawnOnSpace(b2, block);

		let tmpspace = new MainSpace(21);
		tmpspace.setPawn(pawn);

		let moves = [new MoveMain(pawn, space, 1), new MoveMain(pawn, tmpspace, 3)];
		let rolls = [1, 3, 20];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});

	it('should be able to move home, but dont take bonus of 10', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.green);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(1, Color.green);
		let space = new HomeRowSpace(2, Color.green);
		board.setPawnOnSpace(pawn, space);

		let moves = [new MoveHome(pawn, space, 5)];
		let rolls = [5, 10];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});

	it('should be able to move just one die, to not move a blockade together');
	it('should move the furthest along pawn back to home on doublesPenalty');

	it('should be able to make a bonus move upon receiving it');
	it('should not be able to move a blockade together');
	it('should not be able to move a blockade together with bonuses of 20');
	it('should not be able to move a blockade together with bonuses of 10');
	it('should not be able to move a blockade together with doubles (two 3s and two 4s)');
	
  it('should only be call enterpiece on a 5 roll', function() {
		let player = new MFirstPlayer();
		player.startGame(Color.blue);
		let turn = new Turn(player);

		let board = new Board();
		let pawn = new Pawn(0, Color.green);

		let moves = [new EnterPiece(pawn)];
		let rolls = [2, 3];

		(turn.allRollsConsumed(board, moves, rolls)).should.be.true;
	});
});
