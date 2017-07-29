import { xml2js } from 'xml-js';

import { Color } from '../../src/definitions';

// interface xmlObj {
// 	method: string;
// 	color?: Color;
// }

interface ParseObj {
	'start-game'?: string;
	'name'?: string;
	'do-move'?: string;
	'moves'?: string;
	'doubles-penalty'?: string;
	'void'?: string;
}

export function parse(xml: string): ParseObj {
	return xml2js(xml, { 'compact': true });
}

// get the parameters for each player method in the xml message
// export function parse(xml: string): xmlObj {
// 	let obj = xml2js(xml, { 'compact': true });

// 	if (obj['start-game']) {
// 		return parseStartGame(obj);
// 	} else if (obj['name']) {
// 		;
// 	} else if (obj['do-move']) {
// 		;
// 	} else if (obj['moves']) {
// 		;
// 	} else if (obj['doubles-penalty']) {
// 		;
// 	} else if (obj['void']) {
// 		;
// 	}
// }

function parseColor(obj: any) { }

function parseStartGame(obj: any): { 'method': string, 'color': Color } {
	return { 'method': 'start-game', 'color': <Color>obj['start-game'].color._text };
}
