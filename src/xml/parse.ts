import { xml2js } from 'xml-js';

import { Color } from '../../src/definitions';

interface ParseObj {
	[key: string]: any;
	type: string;
	color?: Color;
	name?: string;
}

export function parse(xml: string): ParseObj {
	let obj = xml2js(xml, { 'compact': true });
	let parsed: ParseObj = { type: undefined };
	
	if (obj['start-game']) {
		parsed['type'] = 'start-game';
		parsed['color'] = <Color>obj['start-game'].color._text;

	} else if (obj['name']) {
		parsed['type'] = 'name';
		parsed['name'] = obj['name']._text;

	} else if (obj['do-move']) {
		;

	} else if (obj['moves']) {
		;

	} else if (obj['doubles-penalty']) {
		parsed['type'] = 'doubles-penalty';

	} else if (obj['void']) {
		parsed['type'] = 'void';
	}

	return parsed;
}
