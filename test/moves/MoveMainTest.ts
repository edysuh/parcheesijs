import { should } from 'chai';
should();

import { Board } from '../../src/Board';
import { Cheat } from '../../src/Cheat';
import { Color } from '../../src/defs';
import { MoveMain, isMoveResult, MoveResult } from '../../src/moves/MoveMain';
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

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			(ret.board.getSpaceForPawn(pawn)).should.deep.equal(new MainSpace(31));
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
	});

	it('should move into homerow', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new MainSpace(30);
		let dist = 6;
		let mm = new MoveMain(pawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			(ret.board.getSpaceForPawn(pawn)).should.deep.equal(new HomeRowSpace(1, Color.blue));
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
	});

	it('should move inside of homerow', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new HomeRowSpace(1, Color.blue);
		let dist = 5;
		let mm = new MoveMain(pawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			(ret.board.getSpaceForPawn(pawn)).should.deep.equal(new HomeRowSpace(6, Color.blue));
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
	});

	it('should have the specified pawn on the space', function() {
		let pawn = new Pawn(0, Color.blue);
		let wrongpawn = new Pawn(1, Color.blue);
		let space = new MainSpace(1);
		let dist = 4;
		let mm = new MoveMain(wrongpawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(pawn, space);

		(() => mm.move(board)).should.throw("pawn is not on the specified space");
	});

	it('should bop if theres a different color pawn on the space ' +
				'and receive bonus of 10', function() {
		let bluepawn = new Pawn(0, Color.blue);
		let greenpawn = new Pawn(0, Color.yellow);
		let space = new MainSpace(20);
		let landspace = new MainSpace(25);
		let dist = 5;
		let mm = new MoveMain(bluepawn, space, dist);

		let board = new Board();
		board.setPawnOnSpace(bluepawn, space);
		board.setPawnOnSpace(greenpawn, landspace);

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			(ret.bonus).should.equal(10);
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
	});

	// TODO
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

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			console.log('MoveResult');
			('this').should.not.be.ok;
			// (ret).should.be.an.instanceof(MoveResult);
		} else {
			console.log('Cheat');
			(ret).should.throw();
		}
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

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			('this').should.not.be.ok;
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
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

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			('this').should.not.be.ok;
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
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

		let ret = mm.move(board);
		if (isMoveResult(ret)) {
			(ret.board.isBlockade(space)).should.be.false;
		} else {
			(ret).should.be.an.instanceof(Cheat);
		}
	});

	it('should be able to make a bonus move upon receiving it');
	it('should not be able to move a blockade together');
	it('should not be able to move a blockade together with bonuses of 20');
	it('should not be able to move a blockade together with bonuses of 10');
	it('should not be able to move a blockade together with doubles (two 3s and two 4s)');
});
