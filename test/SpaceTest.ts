import { should } from 'chai';
should();

import { Bop } from '../src/Bop'
import { Color } from '../src/defs'
import { Pawn } from '../src/Pawn'
import { NestSpace, 
				 MainSpace, 
				 HomeRowSpace, 
				 HomeSpace, 
				 SafeSpace, 
				 ColoredSafeSpace } from '../src/space';

describe('Space', function() {
	describe('abstract Space class: setPawnOnSpace', function() {
		it('should set a pawn on this space', function() {
			let space = new MainSpace(10);
			let pawn = new Pawn(0, Color.green);
			space.setPawnOnSpace(pawn);
			
			(space.pawns).should.include(pawn);
		});
		
		it('should bop if there is a existing pawn of different color', function() {
			let space = new MainSpace(10);
			let pawn = new Pawn(0, Color.green);
			let redpawn = new Pawn(0, Color.red);
			space.setPawnOnSpace(pawn);
			
			// TODO evidence of poor design
			// (space.setPawnOnSpace(redpawn)).should.be.a(Bop);
		});
		
		it('should throw an error if there are already two pawns', function() {
			let space = new MainSpace(10);
			space.setPawnOnSpace(new Pawn(0, Color.green));
			space.setPawnOnSpace(new Pawn(1, Color.green));
			
			// TODO here too
			// (space.setPawnOnSpace(new Pawn(2, Color.green))).should.throw();
		});
	})
	describe('subclass: MainSpace', function() {
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
			
			(next).should.deep.equal(new ColoredSafeSpace(5));
		});
	});
	
	describe('subclass: HomeRowSpace', function() {
		it('should get the next HomeRowSpace', function() {
			let space = new HomeRowSpace(2, Color.green);
			let next = space.getNextSpace(Color.green);
			
			(next).should.deep.equal(new HomeRowSpace(3, Color.green));
		});
		
		it('should enter HomeSpace on the last HomeRowSpace', function() {
			let space = new HomeRowSpace(6, Color.yellow);
			let next = space.getNextSpace(Color.yellow);
			
			(next).should.deep.equal(new HomeSpace());
		});
	});
});
