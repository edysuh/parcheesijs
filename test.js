import { die_test } from "./tests/die_test";
import { board_test } from "./tests/board_test";
import { move_test } from "./tests/move_test";
import { moveMain_test } from "./tests/moveMain_test";
import { enterPiece_test } from "./tests/enterPiece_test";
import { turn_test } from "./tests/turn_test";
import { player_test } from "./tests/player_test";

function test() {
	die_test();
  board_test();
  move_test();
  moveMain_test();
	enterPiece_test();
	turn_test();
	player_test();
}

test();
