import { assert } from "./tester";
import { Board } from "../src/board";
import { Pawn } from "../src/pawn";
import { MoveMain } from "../src/moveMain";

export function moveMain_test() {
  var b = new Board();
  var p = new Pawn(3, "blue");
  var s5 = b.getSpaceAt(5);
  var bs = b.getSpaceAt(8);
	
  s5.setPawnOnSpace(p);
  var mm = new MoveMain(p, 5);
	mm.move(b);

  var s10 = b.getSpaceAt(10);
  var lp = s10.getPawnOnSpaceById(p.getId());

  assert(!s5.getPawnOnSpaceById(p.getId()), "MOVEMAIN: No Pawn on Start");
  assert(lp == p, "MOVEMAIN: Pawn Has Been Moved to Landing");

  var p2 = new Pawn(0, "red");
  var p3 = new Pawn(1, "red");
  var p4 = new Pawn(2, "red");
  b.getSpaceAt(20).setPawnOnSpace(p2);
  b.getSpaceAt(24).setPawnOnSpace(p3);
  // implement moving a third piece onto the blockade
  // b.getSpaceAt(23).setPawnOnSpace(p3);
	

  mm = new MoveMain(p2, 4);
	mm.move(b);
  assert(b.getSpaceAt(24).isBlockade, "MOVEMAIN: made a blockade");

  mm.move(b);
  assert(!b.getSpaceAt(24).isBlockade, "MOVEMAIN: broke a blockade");
}
