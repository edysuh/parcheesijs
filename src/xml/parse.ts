import { xml2js } from 'xml-js';

import { BoardObj } from './build';

import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Color } from '../definitions';
import { NestSpace } from '../spaces/NestSpace';
import { MainSpace } from '../spaces/MainSpace';
import { HomeRowSpace } from '../spaces/HomeRowSpace';
import { HomeSpace } from '../spaces/HomeSpace';
import { Move } from '../moves/Move';
import { EnterPiece } from '../moves/EnterPiece';
import { MoveMain } from '../moves/MoveMain';
import { MoveHome } from '../moves/MoveHome';

interface ParseObj {
	[key: string]: any;
	type: string;
	color?: Color;
	name?: string;
	board?: Board;
	dice?: number[];
	moves?: Move[];
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
		parsed['type'] = 'do-move';
		parsed['board'] = parseBoard(obj['do-move'].board);
		parsed['dice'] = obj['do-move'].dice.die.map((el: {_text: string}) => parseInt(el._text));
	} else if (obj['moves']) {
		console.log(obj['moves']);

		parsed['type'] = 'moves';
		parsed['moves'] = parseMoves(obj['moves']);

	} else if (obj['doubles-penalty']) {
		parsed['type'] = 'doubles-penalty';

	} else if (obj['void']) {
		parsed['type'] = 'void';
	}

	return parsed;
}

function parseBoard(bobj: BoardObj) {
	let board = new Board();

	if (bobj.main['piece-loc']) {
		for (let i = 0; i < bobj.main['piece-loc'].length; i++) {
			let pli = bobj.main['piece-loc'][i];
			let pawn = new Pawn(parseInt(pli.pawn.id._text), <Color>(pli.pawn.color._text));
			board.setPawnOnSpace(pawn, new MainSpace(parseInt(pli.loc._text)));
		}
	}

	if (bobj['home-rows']['piece-loc']) {
		for (let i = 0; i < bobj['home-rows']['piece-loc'].length; i++) {
			let pli = bobj['home-rows']['piece-loc'][i];
			let pawn = new Pawn(parseInt(pli.pawn.id._text), <Color>(pli.pawn.color._text));
			board.setPawnOnSpace(pawn, new HomeRowSpace(parseInt(pli.loc._text), 
																									<Color>pli.pawn.color._text));
		}
	}

	if (bobj.home.pawn) {
		for (let i = 0; i < bobj.home.pawn.length; i++) {
			let pi = bobj.home.pawn[i];
			let pawn = new Pawn(parseInt(pi.id._text), <Color>pi.color._text);
			board.setPawnOnSpace(pawn, new HomeSpace(pawn.color));
		}
	}

	return board;
}

function parseMoves(mobj: object): Move[] {
	let moves: Move[] = [];

	// if (mobj['enter-piece']) {
	// 	let makeEP = (o) => {
	// 		let p = new Pawn(parseInt(o.pawn.id._text), <Color>o.pawn.color._text);
	// 		moves.push(new EnterPiece(p));
	// 	}
	// 	if (mobj['enter-piece'] instanceof Array) {
	// 		for (let i = 0; i < mobj['enter-piece'].length; i++) {
	// 			makeEP(mobj['enter-piece'][i]);
	// 		}
	// 	} else {
	// 		makeEP(mobj['enter-piece']);
	// 	}
	// }

	console.log('moves', moves);
	return moves;
}
