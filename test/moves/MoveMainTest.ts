import { should } from 'chai';
should();

import { Board } from '../../src/Board';
import { Color } from '../../src/defs';
import { MoveMain } from '../../src/moves/MoveMain';
import { Pawn } from '../../src/Pawn';
import { Space } from '../../src/spaces/Space';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { SafeSpace } from '../../src/spaces/SafeSpace';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe('MoveMain', function() {
  it.skip('should make a basic move', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new MainSpace(25);
		let dist = 6;
		let mm = new MoveMain(pawn, space, dist);
		
		let board = new Board();
		board.setPawnOnSpace(pawn, space);
		
		(mm.move(board).board.getSpaceForPawn(pawn)).should.deep.equal(new MainSpace(31));
	});
	
	it.skip('should move into homerow', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new MainSpace(30);
		let dist = 6;
		let mm = new MoveMain(pawn, space, dist);
		
		let board = new Board();
		board.setPawnOnSpace(pawn, space);
		
		(mm.move(board).board.getSpaceForPawn(pawn))
			.should.deep.equal(new HomeRowSpace(1, Color.blue));
	});
	
	it.skip('should move inside of homerow', function() {
		let pawn = new Pawn(0, Color.blue);
		let space = new HomeRowSpace(1, Color.blue);
		let dist = 5;
		let mm = new MoveMain(pawn, space, dist);
		
		let board = new Board();
		board.setPawnOnSpace(pawn, space);
		
		(mm.move(board).board.getSpaceForPawn(pawn))
			.should.deep.equal(new HomeRowSpace(6, Color.blue));
	});
	
	it('should have the specified pawn on the space');
	
	it('should bop if theres a different color pawn on the space');
	
	it('should receive a bonus on bop');
	
	it('should be able to make a bonus move upon receiving it');
	
	it('should not bop on a safety');
	
	it('shold not be able to pass an opponents blockade');
	
	it('shold not be able to pass your own blockade');
	
	it('should be able to break a blockade');
	
	it('should not be able to move a blockade together');
	
	it('should not be able to move a blockade together with bonuses of 20');
	
	it('should not be able to move a blockade together with bonuses of 10');
	
	it('should not be able to move a blockade together with doubles (two 3s and two 4s)');
});
