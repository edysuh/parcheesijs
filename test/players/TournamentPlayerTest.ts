import { should } from 'chai';
should();

import { TournamentPlayer,
				 getPossibleMovesList } from '../../src/players/TournamentPlayer';
import { Color } from '../../src/definitions';
import { Board } from '../../src/Board';
import { Pawn } from '../../src/Pawn';
import { EnterPiece } from '../../src/moves/EnterPiece';
import { MoveMain } from '../../src/moves/MoveMain';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';

describe('TournamentPlayer', function() {
	it('should get all possible move lists given rolls and pawn/space pairs', function() {
		let board = new Board();
		let p0 = new Pawn(0, Color.blue);
		let p1 = new Pawn(1, Color.blue);
		let p2 = new Pawn(2, Color.blue);
		let p3 = new Pawn(3, Color.blue);
		let s0 = new NestSpace(Color.blue);
		let s1 = new MainSpace(10);
		let s2 = new MainSpace(20);
		let s3 = new MainSpace(30);
		board.setPawnOnSpace(p0, s0);
		board.setPawnOnSpace(p1, s1);
		board.setPawnOnSpace(p2, s2);
		board.setPawnOnSpace(p3, s3);

		let g = getPossibleMovesList([2, 6], [{ pawn: p0, space: s0},
																					{ pawn: p1, space: s1},
																					{ pawn: p2, space: s2},
																					{ pawn: p3, space: s3}]);

		(g).should.deep.equal([ { move: new MoveMain(p1, s1, 2), rolls: [6] },
														{ move: new MoveMain(p1, s1, 6), rolls: [2] },
														{ move: new MoveMain(p2, s2, 2), rolls: [6] },
														{ move: new MoveMain(p2, s2, 6), rolls: [2] },
														{ move: new MoveMain(p3, s3, 2), rolls: [6] },
														{ move: new MoveMain(p3, s3, 6), rolls: [2] }]);
	});


	it('should handle entering a pawn with sum on dice', function() {
		let board = new Board();
		let p0 = new Pawn(0, Color.blue);
		let p1 = new Pawn(1, Color.blue);
		let p2 = new Pawn(2, Color.blue);
		let p3 = new Pawn(3, Color.blue);
		let s0 = new NestSpace(Color.blue);
		let s1 = new NestSpace(Color.blue);
		let s2 = new MainSpace(20);
		let s3 = new MainSpace(30);
		board.setPawnOnSpace(p0, s0);
		board.setPawnOnSpace(p1, s1);
		board.setPawnOnSpace(p2, s2);
		board.setPawnOnSpace(p3, s3);

		let g = getPossibleMovesList([2, 3], [{ pawn: p0, space: s0},
																					{ pawn: p1, space: s1},
																					{ pawn: p2, space: s2},
																					{ pawn: p3, space: s3}]);

		(g).should.deep.equal([ { move: new EnterPiece(p0), rolls: [] },
														{ move: new EnterPiece(p1), rolls: [] },
														{ move: new MoveMain(p2, s2, 2), rolls: [3] },
														{ move: new MoveMain(p2, s2, 3), rolls: [2] },
														{ move: new MoveMain(p3, s3, 2), rolls: [3] },
														{ move: new MoveMain(p3, s3, 3), rolls: [2] }]);
	});
});
