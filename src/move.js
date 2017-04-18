import { Board } from "./board";

export class Move {
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

    isBlocked(board, pawn, distance) {
        var currLoc = board.findPawnLocation(pawn);
        
        for (var i = 0; i < distance; i++) {
            if (board.getNextSpace(currLoc).isBlockade) {
                return true;
            } else {
                currLoc = board.getNextSpace(currLoc);
            }
        }
        return false;
    }
}
