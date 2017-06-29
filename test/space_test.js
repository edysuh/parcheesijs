import { expect } from 'chai';
import { NestSpace, MainSpace, HomeRowSpace, HomeSpace } from '../src/spaceNew';

describe('Space', function() {
	describe('subclass: MainSpace', function() {
		it('should get the next MainSpace', function() {
			let space = new MainSpace(0);
			let next = space.getNextSpace("blue");
			expect(next).to.deep.equal(new MainSpace(1));
		});
		
		it('should complete the main ring', function() {
			let space = new MainSpace(67);
			let next = space.getNextSpace("blue");
			expect(next).to.deep.equal(new MainSpace(0));
		});
		
		it('should turn into the homerow for corresponding pawn color', function() {
			let blueSp = new MainSpace(34);
			let yellowSp = new MainSpace(51);
			let greenSp = new MainSpace(0);
			let redSp = new MainSpace(17);
			expect(blueSp.getNextSpace("blue")).to.deep.equal(new HomeRowSpace(0, "blue"));
			expect(yellowSp.getNextSpace("yellow")).to.deep.equal(new HomeRowSpace(0, "yellow"));
			expect(greenSp.getNextSpace("green")).to.deep.equal(new HomeRowSpace(0, "green"));
			expect(redSp.getNextSpace("red")).to.deep.equal(new HomeRowSpace(0, "red"));
		});
	});
	
	describe('subclass: HomeRowSpace', function() {
		it('should get the next HomeRowSpace', function() {
			let space = new HomeRowSpace(2, "green");
			let next = space.getNextSpace("green");
			expect(next).to.deep.equal(new HomeRowSpace(3, "green"));
		});
		
		it('should enter HomeSpace on the last HomeRowSpace', function() {
			let space = new HomeRowSpace(6, "yellow");
			let next = space.getNextSpace("yellow");
			expect(next).to.deep.equal(new HomeSpace());
		});
	});
});
