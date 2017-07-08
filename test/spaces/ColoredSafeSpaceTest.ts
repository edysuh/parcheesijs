import { should } from 'chai';
should();

import { Color } from '../../src/definitions'
import { Pawn } from '../../src/Pawn'
import { ColoredSafeties } from '../../src/definitions';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe('ColoredSafeSpace', function() {
	it('should classify an arbitrary bop attempt as a bop', function() {
		let greensafe = new ColoredSafeSpace(5, ColoredSafeties.get(5));
		greensafe.setPawn(new Pawn(1, Color.blue));

		(greensafe.isBop(new Pawn(1, Color.red))).should.be.true;
	});

	it('should still recognize bop attempt for a pawn coming out of the Nest', function() {
		let greensafe = new ColoredSafeSpace(5, ColoredSafeties.get(5));
		greensafe.setPawn(new Pawn(1, Color.blue));

		(greensafe.isBop(new Pawn(0, Color.green))).should.be.true;
	});

	it('should not be allowed to bop on a SafeSpace', function() {
		let redsafe = new ColoredSafeSpace(22, ColoredSafeties.get(22));
		redsafe.setPawn(new Pawn(1, Color.blue));

		(() => redsafe.setPawn(new Pawn(2, Color.green))).should
			.throw('invalid attempt to bop on a SafeSpace');
	});
	
	it('should allow a bop from a pawn coming out of the Nest', function() {
		let space = new ColoredSafeSpace(22, ColoredSafeties.get(22));
		let pawn = new Pawn(3, ColoredSafeties.get(22));
		let boppedpawn = new Pawn(0, Color.yellow);
		space.setPawn(boppedpawn);
		space.setPawn(pawn);
		
		(space.pawns).should.include(pawn);
		(space.pawns).should.not.include(boppedpawn);
	});
})
