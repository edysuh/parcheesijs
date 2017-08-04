import { js2xml } from 'xml-js';

import { Color } from '../definitions';
import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { NestSpace } from '../spaces/NestSpace';
import { MainSpace } from '../spaces/MainSpace';
import { HomeRowSpace } from '../spaces/HomeRowSpace';
import { HomeSpace } from '../spaces/HomeSpace';
import { Move } from '../moves/Move';
import { EnterPiece } from '../moves/EnterPiece';
import { MoveMain } from '../moves/MoveMain';
import { MoveHome } from '../moves/MoveHome';

export interface XMLObj {
	'start-game'?: TextObj;
	name?: TextObj;
	'do-move'?: { board: BoardObj, dice: DiceObj };
	moves?: MovesObj[];
	'doubles-penalty'?: object;
	void?: object;
}

export interface BoardObj {
	start: StartObj;
	main: MainObj;
	'home-rows': HomeRowObj;
	home: HomeObj;
}

interface StartObj {
	pawn: PawnObj[];
}

interface MainObj {
	'piece-loc': { pawn: PawnObj, loc: TextObj }[];
}

interface HomeRowObj {
	'piece-loc': { pawn: PawnObj, loc: TextObj }[];
}

interface HomeObj {
	pawn: PawnObj[];
}

// TODO: modify buildMoves to build an array if more than one
export interface MovesObj {
	'enter-piece'?: MoveObj | MoveObj[];
	'move-piece-main'?: MoveObj | MoveObj[];
	'move-piece-home'?: MoveObj | MoveObj[];
}

export interface MoveObj {
	pawn: PawnObj;
	start?: TextObj;
	distance?: TextObj;
}

interface PawnObj {
	color: TextObj;
	id: TextObj;
}

interface DiceObj {
	die: TextObj[];
}

interface TextObj {
	_text: string;
}

/* overloaded function:
 * build(type: string, input: string)
 * build(type: string, input: Board, dice: number[])
 * build(type: string, input: Move[])
 * build(type: string)
 */
export function build(type: string,
											input?: string | Board | Move[],
											dice?: number[]): string {
	let build: XMLObj = { };
	switch (type) {
		case 'start-game':
			build['start-game'] = { _text: <string>input };
			break;

		case 'name':
			build['name'] = { _text: <string>input };
			break;

		case 'do-move':
			let bobj = buildBoard(<Board>input);
			let d: DiceObj = { die: [] };
			for (let i = 0; i < dice.length; i++) {
				d.die.push({ _text: dice[i].toString() });
			}

			build['do-move'] = { board: bobj, dice: d };
			break;

		case 'moves':
			build['moves'] = buildMoves(<Move[]>input);
			let x = js2xml(build, { compact: true, fullTagEmptyElement: true });
			x = x.replace(/<moves>/g, '').replace(/<\/moves>/g, '');
			return '<moves>' + x + '</moves>';

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
	let main: MainObj = { 'piece-loc': [] };
	let homerow: HomeRowObj = { 'piece-loc': [] };
	let home: HomeObj = { pawn: [] };
	let bobj = { start: start, main: main, 'home-rows': homerow, home: home };

	for (let i = 0; i < board.spaces.length; i++) {
		let sp = board.spaces[i];

		if (sp instanceof NestSpace) {
			for (let j = 0; j < sp.pawns.length; j++) {
				start.pawn.push(buildPawn(sp.pawns[j]));
			}

		} else if (sp instanceof MainSpace) {
			for (let j = 0; j < sp.pawns.length; j++) {
				main['piece-loc'].push({
					pawn: buildPawn(sp.pawns[j]),
					loc: { _text: String((<MainSpace>sp).index) }
				});
			}

		} else if (sp instanceof HomeRowSpace) {
			for (let j = 0; j < sp.pawns.length; j++) {
				homerow['piece-loc'].push({
					pawn: buildPawn(sp.pawns[j]),
					loc: { _text: String((<HomeRowSpace>sp).index) }
				});
			}

		} else if (sp instanceof HomeSpace) {
			for (let j = 0; j < sp.pawns.length; j++) {
				home.pawn.push(buildPawn(sp.pawns[j]));
			}
		}
	}
	return bobj;
}

function buildPawn(pawn: Pawn): PawnObj {
	return { color: { _text: String(pawn.color) }, id: { _text: String(pawn.id) } };
}

function buildMoves(moves: Move[]): MovesObj[] {
	let mobj = [];
	for (let i = 0; i < moves.length; i++) {
		let m = moves[i];
		if (m instanceof EnterPiece) {
			mobj.push({
				'enter-piece': { pawn: buildPawn(m.pawn) }
			});

		} else if (m instanceof MoveMain) {
			mobj.push({
				'move-piece-main': {
					pawn: buildPawn(m.pawn),
					start: { _text: String((<MainSpace>(m.start)).index) },
					distance: { _text: String(m.dist) }
				}
			});

		} else if (m instanceof MoveHome) {
			mobj.push({
				'move-piece-home': {
					pawn: buildPawn(m.pawn),
					start: { _text: String((<HomeRowSpace>(m.start)).index) },
					distance: { _text: String(m.dist) }
				}
			});
		}
	}
	return mobj;
}
