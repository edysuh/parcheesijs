import { die_test } from "./tests/die_test";
import { board_test } from "./tests/board_test";
import { move_test } from "./tests/move_test";
import { moveMain_test } from "./tests/moveMain_test";
import { enterPiece_test } from "./tests/enterPiece_test";
import { rulesChecker_test } from "./tests/rulesChecker_test";

function test() {
	die_test();
  board_test();
  move_test();
  moveMain_test();
	enterPiece_test();
	
	rulesChecker_test();
}

test();
