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
	describe('member: setPawnOnSpace', function() {
		it('should map a Space to a Pawn', function() {
			let board = new Board();
			board.setPawnOnSpace(new Pawn(1, Color.blue), new MainSpace(1));

			(board.getSpaceForPawn(new Pawn(1, Color.blue))).should.deep.equal(new MainSpace(1));
		});

		it('should throw an error if there are already 2 pawns on the space', function() {
			let board = new Board();
			let space = new MainSpace(50);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);
			board.setPawnOnSpace(new Pawn(1, Color.blue), space);

			(() => board.setPawnOnSpace(new Pawn(2, Color.blue), space)).should.throw("invalid attempt to set pawn on blockade");
		});

		it('should set a blockade if there are now two colored pawns on the space', function() {
			let board = new Board();
			let space = new MainSpace(50);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);
			board.setPawnOnSpace(new Pawn(1, Color.blue), space);

			(board.blockades).should
				.deep.include(<Blockade>{'space': new MainSpace(50), 'color': Color.blue});
		});

		it('should bop the existing pawn if it is a different color', function() {
			let board = new Board();
			let space = new MainSpace(60);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);

			(board.setPawnOnSpace(new Pawn(0, Color.red), space)).should.be.an.instanceof(Bop);
		});
	});

	describe('member: removePawnOnSpace', function() {
		it('should remove a pawn on space');
		it('should throw an error if the pawn doesnt exist');
	});

	describe('member: setBlockade', function() {
		it('should map Spaces to the blockade color', function() {
			let board = new Board();
			let space = new MainSpace(20);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);
			board.setPawnOnSpace(new Pawn(1, Color.blue), space);

			(board.blockades).should
				.deep.include(<Blockade>({'space': new MainSpace(20), 'color': Color.blue}));
		});
	});

	describe('member: removeBlockade', function() {
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
});
