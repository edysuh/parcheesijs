import { expect } from 'chai';
import { Color } from '../src/defs';
import { Board, Blockade } from '../src/board';
import { Pawn } from '../src/pawn';
import { Space, NestSpace, MainSpace, HomeRowSpace, HomeSpace } from '../src/space';

describe('Board', function() {
	describe('member: setPawnOnSpace', function() {
		it('should map a Space to a Pawn', function() {
			let board = new Board();
			board.setPawnOnSpace(new Pawn(1, Color.blue), new MainSpace(1));
			
			expect(board.getSpaceForPawn(new Pawn(1, Color.blue))).to.deep.equal(new MainSpace(1));
		});
		
		it('should throw an error if there are already 2 pawns on the space', function() {
			let board = new Board();
			let space = new MainSpace(50);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);
			board.setPawnOnSpace(new Pawn(1, Color.blue), space);
			
			// TODO expect(board.setPawnOnSpace(new Pawn(2, Color.blue), space)).to.throw();
		});
		
		it('should set a blockade if there are now two colored pawns on the space', function() {
			let board = new Board();
			let space = new MainSpace(50);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);
			board.setPawnOnSpace(new Pawn(1, Color.blue), space);
			
			expect(board.blockades)
				.to.deep.include(<Blockade>({'space': new MainSpace(50), 'color': Color.blue}));
		});
		
		it('should bop the existing pawn if it is a different color');
	});
	
	describe('member: setColoredBlockade', function() {
		it('should map Spaces to the blockade color', function() {
			let board = new Board();
			let space = new MainSpace(20);
			board.setPawnOnSpace(new Pawn(0, Color.blue), space);
			board.setPawnOnSpace(new Pawn(1, Color.blue), space);
			
			expect(board.blockades)
				.to.deep.include(<Blockade>({'space': new MainSpace(20), 'color': Color.blue}));
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
			expect(board.blockades).to.be.empty;
		});
	});
});
