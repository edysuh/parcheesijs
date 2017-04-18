import { assert } from "./tester";
import { Move } from "../src/move";
import { Board } from "../src/board";
import { Pawn } from "../src/pawn"; 

export function move_test() {
    var b = new Board();
    var p = new Pawn(3, "blue");
    var pawnLoc = b.getSpaceAt(5);
    pawnLoc.setPawnOnSpace(p);
   
    var m = new Move();
    // console.log('b', b);

    assert(!(m.isBlocked(b, p, 5)), "MOVE: there is no blockade");
    
    var blockLoc = b.getSpaceAt(8);
    blockLoc.isBlockade = true;
    
    // console.log('b', b);
    
    assert(!(m.isBlocked(b, p, 2)), "MOVE: there is a blockade but we can still move");
    assert(m.isBlocked(b, p, 3), "MOVE: we land on a blockade");
    assert(m.isBlocked(b, p, 6), "MOVE: there is a blockade");
} 
