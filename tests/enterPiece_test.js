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
	
	var mb = new EnterPiece(b);
	var my = new EnterPiece(y);
	var mg = new EnterPiece(g);
	var mr = new EnterPiece(r);
	
	mb.move(bd);
	my.move(bd);
	mg.move(bd);
	mr.move(bd);
	
	assert(bd.getSpaceAt(startingLocations["blue"]).getPawnOnSpaceById(b.getId()), 
		"ENTERPIECE: blue enters");
	assert(bd.getSpaceAt(startingLocations["yellow"]).getPawnOnSpaceById(y.getId()), 
		"ENTERPIECE: yellow enters");
	assert(bd.getSpaceAt(startingLocations["green"]).getPawnOnSpaceById(g.getId()), 
		"ENTERPIECE: green enters");
	assert(bd.getSpaceAt(startingLocations["red"]).getPawnOnSpaceById(r.getId()), 
		"ENTERPIECE: red enters");
	
	var y2 = new Pawn(2, "yellow");
	var y3 = new Pawn(3, "yellow");
	
	var my2 = new EnterPiece(y2);
	var my3 = new EnterPiece(y3);
	
	// my2.move(bd);
	// my3.move(bd);
	// assert(bd.getSpaceAt(startingLocations["yellow"])._pawnsOnSpace.length === 2,
	// 	"ENTERPIECE: blockade at starting space");
	// more robust test should check exact pawns as well
}
