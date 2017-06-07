import { assert } from "./tester";
import { Board } from "../src/board";
import { Pawn } from "../src/pawn";
import { MoveMain } from "../src/moveMain";
import isEqual from "lodash";

export function moveMain_test() {
  var board = new Board();
  var p = new Pawn(3, "blue");
  var s5 = board.getSpaceAt(5);
  var bs = board.getSpaceAt(8);
	
  s5.setPawnOnSpace(p);
  var mm = new MoveMain(p, s5, 5);
	var bonus;
	({board, bonus} = mm.move(board));

  var s10 = board.getSpaceAt(10);
  var lp = board.getSpaceAt(10).getPawnOnSpaceById(p.getId(), p.getColor());

  assert(!board.getSpaceAt(5).getPawnOnSpaceById(p.getId(), p.getColor()), "MOVEMAIN: No Pawn on Start");
  assert(isEqual(lp, p), "MOVEMAIN: Pawn Has Been Moved to Landing");

  var p2 = new Pawn(0, "red");
  var p3 = new Pawn(1, "red");
  var p4 = new Pawn(2, "red");
  board.getSpaceAt(20).setPawnOnSpace(p2);
  board.getSpaceAt(24).setPawnOnSpace(p3);
  // implement moving a third piece onto the blockade
  // board.getSpaceAt(23).setPawnOnSpace(p3);
	

  mm = new MoveMain(p2, board.getSpaceAt(20), 4);
	({board, bonus} = mm.move(board));
  assert(board.getSpaceAt(24).isBlockade, "MOVEMAIN: made a blockade");

	// console.log('board', board.getSpaceAt(24));
  mm = new MoveMain(p2, board.getSpaceAt(24), 4);
	// console.log('here');
	({board, bonus} = mm.move(board));
  assert(!board.getSpaceAt(24).isBlockade, "MOVEMAIN: broke a blockade");
}
