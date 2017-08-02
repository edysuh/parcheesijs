import { should } from 'chai';
should();

import { parse } from '../../src/xml/parse';

import { Board } from '../../src/Board';
import { Pawn } from '../../src/Pawn';
import { Color } from '../../src/definitions';
import { NestSpace } from '../../src/spaces/NestSpace';
import { MainSpace } from '../../src/spaces/MainSpace';
import { HomeRowSpace } from '../../src/spaces/HomeRowSpace';
import { HomeSpace } from '../../src/spaces/HomeSpace';

describe('parse', function() {
	it('should parse start game', function() {
		let x = "<start-game><color>green</color></start-game>";
		(parse(x)).should.deep.equal({type: 'start-game', color: Color.green });
	});

	it('should parse name', function() {
		let x = "<name>player_name</name>";
		(parse(x)).should.deep.equal({type: 'name', name: 'player_name' });
	});

	it('should parse doubles penalty', function() {
		let x = '<doubles-penalty></doubles-penalty>';
		(parse(x)).should.deep.equal({type: 'doubles-penalty'});
	});

	it('should parse void', function() {
		let x = '<void></void>';
		(parse(x)).should.deep.equal({type: 'void'});
	});

	it('should parse do-move', function() {
		let xml = '<do-move><board><start><pawn><color>blue</color><id>0</id></pawn><pawn><color>blue</color><id>3</id></pawn><pawn><color>yellow</color><id>2</id></pawn><pawn><color>yellow</color><id>3</id></pawn><pawn><color>green</color><id>0</id></pawn><pawn><color>green</color><id>2</id></pawn><pawn><color>green</color><id>3</id></pawn><pawn><color>red</color><id>0</id></pawn><pawn><color>red</color><id>2</id></pawn><pawn><color>red</color><id>3</id></pawn></start><main><piece-loc><pawn><color>blue</color><id>1</id></pawn><loc>10</loc></piece-loc><piece-loc><pawn><color>blue</color><id>2</id></pawn><loc>20</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>0</id></pawn><loc>30</loc></piece-loc><piece-loc><pawn><color>yellow</color><id>1</id></pawn><loc>30</loc></piece-loc></main><home-rows><piece-loc><pawn><color>red</color><id>1</id></pawn><loc>1</loc></piece-loc><piece-loc><pawn><color>green</color><id>1</id></pawn><loc>4</loc></piece-loc></home-rows><home></home></board><dice><die>3</die><die>4</die></dice></do-move>';

		let p = parse(xml);

		let board = new Board();
		board.setPawnOnSpace(new Pawn(1, Color.blue), new MainSpace(10));
		board.setPawnOnSpace(new Pawn(2, Color.blue), new MainSpace(20));
		board.setPawnOnSpace(new Pawn(0, Color.yellow), new MainSpace(30));
		board.setPawnOnSpace(new Pawn(1, Color.yellow), new MainSpace(30));
		board.setPawnOnSpace(new Pawn(1, Color.red), new HomeRowSpace(1, Color.red));
		board.setPawnOnSpace(new Pawn(1, Color.green), new HomeRowSpace(4, Color.green));

		(p).should.deep.equal({ type: 'do-move', board: board, dice: [3, 4] });
	});

	it('should parse moves', function() {
		let xml = '<moves><enter-piece><pawn><color>blue</color><id>0</id></pawn></enter-piece><enter-piece><pawn><color>blue</color><id>1</id></pawn></enter-piece><move-piece-main><pawn><color>green</color><id>1</id></pawn><start>10</start><dist>20</dist></move-piece-main><move-piece-home><pawn><color>yellow</color><id>2</id></pawn><start>2</start><dist>4</dist></move-piece-home></moves>';

		let p = parse(xml);
	});
});
