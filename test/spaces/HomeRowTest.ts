import { should } from 'chai';
should();

import { Color } from '../../src/definitions'
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';

describe('HomeRowSpace', function() {
	it('should get the next HomeRowSpace', function() {
		let space = new HomeRowSpace(2, Color.green);
		let next = space.getNextSpace(Color.green);
		
		(next).should.deep.equal(new HomeRowSpace(3, Color.green));
	});
	
	it('should enter HomeSpace on the last HomeRowSpace', function() {
		let space = new HomeRowSpace(6, Color.yellow);
		let next = space.getNextSpace(Color.yellow);
		
		(next).should.deep.equal(new HomeSpace(Color.yellow));
	});
	
	it('should calculate the remaining distance', function() {
		((new HomeRowSpace(0, Color.green)).distanceFromHome(Color.green)).should.equal(7);
		((new HomeRowSpace(3, Color.green)).distanceFromHome(Color.green)).should.equal(4);
		((new HomeRowSpace(5, Color.green)).distanceFromHome(Color.green)).should.equal(2);
		((new HomeRowSpace(6, Color.green)).distanceFromHome(Color.green)).should.equal(1);
	});
});
