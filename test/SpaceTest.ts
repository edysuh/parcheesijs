import { should } from 'chai';
should();

import { NestSpace, 
				 MainSpace, 
				 HomeRowSpace, 
				 HomeSpace, 
				 SafeSpace, 
				 ColoredSafeSpace } from '../src/space';

describe('Space', function() {
	describe('subclass: MainSpace', function() {
		it('should get the next MainSpace', function() {
			let space = new MainSpace(0);
			let next = space.getNextSpace("blue");
			
			(next).should.deep.equal(new MainSpace(1));
		});
		
		it('should complete the main ring', function() {
			let space = new MainSpace(67);
			let next = space.getNextSpace("blue");
			
			(next).should.deep.equal(new MainSpace(0));
		});
		
		it('should turn into the homerow for corresponding pawn color', function() {
			let blueSp = new MainSpace(34);
			let yellowSp = new MainSpace(51);
			let greenSp = new MainSpace(0);
			let redSp = new MainSpace(17);
			
			(blueSp.getNextSpace("blue")).should.deep.equal(new HomeRowSpace(0, "blue"));
			(yellowSp.getNextSpace("yellow")).should.deep.equal(new HomeRowSpace(0, "yellow"));
			(greenSp.getNextSpace("green")).should.deep.equal(new HomeRowSpace(0, "green"));
			(redSp.getNextSpace("red")).should.deep.equal(new HomeRowSpace(0, "red"));
		});
		
		it('should land on a SafeSpace if it is the next space', function() {
			let space = new MainSpace(11);
			let next = space.getNextSpace("blue");
			
			(next).should.deep.equal(new SafeSpace(12));
		});
		
		it('should land on a ColoredSafeSpace if it is the next space', function() {
			let space = new MainSpace(4);
			let next = space.getNextSpace("red");
			
			(next).should.deep.equal(new ColoredSafeSpace(5));
		});
	});
	
	describe('subclass: HomeRowSpace', function() {
		it('should get the next HomeRowSpace', function() {
			let space = new HomeRowSpace(2, "green");
			let next = space.getNextSpace("green");
			
			(next).should.deep.equal(new HomeRowSpace(3, "green"));
		});
		
		it('should enter HomeSpace on the last HomeRowSpace', function() {
			let space = new HomeRowSpace(6, "yellow");
			let next = space.getNextSpace("yellow");
			
			(next).should.deep.equal(new HomeSpace());
		});
	});
});
