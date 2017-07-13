import { should } from 'chai';
should();

import { Board } from '../../src/Board';
import { Color } from '../../src/definitions';
import { MoveMain } from '../../src/moves/MoveMain';
import { Pawn } from '../../src/Pawn';
import { Space } from '../../src/spaces/Space';
import { NestSpace } from '../../src/spaces/NestSpace';
import { EnterPiece } from '../../src/moves/EnterPiece';
import { ColoredSafeSpace } from '../../src/spaces/ColoredSafeSpace';

describe("EnterPiece", function() {
  it('should enter a piece only the first space', function() {
		let board = new Board();
		let pawn = new Pawn(3, Color.red);

		let ep = new EnterPiece(pawn);
		let moveresult = ep.move(board);

		(moveresult.board.getSpaceForPawn(pawn).equals(new ColoredSafeSpace(22, Color.red)))
			.should.be.true;
	});

  it('should be able to bop upon entering', function() {
		let board = new Board();
		let pawn = new Pawn(3, Color.red);
		board.setPawnOnSpace(new Pawn(2, Color.blue), new ColoredSafeSpace(22, Color.red));

		let ep = new EnterPiece(pawn);
		let moveresult = ep.move(board);

		(moveresult.board.getSpaceForPawn(pawn).equals(new ColoredSafeSpace(22, Color.red)))
			.should.be.true;
		(moveresult.bonus).should.equal(20);
	});

  it('should not be called if theres a blockade on entry space', function() {
		let board = new Board();
		let pawn = new Pawn(3, Color.yellow);
		board.setPawnOnSpace(new Pawn(1, Color.blue), new ColoredSafeSpace(56, Color.yellow));
		board.setPawnOnSpace(new Pawn(2, Color.blue), new ColoredSafeSpace(56, Color.yellow));

		let ep = new EnterPiece(pawn);
		
		(() => ep.move(board)).should.throw('invalid attempt to set pawn on blockade');
	});
});
