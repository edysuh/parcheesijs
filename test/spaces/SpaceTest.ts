import { should } from 'chai';
should();

import { Color } from '../../src/defs'
import { Pawn } from '../../src/Pawn'
import { Space } from '../../src/spaces/Space';
import { MainSpace } from '../../src/spaces/MainSpace';

describe('Space', function() {
	it('should set a pawn on the space', function() {
		let pawn = new Pawn(3, Color.red);
		let space = new MainSpace(60);
		space.setPawn(pawn);

		(space.pawns).should.include(pawn);
	});
	
	it('should throw an error if there are already 2 pawns on the space', function() {
		let space = new MainSpace(50);
		space.setPawn(new Pawn(0, Color.yellow));
		space.setPawn(new Pawn(1, Color.yellow));
		
		(() => space.setPawn(new Pawn(3, Color.red))).should.throw();
	});
	
	it('should tell us if a pawn bops on this space', function() {
		let space = new MainSpace(40);
		let pawn = new Pawn(3, Color.red);
		space.setPawn(new Pawn(0, Color.yellow));
		
		(space.isBop(pawn)).should.be.true;
	});
	
	it('should bop if there is a different color pawn on the space', function() {
		let space = new MainSpace(30);
		let pawn = new Pawn(3, Color.red);
		let boppedpawn = new Pawn(0, Color.yellow);
		space.setPawn(boppedpawn);
		space.setPawn(pawn);
		
		(space.pawns).should.include(pawn);
		(space.pawns).should.not.include(boppedpawn);
	});
});
