import { js2xml } from 'xml-js';

import { Color } from '../definitions';
import { Board } from '../Board';
import { NestSpace } from '../spaces/NestSpace';
import { MainSpace } from '../spaces/MainSpace';
import { HomeRowSpace } from '../spaces/HomeRowSpace';
import { HomeSpace } from '../spaces/HomeSpace';

export interface XMLObj {
	'start-game'?: ColorObj;
	'name'?: TextObj;
	'do-move'?: { board: BoardObj, dice: DiceObj };
	'moves'?: string;
	'doubles-penalty'?: object;
	'void'?: object;
}

interface BoardObj {
	'start': StartObj;
	'main': MainObj;
	'home-rows': HomeRowObj;
	'home': HomeObj;
}

interface StartObj {
	'pawn': PawnObj[];
}

interface MainObj {

}

interface HomeRowObj {

}

interface HomeObj {
	'pawn': PawnObj[];
}

interface PawnObj {
	color: ColorObj;
	id: TextObj;
}

interface DiceObj {
	dice: TextObj[];
}

interface ColorObj {
	color: TextObj;
}

interface TextObj {
	_text: string;
}

export function build(type: string, board?: Board, dice?: number[]): string;
export function build(type: string, text?: Color): string;
export function build(type: string, text?: string): string;

export function build(type: string, text?: any, board?: Board, dice?: number[]): string {
	let build: XMLObj = { };
	switch (type) {
		case 'start-game': 
			build['start-game'] = { color: { _text: text } };
			break;

		case 'name': 
			build['name'] = { _text: text };
			break;

		case 'do-move': 
			let bobj = buildBoard(board);
			let d: DiceObj;
			for (let i = 0; i < dice.length; i++) {
				d.dice.push({ _text: dice[i].toString() });
			}
			build['do-move'] = { board: bobj, dice: d };
			break;

		case 'moves': 
			break;

		case 'doubles-penalty': 
			build['doubles-penalty'] = { };
			break;

		case 'void': 
			build['void'] = { };
			break;
	}

	return js2xml(build, { compact: true, fullTagEmptyElement: true });
}

function buildBoard(board: Board): BoardObj {
	let start: StartObj = { pawn: [] };
	let main = { };
	let homerow = { };
	let home: HomeObj = { pawn: [] };
	let obj = { start: start, main: main, 'home-row': homerow, home: home };

	for (let i = 0; i < board.spaces.length; i++) {
		if (board.spaces[i] instanceof NestSpace) {
			for (let j = 0; j < board.spaces[i].pawns.length; j++) {
				start.pawn.push({ color: { _text: <Color>(board.spaces[i].pawns[j].color) },
													id: {_text: String(board.spaces[i].pawns[j].id) } });
			}
		} else if (board.spaces[i] instanceof MainSpace) {

		} else if (board.spaces[i] instanceof HomeRowSpace) {

		} else if (board.spaces[i] instanceof HomeSpace) {

		}
	}

	return obj;
}
