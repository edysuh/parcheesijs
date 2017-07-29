import { js2xml } from 'xml-js';

interface XMLObj {
	'start-game'?: ColorObj;
	'name'?: string;
	'do-move'?: string;
	'moves'?: string;
	'doubles-penalty'?: string;
	'void'?: string;
}

interface ColorObj {
	color: { _text: string };
}

// whitespace?
// export function build(obj: object): string {
// 	return js2xml(obj, { 'compact': true });
// }

export function build(type: string, obj?: object, text?: string): string {
	let build: XMLObj = { };
	switch (type) {
		case 'start-game': 
			if (!text) { throw new Error('no text provided'); }
			build['start-game'] = { 'color': { _text: text } };
		case 'name': 
			break;
		case 'do-move': 
			break;
		case 'moves': 
			break;
		case 'doubles-penalty': 
			break;
		case 'void': 
			break;
	}

	return js2xml(build, { compact: true });
}
