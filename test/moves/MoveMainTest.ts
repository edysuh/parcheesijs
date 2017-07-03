import { expect } from 'chai';
import { MoveMain } from '../../src/moves/MoveMain';

describe('MoveMain', function() {
  it('should make a basic move');
	it('should move into homerow');
	it('should move in homerow');
	it('should have the specified pawn on the space');
	it('should bop if theres a different color pawn on the space');
	it('should receive a bonus on bop');
	it('should be able to make a bonus move upon receiving it');
	it('should not bop on a safety');
	it('shold not be able to pass an opponent\'s blockade');
	it('shold not be able to pass your own blockade');
	it('should be able to break a blockade');
	it('should not be able to move a blockade together');
	it('should not be able to move a blockade together with bonuses of 20');
	it('should not be able to move a blockade together with bonuses of 10');
	it('should not be able to move a blockade together with doubles (two 3s and two 4s)');
});
