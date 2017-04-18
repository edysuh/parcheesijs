import { Board } from "../src/board";
import { Pawn } from "../src/pawn";
import { MoveMain } from "../src/moveMain";

export function moveMain_test() {
    var b = new Board();
    var p = new Pawn();
    var s = b.getSpaceAt(5);
    s.setPawnOnSpace(p);
    var m = new MoveMain();
    
    var bs = b.getSpaceAt(8);
    bs.isBlockade = true;

    m.moveMain(b, p, 5);
}
