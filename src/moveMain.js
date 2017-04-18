import { Move } from "./move";

export class MoveMain extends Move {
    moveMain(board, pawn, dist) {
        var currSpace = board.findPawnLocation(pawn);
        
        if (super.isBlocked(board, pawn, dist)) {
            return board;
        }
        
        var landSpace = currSpace;
        
        for (var i = 0; i < dist; i++) {
            landSpace = board.getNextSpace(landSpace);
        }
        
        var landPawn = landSpace.getPawnOnSpace();
        
        if (landPawn) {
            if (landPawn.getColor() === pawn.getColor()) {
                landPawn.isBlockade = true;
            } else {
                // bop
            }
        }
        
        currSpace.removePawnOnSpace();
        landSpace.setPawnOnSpace(pawn);
        
        return board;
    }
}
