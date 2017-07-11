import { should } from 'chai';
should();

import { Color } from '../../src/definitions';
import { Board } from '../../src/Board';
import { Pawn } from '../../src/Pawn';
import { MFirstPlayer, MLastPlayer, getPawnsInFirstOrder } from '../../src/players/MPlayer';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';

describe('MPlayer', function() {
	it('should sort pawns by closest to home', function() {
		let board = new Board();
		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new NestSpace(Color.yellow);
		let space1 = new MainSpace(23);
		let space2 = new HomeRowSpace(3, Color.yellow);
		let space3 = new HomeSpace(Color.yellow);

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		(getPawnsInFirstOrder(board, Color.yellow).map(el => el.pawn))
			.should.deep.equal([ pawn3, pawn2, pawn1, pawn0 ]);
	});

	it('should sort pawns by closest to home', function() {
		let board = new Board();
		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new MainSpace(60)
		let space1 = new MainSpace(0);
		let space2 = new MainSpace(20)
		let space3 = new MainSpace(40)

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		(getPawnsInFirstOrder(board, Color.yellow).map(el => el.pawn))
			.should.deep.equal([ pawn3, pawn2, pawn1, pawn0 ]);
	});

	it('should try moves in order of closest to home first', function() {
		let board = new Board();
		let pawn0 = new Pawn(0, Color.yellow);
		let pawn1 = new Pawn(1, Color.yellow);
		let pawn2 = new Pawn(2, Color.yellow);
		let pawn3 = new Pawn(3, Color.yellow);
		let space0 = new MainSpace(60)
		let space1 = new MainSpace(0);
		let space2 = new MainSpace(20)
		let space3 = new MainSpace(40)

		board.setPawnOnSpace(pawn0, space0);
		board.setPawnOnSpace(pawn1, space1);
		board.setPawnOnSpace(pawn2, space2);
		board.setPawnOnSpace(pawn3, space3);

		let mfpl = new MFirstPlayer();
		mfpl.startGame(Color.yellow);
		
		let ms = mfpl.doMove(board, [2, 5]);
		console.log('ms', ms);
		
	});
});
