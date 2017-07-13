import { should } from 'chai';
should();

import { Board } from '../../src/Board';
import { Color } from '../../src/definitions';
import { MoveMain } from '../../src/moves/MoveMain';
import { Pawn } from '../../src/Pawn';
import { Space } from '../../src/spaces/Space';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { SafeSpace } from '../../src/spaces/SafeSpace';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe('MoveMain', function() {
  it('should make a basic move', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new MainSpace(25);
		let dist = 6;
		let mm = new MoveMain(pawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);
		
		let moveresult = mm.move(board);
		(moveresult.board.getSpaceForPawn(pawn).equals(new MainSpace(31))).should.be.true;
	});

	it('should move into homerow', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new MainSpace(30);
		let dist = 6;
		let mm = new MoveMain(pawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);
		
		let moveresult = mm.move(board);
		(moveresult.board.getSpaceForPawn(pawn).equals(new HomeRowSpace(1, Color.blue)))
			.should.be.true;
	});

	it('should move inside of homerow', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new HomeRowSpace(1, Color.blue);
		let dist = 5;
		let mm = new MoveMain(pawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);

		let moveresult = mm.move(board);
		(moveresult.board.getSpaceForPawn(pawn).equals(new HomeRowSpace(6, Color.blue)))
			.should.be.true;
	});

	it('should have the specified pawn on the specified space', function() {
		let pawn = new Pawn(0, Color.blue);
		let wrongpawn = new Pawn(1, Color.blue);
		let space = new MainSpace(1);
		let dist = 4;
		let mm = new MoveMain(wrongpawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);

		(() => mm.move(board)).should.throw("specified pawn is not on the specified space");
	});

	it('should bop if theres a different color pawn on the space ' +
				'and receive bonus of 20', function() {
		let bluepawn = new Pawn(0, Color.blue);
		let greenpawn = new Pawn(0, Color.green);
		let space = new MainSpace(20);
		let dist = 5;
		let mm = new MoveMain(bluepawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(bluepawn, space);
		board.setPawnOnSpace(greenpawn, new MainSpace(25));

		let moveresult = mm.move(board);
		(moveresult.bonus).should.equal(20);
	});

	it('should not bop on a safety', function() {
		let bluepawn = new Pawn(0, Color.blue);
		let greenpawn = new Pawn(0, Color.yellow);
		let space = new MainSpace(62);
		let safespace = new SafeSpace(63);
		let dist = 1;
		let mm = new MoveMain(bluepawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(bluepawn, space);
		board.setPawnOnSpace(greenpawn, safespace);

		(() => mm.move(board)).should.throw('invalid attempt to bop on a SafeSpace');
	});

	it('shold not be able to pass an opponents blockade', function() {
		let pawn0 = new Pawn(0, Color.blue);
		let pawn1 = new Pawn(1, Color.blue);
		let mypawn = new Pawn(0, Color.yellow);
		let space = new MainSpace(25);
		let blockspace = new MainSpace(28);
		let dist = 6;
		let mm = new MoveMain(mypawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(mypawn, space);
		board.setPawnOnSpace(pawn0, blockspace);
		board.setPawnOnSpace(pawn1, blockspace);

		(() => mm.move(board)).should.throw("tried to make a move past a blockade");
	});

	it('shold not be able to pass your own blockade', function() {
		let pawn0 = new Pawn(0, Color.blue);
		let pawn1 = new Pawn(1, Color.blue);
		let pawn2 = new Pawn(2, Color.blue);
		let space = new MainSpace(35);
		let blockspace = new MainSpace(38);
		let dist = 6;
		let mm = new MoveMain(pawn2, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn2, space);
		board.setPawnOnSpace(pawn0, blockspace);
		board.setPawnOnSpace(pawn1, blockspace);

		(() => mm.move(board)).should.throw("tried to make a move past a blockade");
	});

	it('should break a blockade after a move', function() {
		let pawn0 = new Pawn(0, Color.blue);
		let pawn1 = new Pawn(1, Color.blue);
		let space = new MainSpace(51);
		let dist = 1;
		let mm = new MoveMain(pawn0, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn0, space);
		board.setPawnOnSpace(pawn1, space);

		let moveresult = mm.move(board);
		(moveresult.board.isBlockade(space)).should.be.false;
	});
});
