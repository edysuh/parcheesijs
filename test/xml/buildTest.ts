import { should } from 'chai';
should();

import { js2xml, xml2js } from 'xml-js';
import { parse } from '../../src/xml/parse';
import { build } from '../../src/xml/build';
import { Color } from '../../src/definitions';

describe('build', function() {
	it('should build an xml string from an object', function() {
		let obj = 
			{ 'start-game': {
				'color': { 
					_text: 'yellow' 
				} 
			}
		};
		(build(obj)).should.equal('<start-game><color>yellow</color></start-game>');
	});

	it('should build an xml string from an object', function() {
		let s = '<start-game><color>yellow</color></start-game>';
		let p = parse(s);
		console.log('p', p);
		let o = xml2js(s, { 'compact': true });
		console.log('o', o);
		let b = build(o);
		console.log('b', b);
	});
});
