import { Tag } from './tag';
import { Board } from '../src/board';
import { Pawn } from '../src/pawn';
import { homeRowLocations } from '../src/def.js';
import { js2xml, xml2js } from 'xml-js';

export function parse(input) {
	return xml2js(input);
}

export function generateBoard(boardObj) {
	if (boardObj.name !== "board") {
		throw new Error("xml is not a board");
	}
	let board = new Board();

	let spaceTypesArray = boardObj.elements[0].elements;
	for (var i = 0; i < spaceTypesArray.length; i++) {
		switch (spaceTypesArray[i].name) {
			case "start": 
				console.log('start');
				// do we need to do anything here? maybe set distRemaining to 71
				break;
			case "main":
				console.log('main');
				for (let j = 0; j < spaceTypesArray[i].elements.length; j++) {
					let pawn;
					let loc;
					let pieceLocObj = spaceTypesArray[i].elements[j];
					
					for (let k = 0; k < pieceLocObj.elements.length; k++) {
						if (pieceLocObj.elements[k].name === "pawn") {
							let id, color;
							let p = pieceLocObj.elements[k];
							for (let l = 0; l < p.elements.length; l++) {
								if (p.elements[l].name === "id") {
									id = parseInt(p.elements[l].elements[0].text);
								} else if (p.elements[l].name === 'color') {
									color = p.elements[l].elements[0].text.trim();
								}
							}
							pawn = new Pawn(id, color);
						} else if (pieceLocObj.elements[k].name === "loc") {
							loc = parseInt(pieceLocObj.elements[k].elements[0].text);
						}
					}
					
					board.getSpaceAt(loc).setPawnOnSpace(pawn);
					pawn.calcPawnDistRem(loc);
				}
				break;
			case "home-rows":
				console.log('home-rows');
				for (let j = 0; j < spaceTypesArray[i].elements.length; j++) {
					let pawn;
					let loc;
					let pieceLocObj = spaceTypesArray[i].elements[j];
					
					for (let k = 0; k < pieceLocObj.elements.length; k++) {
						if (pieceLocObj.elements[k].name === "pawn") {
							let id, color;
							let p = pieceLocObj.elements[k];
							for (let l = 0; l < p.elements.length; l++) {
								if (p.elements[l].name === "id") {
									id = parseInt(p.elements[l].elements[0].text);
								} else if (p.elements[l].name === 'color') {
									color = p.elements[l].elements[0].text.trim();
								}
							}
							pawn = new Pawn(id, color);
						} else if (pieceLocObj.elements[k].name === "loc") {
							loc = parseInt(pieceLocObj.elements[k].elements[0].text);
						}
					}
					
					loc = homeRowLocations[pawn.getColor()]['home'] + loc;
					pawn.calcPawnDistRem(loc);
					
					board.getSpaceAt(loc).setPawnOnSpace(pawn);
				}
				break;
			case "home":
				console.log('home');
				// should not have to do anything here?
				break;
		}
	}
	return board;
}

export function getInside(obj) {
	let inside = obj.elements[0].text;
	if (typeof inside === "string") {
		inside = inside.trim();
	} else if (typeof inside === "number") {
		inside = parseInt(inside);
	}
	return inside;
}

export function doMoveParse(obj) {
	let inside = obj.elements[0].elements;
	let board;
	let dice = [];
	for (let i = 0; i < inside.length; i++) {
		if (inside[i].name === 'board') {
			board = generateBoard(inside[i]);

		} else if (inside[i].name === 'dice') {
			for (let j = 0; j < inside[i].elements.length; j++) {
				dice.push(getInside(inside[i].elements[j]));
			}
		}
	}
	
	return {'board': board, 'rolls': dice};
}

// moves =	 <moves> move ... </moves>
export function moveListParse(obj) {

}
