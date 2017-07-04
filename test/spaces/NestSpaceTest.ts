import { should } from 'chai';
should();

import { Color } from '../../src/defs'
import { NestSpace } from '../../src/spaces/NestSpace';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe('NestSpace', function() {
	it('should give the corresponding ColoredSafeSpace on getNextSpace', function() {
		let blueNest = new NestSpace(Color.blue);
		let yellowNest = new NestSpace(Color.yellow);
		let greenNest = new NestSpace(Color.green);
		let redNest = new NestSpace(Color.red);
		
		(blueNest.getNextSpace(Color.blue))
			.should.deep.equal(new ColoredSafeSpace(39));
		(yellowNest.getNextSpace(Color.yellow))
			.should.deep.equal(new ColoredSafeSpace(56));
		(greenNest.getNextSpace(Color.green))
			.should.deep.equal(new ColoredSafeSpace(5));
		(redNest.getNextSpace(Color.red))
			.should.deep.equal(new ColoredSafeSpace(22));
	});
})
