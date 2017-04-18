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

    // var curr = b.getSpaceAt(0);
	// while(b.getNextSpace(curr).getPosition() <= 10) {
        // var sp = new Space(b.getNextSpace(curr).getPosition(), "");
        
	// 	console.log(b.getNextSpace(curr));
        // console.log(sp);
        
        // assert(curr == sp, "BOARD: Space equality");
        // curr = b.getNextSpace(curr);
	// }
}
