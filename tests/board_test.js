import { assert } from "./tester";
import { Board } from "../src/board";
import { Space } from "../src/space";
import { Pawn } from "../src/pawn";

export function board_test() {
	var b = new Board();
    var p = new Pawn(3, "blue");
    
    var s45 = b.getSpaceAt(45);
    s45.setPawnOnSpace(p);
    
    assert(b.findPawnLocation(p) == s45, "BOARD: find pawn location");

	var curr = b.getSpaceAt(65);
	var curr2 = b.getSpaceAt(65);
	for (var i = 0; i < 6; i++) {
		curr = b.getNextSpace(curr, "blue");
		curr2 = b.getNextSpace(curr2, "yellow");
	}
	assert(curr === b.getSpaceAt(71), "BOARD: get next space, move into blue home row");
	assert(curr2 === b.getSpaceAt(3), "BOARD: get next space, move past blue home row");
			
	curr = b.getSpaceAt(14);
	curr2 = b.getSpaceAt(14);
	for (i = 0; i < 6; i++) {
		curr = b.getNextSpace(curr, "yellow");
		curr2 = b.getNextSpace(curr2, "green");
	}
	assert(curr === b.getSpaceAt(78), "BOARD: get next space, move into yellow home row");
	assert(curr2 === b.getSpaceAt(20), "BOARD: get next space, move past yellow home row");
	
	curr = b.getSpaceAt(31);
	curr2 = b.getSpaceAt(31);
	for (i = 0; i < 6; i++) {
		curr = b.getNextSpace(curr, "green");
		curr2 = b.getNextSpace(curr2, "yellow");
	}
	assert(curr === b.getSpaceAt(85), "BOARD: get next space, move into green home row");
	assert(curr2 === b.getSpaceAt(37), "BOARD: get next space, move past green home row");
	
	curr = b.getSpaceAt(48);
	curr2 = b.getSpaceAt(48);
	for (i = 0; i < 6; i++) {
		curr = b.getNextSpace(curr, "red");
		curr2 = b.getNextSpace(curr2, "yellow");
	}
	assert(curr === b.getSpaceAt(92), "BOARD: get next space, move into red home row");
	assert(curr2 === b.getSpaceAt(54), "BOARD: get next space, move past red home row");
}
