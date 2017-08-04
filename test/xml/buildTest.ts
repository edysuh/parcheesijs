import { should } from 'chai';
should();

import { js2xml, xml2js } from 'xml-js';
import { parse } from '../../src/xml/parse';
import { build } from '../../src/xml/build';
import { Board } from '../../src/Board';
import { Color } from '../../src/definitions';
import { Pawn } from '../../src/Pawn';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { Move } from '../../src/moves/Move';
import { EnterPiece } from '../../src/moves/EnterPiece';
import { MoveMain } from '../../src/moves/MoveMain';
import { MoveHome } from '../../src/moves/MoveHome';

describe('build', function() {
	it('should build a start game', function() {
		(build('start-game', Color.yellow)).should.equal('<start-game>yellow</start-game>');
	});

	it('should be able to parse then build', function() {
		let s = '<start-game>yellow</start-game>';
		let p = parse(s);
		let b = build(p.type, p.color);
		(b).should.equal(s);
	});

	it('should be able to build then parse', function() {
		let o = { type: 'start-game', color: Color.green };
		let b = build(o.type, o.color);
		let p = parse(b);
		(p).should.deep.equal(o);
	});

	it('should build doubles penalty', function() {
		let b = build('doubles-penalty');
		(b).should.equal('<doubles-penalty></doubles-penalty>');
	});

	it('should build void', function() {
		let b = build('void');
		(b).should.equal('<void></void>');
	});

	it('should build a do move', function() {
		let board = new Board();
		board.setPawnOnSpace(new Pawn(1, Color.blue), new MainSpace(10));
		board.setPawnOnSpace(new Pawn(2, Color.blue), new MainSpace(20));
		board.setPawnOnSpace(new Pawn(0, Color.yellow), new MainSpace(30));
		board.setPawnOnSpace(new Pawn(1, Color.yellow), new MainSpace(30));
		board.setPawnOnSpace(new Pawn(1, Color.red), new HomeRowSpace(1, Color.red));
		board.setPawnOnSpace(new Pawn(1, Color.green), new HomeRowSpace(4, Color.green));

		let b = build('do-move', board, [3, 4]);
		(b).should.equal('<do-move><board><start><pawn><color>blue</color><id>0</id></pawn><pawn><color>blue</color><id>3</id></pawn><pawn><color>yellow</color><id>2</id></pawn><pawn><color>yellow</color><id>3</id></pawn><pawn><color>green</color><id>0</id></pawn><pawn><color>green</color><id>2</id></pawn><pawn><color>green</color><id>3</id></pawn><pawn><color>red</color><id>0</id></pawn><pawn><color>red</color><id>2</id></pawn><pawn><color>red</color><id>3</id></pawn></start><main><piece-loc><pawn><color>blue</color><id>1</id></pawn><loc>10</loc></piece-loc><piece-loc><pawn><color>blue</color><id>2</id></pawn><loc>20</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>0</id></pawn><loc>30</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>1</id></pawn><loc>30</loc></piece-loc></main><home-rows><piece-loc><pawn><color>red</color><id>1</id></pawn><loc>1</loc></piece-loc><piece-loc><pawn><color>green</color><id>1</id></pawn><loc>4</loc></piece-loc></home-rows><home></home></board><dice><die>3</die><die>4</die></dice></do-move>');
	});

	it('should build a moves list', function() {
		let moves = [new EnterPiece(new Pawn(0, Color.blue)),
								 new MoveMain(new Pawn(1, Color.green), new MainSpace(10), 20),
								 new MoveHome(new Pawn(2, Color.yellow), new HomeRowSpace(2, Color.yellow), 4)];
		
		(build('moves', moves)).should.equal('<moves><enter-piece><pawn><color>blue</color><id>0</id></pawn></enter-piece><move-piece-main><pawn><color>green</color><id>1</id></pawn><start>10</start><distance>20</distance></move-piece-main><move-piece-home><pawn><color>yellow</color><id>2</id></pawn><start>2</start><distance>4</distance></move-piece-home></moves>')
	});
});
