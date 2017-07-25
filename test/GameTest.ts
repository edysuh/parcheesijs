import { should } from 'chai';
should();

import { Game } from '../src/Game';
import { Color } from '../src/definitions';
import { Board } from '../src/Board';
import { Pawn } from '../src/Pawn';
import { MainSpace } from '../src/spaces/MainSpace';
import { HomeRowSpace } from '../src/spaces/HomeRowSpace';
import { Move } from '../src/moves/Move';
import { EnterPiece } from '../src/moves/EnterPiece';
import { MoveMain } from '../src/moves/MoveMain';
import { MoveHome } from '../src/moves/MoveHome';
import { MFirstPlayer, MLastPlayer } from '../src/players/MPlayer';

describe("Game", function() {
	it('should register a player (object version)', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		game.register(p1);
		
		(game.players).should.include(p1);
	});
	
	it('should register a player on connection and send them a color (network version)');
	
	it('should start a game with 4 players', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		let p2 = new MFirstPlayer();
		let p3 = new MLastPlayer();
		let p4 = new MLastPlayer();
		game.register(p1);
		game.register(p2);
		game.register(p3);
		game.register(p4);
		game.start();
	});
		// (p1.color).should.equal(Color.blue);

		// need states:
		// enum game.state { START, DOMOVE, DOUBLEPENALTY }
		// (game.state).should.equal(state.START);
		
	// it('should start multiple games if there are more than 4 players');
	// it('should fill with MPlayers if there are not enough players');
	
	// it('should enforce contracts between the game rules and the player');
	// it('should uphold behavioral contracts');
	// it('should adher to sequencial contracts');
	
	it('should not be able to ignore a die roll', function() {
		let game = new Game();
		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(2);
		let moves = [new EnterPiece(pawn),
								 new MoveMain(pawn, space, 2),
								 new MoveHome(pawn, space, 4)];
		let rolls = [2, 5, 4];

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});

	it('should allow for no move, due to a blockade', function() {
		let game = new Game();
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

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});

	it('should allow for just first die, due to a blockade', function() {
		let game = new Game();
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

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});

	it('should allow for just second die, due to a blockade', function() {
		let game = new Game();
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

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});

	it('should be able to bop, but dont take bonus of 20', function() {
		let game = new Game();
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

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});

	it('should be able to move home, but dont take bonus of 10', function() {
		let game = new Game();
		let board = new Board();
		let pawn = new Pawn(1, Color.green);
		let space = new HomeRowSpace(2, Color.green);
		board.setPawnOnSpace(pawn, space);

		let moves = [new MoveHome(pawn, space, 5)];
		let rolls = [5, 10];

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});

	it('should be able to move just one die, to not move a blockade together');
	it('should move the furthest along pawn back to home on doublesPenalty');

	it('should be able to make a bonus move upon receiving it');
	it('should not be able to move a blockade together');
	it('should not be able to move a blockade together with bonuses of 20');
	it('should not be able to move a blockade together with bonuses of 10');
	it('should not be able to move a blockade together with doubles (two 3s and two 4s)');
	
  it('enterpiece should only be called on a 5 roll', function() {
		let game = new Game();
		let board = new Board();
		let pawn = new Pawn(0, Color.green);

		let moves = [new EnterPiece(pawn)];
		let rolls = [2, 3];

		(game.allRollsConsumed(board, pawn.color, moves, rolls)).should.be.true;
	});
});
