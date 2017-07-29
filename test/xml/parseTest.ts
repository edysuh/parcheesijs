import { should } from 'chai';
should();

import { parse } from '../../src/xml/parse';
import { Color } from '../../src/definitions';

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
});
