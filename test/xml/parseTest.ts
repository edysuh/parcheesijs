import { should } from 'chai';
should();

import { parse } from '../../src/xml/parse';
import { Color } from '../../src/definitions';

describe('parse', function() {
	it.skip('should parse xml to obj', function() {
		// tmp: color is its own tag normally
		let x = "<start-game><color>green</color></start-game>";
		(parse(x)).should.deep.equal({'method': 'start-game', 'color': Color.green });
	});
});
