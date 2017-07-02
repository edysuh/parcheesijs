import { expect } from 'chai';
import { Color } from '../src/defs';
import { Board } from '../src/board';
import { Pawn } from '../src/pawn';
import { Space, NestSpace, MainSpace, HomeRowSpace, HomeSpace } from '../src/space';

describe('Board', function() {
	describe('member: setPawnOnSpace', function() {
		it('should map a Space to a Pawn', function() {
			let board = new Board();
			board.setPawnOnSpace(new Pawn(1, Color.blue), new MainSpace(1));
			
			expect(board.getSpaceForPawn(new Pawn(1, Color.blue))).to.deep.equal(new MainSpace(1));
		});
	});
	
	describe('member: setColoredBlockade', function() {
		it('should map Spaces to the blockade color', function() {
			let board = new Board();
			board.setColoredBlockade(new MainSpace(20), Color.blue);
			
			expect(board.blockades).to.deep.include({'space': new MainSpace(20), 'color': Color.blue});
		});
	});
	
	describe('member: removeBlockade', function() {
		it('should remove a blockade', function() {
			let board = new Board();
			board.setColoredBlockade(new MainSpace(30), Color.blue);
			board.removeBlockade(new MainSpace(30));

			/* jshint expr:true */
			expect(board.blockades).to.be.empty;
		});
	});
});
