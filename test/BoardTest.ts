import { should } from 'chai';
should();

import { Board } from '../src/Board';
import { Bop } from '../src/Bop'
import { Color } from '../src/definitions';
import { Pawn } from '../src/Pawn';
import { Space } from '../src/spaces/Space';
import { NestSpace } from '../src/spaces/NestSpace';
import { MainSpace } from '../src/spaces/MainSpace';
import { HomeSpace } from '../src/spaces/HomeSpace';
import { HomeRowSpace } from '../src/spaces/HomeRowSpace';

describe('Board', function() {
	it('should map a Space to a Pawn', function() {
		let board = new Board();
		let pawn = new Pawn(1, Color.blue);
		let space = new MainSpace(1);
		board.setPawnOnSpace(pawn, space);
		
		(board.getSpaceForPawn(pawn)).should.equal(space);
	});

	it('should throw an error if there are already 2 pawns on the space', function() {
		let board = new Board();
		let space = new MainSpace(50);
		let pawn0 = new Pawn(0, Color.blue);
		let pawn1 = new Pawn(1, Color.blue);
		board.setPawnOnSpace(pawn0, space);
		board.setPawnOnSpace(pawn1, space);

		(() => board.setPawnOnSpace(new Pawn(2, Color.blue), space))
			.should.throw("invalid attempt to set pawn on blockade");
	});

	it('should set a blockade if there are now two colored pawns on the space', function() {
		let board = new Board();
		let space = new MainSpace(40);
		let pawn0 = new Pawn(0, Color.green);
		let pawn1 = new Pawn(1, Color.green);
		board.setPawnOnSpace(pawn0, space);
		board.setPawnOnSpace(pawn1, space);

		(space.isBlockade()).should.be.true;
	});

	it('should bop the existing pawn if it is a different color', function() {
		let board = new Board();
		let space = new MainSpace(30);
		let pawn = new Pawn(0, Color.blue);
		let boppedpawn = new Pawn(3, Color.red);
		board.setPawnOnSpace(boppedpawn, space);
		
		(space.isBop(pawn)).should.be.true;
		
		board.setPawnOnSpace(pawn, space);

		(space.pawns).should.include(pawn);
		(space.pawns).should.not.include(boppedpawn);
	});
	
	it('should remove a space from the board if there are no pawns left', function() {
		let board = new Board();
		let space = new MainSpace(15);
		let newspace = new MainSpace(25);
		let pawn = new Pawn(1, Color.yellow);
		board.setPawnOnSpace(pawn, space);
		board.setPawnOnSpace(pawn, newspace);
		
		(board.spaces).should.not.include(space);
		(board.spaces).should.include(newspace);
	});
});
