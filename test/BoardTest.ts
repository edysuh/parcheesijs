import { should } from 'chai';
should();

import { Board, Blockade } from '../src/Board';
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
		space.setPawn(pawn);
		board.setPawnOnSpace(pawn, space);

		(board.getSpaceForPawn(pawn)).should.equal(space);
	});

	it.skip('should throw an error if there are already 2 pawns on the space', function() {
		let board = new Board();
		let space = new MainSpace(50);
		let pawn0 = new Pawn(0, Color.blue);
		let pawn1 = new Pawn(1, Color.blue);
		space.setPawn(pawn0);
		board.setPawnOnSpace(pawn0, space);
		space.setPawn(pawn1);
		board.setPawnOnSpace(pawn1, space);

		(() => board.setPawnOnSpace(new Pawn(2, Color.blue), space))
			.should.throw("invalid attempt to set pawn on blockade");
	});

	it('should set a blockade if there are now two colored pawns on the space', function() {
		let board = new Board();
		let space = new MainSpace(50);
		let pawn0 = new Pawn(0, Color.blue);
		let pawn1 = new Pawn(1, Color.blue);
		space.setPawn(pawn0);
		board.setPawnOnSpace(pawn0, space);
		space.setPawn(pawn1);
		board.setPawnOnSpace(pawn1, space);

		(board.blockades).should
			.deep.include(<Blockade>{'space': space, 'color': Color.blue});
	});

	it.skip('should bop the existing pawn if it is a different color', function() {
		let board = new Board();
		let space = new MainSpace(30);
		let pawn = new Pawn(0, Color.blue);
		let boppedpawn = new Pawn(3, Color.red);
		space.setPawn(boppedpawn);
		board.setPawnOnSpace(boppedpawn, space);
		
		(space.isBop(pawn)).should.be.true;
		
		space.setPawn(pawn);
		board.setPawnOnSpace(pawn, space);

		(board.getPawnsOnSpace(space)).should.include(pawn);
		(board.getPawnsOnSpace(space)).should.not.include(boppedpawn);
	});

	it('should map Spaces to the blockade color', function() {
		let board = new Board();
		let space = new MainSpace(20);
		board.setPawnOnSpace(new Pawn(0, Color.blue), space);
		board.setPawnOnSpace(new Pawn(1, Color.blue), space);

		(board.blockades).should
			.deep.include(<Blockade>({'space': new MainSpace(20), 'color': Color.blue}));
	});

	it('should remove a blockade', function() {
		let board = new Board();
		let space = new MainSpace(30);
		board.setPawnOnSpace(new Pawn(0, Color.blue), space);
		board.setPawnOnSpace(new Pawn(1, Color.blue), space);
		board.removeBlockade(new MainSpace(30));

		/* jshint expr:true */
		(board.blockades).should.be.empty;
	});
});
