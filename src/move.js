import { Board } from "./board";

export class Move {
    // general can move bool function that returns false these situations:
    //      - if dest is a safety with a opposing piece on it
	//      - if no pawn on board
	//      - if blockade on starting space
    canMove(board, pawn, dest) {
		if (dest.isSafety && pawn.getColor() !== dest.getPawnOnSpace().getColor()) {
			return false;
		}
		
		return true;
	}

    isBlocked(board, pawn, start, distance) {
		var curr = start;
		
        for (var i = 0; i < distance; i++) {
            if (board.getNextSpace(curr).isBlockade) {
                return true;
            } else {
                curr = board.getNextSpace(curr);
            }
        }
        return false;
    }

    // takes a board and move, returns a board (and die roll?)
    // 
    // old board -> make a new board;
    //      - properties of spaces need to be the same
    //      - position
    //      - type
    //      - pawns on that space
    //      - isblockade
    //
    // moveHelper(oldBoard, move) {
        // for (var i = 0, i < NSPACES; i++) {
        //     this._sp
        // }
        // return newBoard;
    // }
}
