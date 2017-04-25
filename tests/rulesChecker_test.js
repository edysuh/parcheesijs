import { assert } from "./tester";
import { rulesChecker } from "../src/rulesChecker";
import { Board } from "../src/board";
import { Pawn } from "../src/pawn";
import { Move } from "../src/move";
import { MoveMain } from "../src/moveMain";
import { EnterPiece } from "../src/enterPiece";
import { Die } from "../src/die";

export function rulesChecker_test() {
	var b = new Board();
	var d1 = new Die();
	var d2 = new Die();
	var r1 = 5;
	var r2 = 5;
	var p1 = new Pawn(1, "blue");
	var p2 = new Pawn(2, "blue");
	
	var me1 = new EnterPiece(p1);
	var me2 = new EnterPiece(p2);
	var mm = new MoveMain(p1, r1);
	
	var retboard = rulesChecker(b, [r1, r2], [me1, me2, mm]);
	
	assert(retboard.findPawnLocation(p1), "RULESCHECKER: blue pawn 1 entered");
	assert(retboard.findPawnLocation(p2), "RULESCHECKER: blue pawn 2 entered");
	
	assert(retboard instanceof Board, "RULESCHECKER: pawn exists on the board");
	assert(retboard instanceof Board, "RULESCHECKER: pawn entered with 5 roll");
}
