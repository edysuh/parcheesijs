import { should } from 'chai';
should();

import { js2xml, xml2js } from 'xml-js';
import { parse } from '../../src/xml/parse';
import { build } from '../../src/xml/build';
import { Color } from '../../src/definitions';

describe('build', function() {
	it('should build an xml string from an object', function() {
		(build('start-game', Color.yellow)).should.equal('<start-game><color>yellow</color></start-game>');
	});

	it('should be able to parse then build', function() {
		let s = '<start-game><color>yellow</color></start-game>';
		let p = parse(s);
		let b = build(p.type, p.color);
		(b).should.equal(s);
	});

	it('should be able to build then parse', function() {
		let o = {type: 'start-game', color: Color.green };
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

		let obj = { dice : {
				die: [
					{ _text: '1' },
					{ _text: '2' },
					{ _text: '3' }
				]
			}
		}
		let a = js2xml(obj, { compact: true });
		console.log('a___________________________', a);
	});
});
