import { assert } from "./tester";
import { Move } from "../src/move";
import { Board } from "../src/board";
import { Pawn } from "../src/pawn"; 

export function move_test() {
    var b = new Board();
    var p = new Pawn(3, "blue");
    var m = new Move();
    var start = b.getSpaceAt(5);
    start.setPawnOnSpace(p);

    assert(!(m.isBlocked(b, p, start, 5)), "MOVE: there is no blockade");
    
    var block = b.getSpaceAt(8);
    block.isBlockade = true;
    
    assert(!(m.isBlocked(b, p, start, 2)), "MOVE: there is a blockade but we can still move");
    assert(m.isBlocked(b, p, start, 3), "MOVE: we land on a blockade");
    assert(m.isBlocked(b, p, start, 6), "MOVE: there is a blockade");
	
	start = b.getSpaceAt(11);
	start.setPawnOnSpace(p);
	
	var p2 = new Pawn(2, "yellow");
	var safe = b.getSpaceAt(16);
	var unsafe = b.getSpaceAt(17);
	safe.setPawnOnSpace(p2);
	
	assert(!(m.canMoveIfSafety(b, p, safe)), "MOVE: can move test to a safety");
	assert(m.canMoveIfSafety(b, p, unsafe), "MOVE: can move test to an arbitrary space");
} 
