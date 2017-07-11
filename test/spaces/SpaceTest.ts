import { should } from 'chai';
should();

import { Color } from '../../src/definitions'
import { Pawn } from '../../src/Pawn'
import { Space } from '../../src/spaces/Space';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { NestSpace } from '../../src/spaces/NestSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';

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
		
		(() => space.setPawn(new Pawn(3, Color.red))).should
			.throw('invalid attempt to set pawn on blockade');
	});
	
	it('should remove a pawn', function() {
		let space = new MainSpace(20);
		space.setPawn(new Pawn(3, Color.green));
		space.removePawn(new Pawn(3, Color.green));
		
		(space.pawns).should.be.empty;
	});
	
	it('should throw an error if the given pawn wasnt found', function() {
		let space = new MainSpace(20);
		space.setPawn(new Pawn(3, Color.green));
		
		(() => { space.removePawn(new Pawn(2, Color.green)) })
			.should.throw('could not the given pawn or found too many');
	})
	
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
	
	it('should pass an equality test', function() {
		let space1 = new MainSpace(5);
		let space2 = new MainSpace(5);
		space2.setPawn(new Pawn(1, Color.yellow));
		
		(space1.equals(space2)).should.be.true;
	});
	
	it('should pass an equality test', function() {
		let nest1 = new NestSpace(Color.blue);
		let nest2 = new NestSpace(Color.blue);
		let home1 = new HomeSpace(Color.blue);
		let home2 = new HomeSpace(Color.blue);
		
		(nest1.equals(nest2)).should.be.true;
	});
	
	it('should fail an equality test', function() {
		let space1 = new MainSpace(5);
		let space2 = new HomeRowSpace(5, Color.yellow);
		
		(space1.equals(space2)).should.be.false;
	});
	
	it('should fail an equality test', function() {
		let space1 = new HomeRowSpace(5, Color.yellow);
		let space2 = new HomeSpace(Color.yellow);
		
		(space1.equals(space2)).should.be.false;
	});
});
