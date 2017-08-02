import { should } from 'chai';
should();

import { Board } from '../../src/Board';
import { Color } from '../../src/definitions';
import { Pawn } from '../../src/Pawn';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';
import { MoveHome } from '../../src/moves/MoveHome';

describe("MoveHome", function() {
	it('should move a pawn into home, and receive bonus of 10', function() {
		let board = new Board();
		let pawn = new Pawn(1, Color.yellow);
		let space = new HomeRowSpace(3, Color.yellow);
		board.setPawnOnSpace(pawn, space);
		
		let mh = new MoveHome(pawn, space, 4);
		let moveresult = mh.move(board);
		
		(moveresult.board.getSpaceForPawn(pawn).equals(new HomeSpace(Color.yellow)))
			.should.be.true;
		(moveresult.bonus).should.equal(10);
	});

	// it('should throw an error if it doesnt move a pawn into home', function() {
	// 	let board = new Board();
	// 	let pawn = new Pawn(1, Color.yellow);
	// 	let space = new HomeRowSpace(3, Color.yellow);
	// 	board.setPawnOnSpace(pawn, space);
		
	// 	let mh = new MoveHome(pawn, space, 3);
		
	// 	(() => mh.move(board)).should.throw("MoveHome did not move pawn into Home");
	// });
});
