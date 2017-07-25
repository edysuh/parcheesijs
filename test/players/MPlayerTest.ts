import { should } from 'chai';
should();

import { Color } from '../../src/definitions';
import { Board } from '../../src/Board';
import { Pawn } from '../../src/Pawn';
import { EnterPiece } from '../../src/moves/EnterPiece';
import { MoveMain } from '../../src/moves/MoveMain';
import { MoveHome } from '../../src/moves/MoveHome';
import { MFirstPlayer,
				 MLastPlayer,
				 getPawnsInFirstOrder,
				 getPawnsInLastOrder,
				 chooseMove } from '../../src/players/MPlayer';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe('MPlayer', function() {
	it('should sort pawns by closest to home, except HomeSpace', function() {
		let board = new Board();
		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new NestSpace(Color.yellow);
		let space1 = new MainSpace(23);
		let space2 = new HomeRowSpace(3, Color.yellow);
		let space3 = new HomeSpace(Color.yellow);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		(getPawnsInFirstOrder(board, Color.yellow).map(el => el.pawn))
			.should.deep.equal([ pawn2, pawn1, pawn0 ]);
	});

	it('should sort pawns by closest to home', function() {
		let board = new Board();
		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new MainSpace(60);
		let space1 = new MainSpace(0);
		let space2 = new MainSpace(20);
		let space3 = new MainSpace(40);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		(getPawnsInFirstOrder(board, Color.yellow).map(el => el.pawn))
			.should.deep.equal([ pawn3, pawn2, pawn1, pawn0 ]);
	});

	it('should try moves in order of closest to home first', function() {
		let board = new Board();
		let mfplayer = new MFirstPlayer();
		mfplayer.startGame(Color.yellow);

		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new MainSpace(67);
		let space1 = new MainSpace(0);
		let space2 = new MainSpace(20);
		let space3 = new MainSpace(40);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		let moves = mfplayer.doMove(board, [2, 5]);

		let tmpspace3 = new MainSpace(42);
		tmpspace3.setPawn(pawn3);

		(moves).should.deep.equal([new MoveMain(pawn3, space3, 2),
															 new MoveMain(pawn3, tmpspace3, 5)]);
	});

	it('should try moves in order of farthest to home first', function() {
		let board = new Board();
		let mlplayer = new MLastPlayer();
		mlplayer.startGame(Color.yellow);

		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new MainSpace(67);
		let space1 = new MainSpace(0);
		let space2 = new MainSpace(20);
		let space3 = new MainSpace(40);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		let moves = mlplayer.doMove(board, [2, 5]);

		(moves).should.deep.equal([new MoveMain(pawn0, space0, 2),
															 new MoveMain(pawn1, space1, 5)]);
	});

	it('should try a different move since there is a blockade', function() {
		let board = new Board();
		let mlplayer = new MLastPlayer();
		mlplayer.startGame(Color.yellow);

		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new MainSpace(0);
		let space1 = new MainSpace(2);
		let space2 = new MainSpace(2);
		let space3 = new MainSpace(10);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		let moves = mlplayer.doMove(board, [4, 5]);

		(moves).should.deep.equal([new MoveMain(pawn2, space1, 4),
															 new MoveMain(pawn0, space0, 5)]);
	});

	it('should try pawns in order of farthest to home, except HomeSpace', function() {
		let board = new Board();
		let mlplayer = new MLastPlayer();
		mlplayer.startGame(Color.yellow);

		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new NestSpace(Color.yellow);
		let space1 = new MainSpace(23);
		let space2 = new HomeRowSpace(3, Color.yellow);
		let space3 = new HomeSpace(Color.yellow);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		let moves = mlplayer.doMove(board, [2, 6]);

		let tmpspace1 = new MainSpace(25);
		tmpspace1.setPawn(pawn1);

		(moves).should.deep.equal([new MoveMain(pawn1, space1, 2),
															 new MoveMain(pawn1, tmpspace1, 6)]);
	});

	it('should try pawns in order of closest to home and execute a bonus', function() {
		let board = new Board();
		let mfplayer = new MFirstPlayer();
		mfplayer.startGame(Color.yellow);

		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new NestSpace(Color.yellow);
		let space1 = new MainSpace(23);
		let space2 = new HomeRowSpace(3, Color.yellow);
		let space3 = new HomeSpace(Color.yellow);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		// let moves = mfplayer.doMove(board, [1, 4]);
		let moves = mfplayer.doMove(board, [4, 1]);

		// what die should be used first? ex. mfirstplayer: rolls[1,4] 
		// but movemain with 1 vs movehome with 4
		// (moves).should.deep.equal([new MoveMain(pawn1, space1, 1),
		// 													 new MoveHome(pawn2, space2, 4)]);

		let tmpspace1 = new MainSpace(24);
		tmpspace1.setPawn(pawn1);

		(moves).should.deep.equal([new MoveHome(pawn2, space2, 4),
															 new MoveMain(pawn1, space1, 1),
															 new MoveMain(pawn1, tmpspace1, 10)]);
	});

	it('should choose an EnterPiece if the given space is the nest', function() {
		let pawn = new Pawn(1, Color.blue);
		let space = new NestSpace(Color.blue);
		let roll = 5;

		(chooseMove({ pawn, space }, roll)).should.deep.equal(new EnterPiece(pawn));
	});

	it('should choose a MoveHome if the roll equals the distance remaining', function() {
		let pawn = new Pawn(1, Color.blue);
		let space = new HomeRowSpace(2, Color.blue);
		let roll = 5;

		(chooseMove({ pawn, space }, roll)).should.deep.equal(new MoveHome(pawn, space, roll));
	});

	// it('should choose no move if the distance remaining is less than the roll', function() {
	// 	let pawn = new Pawn(1, Color.blue);
	// 	let space = new HomeRowSpace(5, Color.blue);
	// 	let roll = 5;

	// 	(chooseMove(pawn, space, roll) === null).should.be.true;
	// });

	it('should choose a MoveMain in all other situations', function() {
		let pawn = new Pawn(1, Color.blue);
		let space = new HomeRowSpace(1, Color.blue);
		let roll = 2;

		(chooseMove({ pawn, space }, roll)).should.deep.equal(new MoveMain(pawn, space, roll));
	});
});
