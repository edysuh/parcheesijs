import { should } from 'chai';
should();

import { cloneDeep } from 'lodash';
import { TournamentPlayer,
				 getPossibleMovesList,
				 tryMoves,
				 buildMoveLists } from '../../src/players/TournamentPlayer';
import { Color } from '../../src/definitions';
import { Board } from '../../src/Board';
import { Pawn } from '../../src/Pawn';
import { EnterPiece } from '../../src/moves/EnterPiece';
import { MoveMain } from '../../src/moves/MoveMain';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';
import { parse } from '../../src/xml/parse';
import { build } from '../../src/xml/build';

describe('TournamentPlayer', function() {
	it('should get all possible move lists given rolls and pawn/space pairs', function() {
		let p0 = new Pawn(0, Color.blue);
		let p1 = new Pawn(1, Color.blue);
		let p2 = new Pawn(2, Color.blue);
		let p3 = new Pawn(3, Color.blue);
		let s0 = new NestSpace(Color.blue);
		let s1 = new MainSpace(10);
		let s2 = new MainSpace(20);
		let s3 = new MainSpace(30);

		let g = getPossibleMovesList([2, 6], [{ pawn: p0, space: s0},
																					{ pawn: p1, space: s1},
																					{ pawn: p2, space: s2},
																					{ pawn: p3, space: s3}]);

		(g).should.deep.equal([ { move: new MoveMain(p1, s1, 2), rem: [6] },
														{ move: new MoveMain(p1, s1, 6), rem: [2] },
														{ move: new MoveMain(p2, s2, 2), rem: [6] },
														{ move: new MoveMain(p2, s2, 6), rem: [2] },
														{ move: new MoveMain(p3, s3, 2), rem: [6] },
														{ move: new MoveMain(p3, s3, 6), rem: [2] }]);
	});


	it('should handle entering a pawn with sum on dice', function() {
		let p0 = new Pawn(0, Color.blue);
		let p1 = new Pawn(1, Color.blue);
		let p2 = new Pawn(2, Color.blue);
		let p3 = new Pawn(3, Color.blue);
		let s0 = new NestSpace(Color.blue);
		let s1 = new NestSpace(Color.blue);
		let s2 = new MainSpace(20);
		let s3 = new MainSpace(30);

		let g = getPossibleMovesList([2, 3], [{ pawn: p0, space: s0},
																					{ pawn: p1, space: s1},
																					{ pawn: p2, space: s2},
																					{ pawn: p3, space: s3}]);

		(g).should.deep.equal([ { move: new EnterPiece(p0), rem: [] },
														{ move: new EnterPiece(p1), rem: [] },
														{ move: new MoveMain(p2, s2, 2), rem: [3] },
														{ move: new MoveMain(p2, s2, 3), rem: [2] },
														{ move: new MoveMain(p3, s3, 2), rem: [3] },
														{ move: new MoveMain(p3, s3, 3), rem: [2] }]);
	});

	it('should try each possible move', function() {
		let board = new Board();
		let p0 = new Pawn(0, Color.green);
		let p1 = new Pawn(1, Color.green);
		let p2 = new Pawn(2, Color.green);
		let p3 = new Pawn(3, Color.green);
		let s0 = new NestSpace(Color.green);
		let s1 = new NestSpace(Color.green);
		let s2 = new MainSpace(20);
		let s3 = new MainSpace(30);
		board.setPawnOnSpace(p0, s0);
		board.setPawnOnSpace(p1, s1);
		board.setPawnOnSpace(p2, s2);
		board.setPawnOnSpace(p3, s3);
		board.setPawnOnSpace(new Pawn(0, Color.yellow), new MainSpace(31));
		board.setPawnOnSpace(new Pawn(1, Color.yellow), new MainSpace(31));

		let rolls = [2, 5];
		let pairs = board.getPlayerPawns(Color.green);
		let poss = getPossibleMovesList(rolls, pairs);

		let m0 = new EnterPiece(p0);
		let m1 = new EnterPiece(p1);
		let m2 = new MoveMain(p2, s2, 2);
		let m3 = new MoveMain(p2, s2, 5);
		let b0 = m0.move(board).board;
		let b1 = m1.move(board).board;
		let b2 = m2.move(board).board;
		let b3 = m3.move(board).board;

		(tryMoves(board, board, poss, Color.green)).should.deep.equal([
			{ board: b0, move: m0, rem: [2] },
			{ board: b1, move: m1, rem: [2] },
			{ board: b2, move: m2, rem: [5] },
			{ board: b3, move: m3, rem: [2] },
		]);
	});

	it('should get a bonus if after trying move', function() {
		let board = new Board();
		let p0 = new Pawn(0, Color.green);
		let p1 = new Pawn(1, Color.green);
		let p2 = new Pawn(2, Color.green);
		let p3 = new Pawn(3, Color.green);
		let s0 = new NestSpace(Color.green);
		let s1 = new NestSpace(Color.green);
		let s2 = new MainSpace(20);
		let s3 = new MainSpace(30);
		board.setPawnOnSpace(p0, s0);
		board.setPawnOnSpace(p1, s1);
		board.setPawnOnSpace(p2, s2);
		board.setPawnOnSpace(p3, s3);
		board.setPawnOnSpace(new Pawn(0, Color.yellow), new MainSpace(22));
		board.setPawnOnSpace(new Pawn(1, Color.yellow), new MainSpace(35));

		let rolls = [2, 5];
		let pairs = board.getPlayerPawns(Color.green);
		let poss = getPossibleMovesList(rolls, pairs);

		let m0 = new EnterPiece(p0);
		let m1 = new EnterPiece(p1);
		let m2 = new MoveMain(p2, s2, 2);
		let m3 = new MoveMain(p2, s2, 5);
		let m4 = new MoveMain(p3, s3, 2);
		let m5 = new MoveMain(p3, s3, 5);
		let b0 = m0.move(board).board;
		let b1 = m1.move(board).board;
		let b2 = m2.move(board).board;
		let b3 = m3.move(board).board;
		let b4 = m4.move(board).board;
		let b5 = m5.move(board).board;

		(tryMoves(board, board, poss, Color.green)).should.deep.equal([
			{ board: b0, move: m0, rem: [2] },
			{ board: b1, move: m1, rem: [2] },
			{ board: b2, move: m2, rem: [5, 20] },
			{ board: b3, move: m3, rem: [2] },
			{ board: b4, move: m4, rem: [5] },
			{ board: b5, move: m5, rem: [2, 20] },
		]);
	});

	it('should not move a blockade together', function() {
		let board = new Board();
		let p0 = new Pawn(0, Color.red);
		let p1 = new Pawn(1, Color.red);
		let sp = new MainSpace(45);
		board.setPawnOnSpace(p0, sp);
		board.setPawnOnSpace(p1, sp);

		let tmpboard = cloneDeep(board);
		let tmpsp = new MainSpace(49);
		tmpboard.setPawnOnSpace(p0, tmpsp);

		let rolls = [4];
		let pairs = tmpboard.getPlayerPawns(Color.red);
		let poss = getPossibleMovesList(rolls, pairs);
		let t = tryMoves(board, tmpboard, poss, Color.red);

		let finalboard = cloneDeep(tmpboard);
		finalboard.setPawnOnSpace(p0, new MainSpace(53));

		(t).should.deep.equal([
			{ board: finalboard, move: new MoveMain(p0, tmpsp, 4), rem: [] }
		]);
	});


	it('should build all possible move lists', function() {
		let board = new Board();
		let p0 = new Pawn(0, Color.yellow);
		let s0 = new MainSpace(20);
		board.setPawnOnSpace(p0, s0);

		let rolls = [3, 4];
		let build = buildMoveLists(board, { board: board, moves: []}, rolls, Color.yellow, []);

		let t3 = new MainSpace(23);
		t3.setPawn(p0);
		let t4 = new MainSpace(24);
		t4.setPawn(p0);
		let m03 = new MoveMain(p0, s0, 3);
		let m04 = new MoveMain(p0, t3, 4);
		let m14 = new MoveMain(p0, s0, 4);
		let m13 = new MoveMain(p0, t4, 3);
		let tmpb34 = m03.move(board).board;
		let board34 = m04.move(tmpb34).board;
		let tmpb43 = m14.move(board).board;
		let board43 = m13.move(tmpb43).board;

		(build).should.deep.equal([
			{ board: board34, moves: [m03, m04]},
			{ board: board43, moves: [m14, m13]}
		]);
	});

	it('should doMove', function() {
		let tp = new TournamentPlayer();
		tp.startGame(Color.blue);
		let board = new Board();
		let p0 = new Pawn(0, Color.blue);
		let sp = new MainSpace(10);
		board.setPawnOnSpace(p0, sp);
		
		// let m = tp.doMove(board, [2, 6]);
		// (m).should.equal();
	});

	it('should handle a unique board state', function() {
		let xml = '<do-move><board><start></start><main><piece-loc><pawn><color>yellow</color><id>3</id></pawn><loc>63</loc></piece-loc><piece-loc><pawn><color>red</color><id>3</id></pawn><loc>60</loc></piece-loc><piece-loc><pawn><color>red</color><id>0</id></pawn><loc>58</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>1</id></pawn><loc>56</loc></piece-loc><piece-loc><pawn><color>red</color><id>2</id></pawn><loc>55</loc></piece-loc><piece-loc><pawn><color>red</color><id>1</id></pawn><loc>54</loc></piece-loc><piece-loc><pawn><color>blue</color><id>2</id></pawn><loc>53</loc></piece-loc><piece-loc><pawn><color>blue</color><id>1</id></pawn><loc>53</loc></piece-loc><piece-loc><pawn><color>blue</color><id>3</id></pawn><loc>43</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>0</id></pawn><loc>38</loc></piece-loc><piece-loc><pawn><color>green</color><id>3</id></pawn><loc>25</loc></piece-loc><piece-loc><pawn><color>green</color><id>0</id></pawn><loc>14</loc></piece-loc><piece-loc><pawn><color>green</color><id>1</id></pawn><loc>11</loc></piece-loc><piece-loc><pawn><color>green</color><id>2</id></pawn><loc>5</loc></piece-loc></main><home-rows></home-rows><home><pawn><color>yellow</color><id>2</id></pawn><pawn><color>blue</color><id>0</id></pawn></home></board><dice><die>2</die><die>2</die><die>5</die><die>5</die></dice></do-move>';

		let tp = new TournamentPlayer();
		tp.startGame(Color.blue);
		
		let parsed = parse(xml);
		let moves = tp.doMove(parsed.board, parsed.dice);

		(moves.length).should.be.at.least(4);
	});

	it('should handle a unique board state', function() {
		let xml = '<do-move><board><start><pawn><color>red</color><id>3</id></pawn></start><main><piece-loc><pawn><color>yellow</color><id>2</id></pawn><loc>59</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>0</id></pawn><loc>57</loc></piece-loc><piece-loc><pawn><color>blue</color><id>1</id></pawn><loc>55</loc></piece-loc><piece-loc><pawn><color>blue</color><id>0</id></pawn><loc>55</loc></piece-loc><piece-loc><pawn><color>blue</color><id>2</id></pawn><loc>54</loc></piece-loc><piece-loc><pawn><color>red</color><id>1</id></pawn><loc>52</loc></piece-loc><piece-loc><pawn><color>red</color><id>0</id></pawn><loc>51</loc></piece-loc><piece-loc><pawn><color>red</color><id>2</id></pawn><loc>49</loc></piece-loc><piece-loc><pawn><color>blue</color><id>3</id></pawn><loc>42</loc></piece-loc><piece-loc><pawn><color>green</color><id>3</id></pawn><loc>24</loc></piece-loc><piece-loc><pawn><color>green</color><id>1</id></pawn><loc>19</loc></piece-loc><piece-loc><pawn><color>green</color><id>2</id></pawn><loc>8</loc></piece-loc><piece-loc><pawn><color>green</color><id>0</id></pawn><loc>6</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>3</id></pawn><loc>3</loc></piece-loc></main><home-rows></home-rows><home><pawn><color>yellow</color><id>1</id></pawn></home></board><dice><die>5</die><die>5</die><die>2</die><die>2</die></dice></do-move>';

		let tp = new TournamentPlayer();
		tp.startGame(Color.blue);
		
		let parsed = parse(xml);
		let moves = tp.doMove(parsed.board, parsed.dice);

		(moves.length).should.be.at.least(4);
	});
});
