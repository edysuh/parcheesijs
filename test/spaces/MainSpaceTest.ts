import { should } from 'chai';
should();

import { Color } from '../../src/definitions'
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { SafeSpace } from '../../src/spaces/SafeSpace';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe('MainSpace', function() {
	it('should get the next MainSpace', function() {
		let space = new MainSpace(0);
		let next = space.getNextSpace(Color.blue);
		
		(next).should.deep.equal(new MainSpace(1));
	});
	
	it('should complete the main ring', function() {
		let space = new MainSpace(67);
		let next = space.getNextSpace(Color.blue);
		
		(next).should.deep.equal(new MainSpace(0));
	});
	
	it('should turn into the homerow for corresponding pawn color', function() {
		let blueSp = new MainSpace(34);
		let yellowSp = new MainSpace(51);
		let greenSp = new MainSpace(0);
		let redSp = new MainSpace(17);
		
		(blueSp.getNextSpace(Color.blue))
			.should.deep.equal(new HomeRowSpace(0, Color.blue));
		(yellowSp.getNextSpace(Color.yellow))
			.should.deep.equal(new HomeRowSpace(0, Color.yellow));
		(greenSp.getNextSpace(Color.green))
			.should.deep.equal(new HomeRowSpace(0, Color.green));
		(redSp.getNextSpace(Color.red))
			.should.deep.equal(new HomeRowSpace(0, Color.red));
	});
	
	it('should land on a SafeSpace if it is the next space', function() {
		let space = new MainSpace(11);
		let next = space.getNextSpace(Color.blue);
		
		(next).should.deep.equal(new SafeSpace(12));
	});
	
	it('should land on a ColoredSafeSpace if it is the next space', function() {
		let space = new MainSpace(4);
		let next = space.getNextSpace(Color.red);
		
		(next).should.deep.equal(new ColoredSafeSpace(5, Color.green));
	});
});
