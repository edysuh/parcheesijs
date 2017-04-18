import { assert } from "./tester";
import { Board } from "../src/board";
import { Pawn } from "../src/pawn";
import { Move } from "../src/move";
import { EnterPiece } from "../src/enterPiece";
import { startingLocations } from "../src/def";

export function enterPiece_test() {
	var bd = new Board();
	var b = new Pawn(2, "blue");
	var y = new Pawn(1, "yellow");
	var g = new Pawn(3, "green");
	var r = new Pawn(0, "red");
	
	var m = new EnterPiece();
	
	m.enterPiece(bd, b);
	m.enterPiece(bd, y);
	m.enterPiece(bd, g);
	m.enterPiece(bd, r);
	
	assert(b === bd.getSpaceAt(startingLocations["blue"]).getPawnOnSpace(), "ENTERPIECE: blue enters");
	assert(y === bd.getSpaceAt(startingLocations["yellow"]).getPawnOnSpace(), "ENTERPIECE: yellow enters");
	assert(g === bd.getSpaceAt(startingLocations["green"]).getPawnOnSpace(), "ENTERPIECE: green enters");
	assert(r === bd.getSpaceAt(startingLocations["red"]).getPawnOnSpace(), "ENTERPIECE: red enters");
	
	var y2 = new Pawn(2, "yellow");
	var y3 = new Pawn(3, "yellow");
	
	m.enterPiece(bd, y2);
	m.enterPiece(bd, y3);
	assert(bd.getSpaceAt(startingLocations["yellow"])._pawnsOnSpace.length === 2,
			"ENTERPIECE: blockade at starting space");
	// check exact pawns as well
}
