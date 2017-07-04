import { should } from 'chai';
should();

import { Bop } from '../../src/Bop'
import { Color } from '../../src/defs'
import { Pawn } from '../../src/Pawn'
import { Space } from '../../src/spaces/Space';
import { MainSpace } from '../../src/spaces/MainSpace';

describe('Space', function() {
	it('should set a pawn on this space', function() {
		let space = new MainSpace(10);
		let pawn = new Pawn(0, Color.green);
		space.setPawn(pawn);
		
		(space.pawns).should.include(pawn);
	});
	
	it('should bop if there is a existing pawn of different color', function() {
		let space = new MainSpace(10);
		let pawn = new Pawn(0, Color.green);
		let redpawn = new Pawn(0, Color.red);
		space.setPawn(pawn);
		
		(space.setPawn(redpawn)).should.be.an.instanceOf(Bop);
	});
	
	it('should throw an error if there are already two pawns', function() {
		let space = new MainSpace(10);
		space.setPawn(new Pawn(0, Color.green));
		space.setPawn(new Pawn(1, Color.green));
		
		(() => space.setPawn(new Pawn(2, Color.green))).should.throw();
	});
});
