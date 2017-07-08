import { should } from 'chai';
should();

import { Color } from '../../src/definitions'
import { Pawn } from '../../src/Pawn'
import { Space } from '../../src/spaces/Space';
import { SafeSpace } from '../../src/spaces/SafeSpace';

describe('SafeSpace', function() {
	it('should recognize bop attempt for a pawn', function() {
		let safe = new SafeSpace(12);
		safe.setPawn(new Pawn(1, Color.blue));
		
		(safe.isBop(new Pawn(1, Color.red))).should.be.true;
	})

	it('should not be allowed to bop on a SafeSpace', function() {
		let safe = new SafeSpace(17);
		safe.setPawn(new Pawn(1, Color.blue));
		
		(() => safe.setPawn(new Pawn(2, Color.green))).should
			.throw('invalid attempt to bop on a SafeSpace');
	});
})
