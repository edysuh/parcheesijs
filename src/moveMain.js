import { Move } from "./move";

export class MoveMain extends Move {
    moveMain(board, pawn, dist) {
        var startSpace = board.findPawnLocation(pawn);
        
        if (super.isBlocked(board, pawn, startSpace, dist)) {
            return board;
        }
        
        var landSpace = startSpace;
        
        for (var i = 0; i < dist; i++) {
            landSpace = board.getNextSpace(landSpace);
        }
		
		// if (super.canMove(board, pawn, landSpace)) {
		// 	return board;
		// }
        
        var existingPawn = landSpace.getPawnOnSpace();
        
        if (existingPawn) {
            if (existingPawn.getColor() === pawn.getColor()) {
                landSpace.isBlockade = true;
            } else {
                // bop
            }
        }
        
        if (startSpace.isBlockade) {
            startSpace.isBlockade = false;
        }
        startSpace.removePawnOnSpace();
        landSpace.setPawnOnSpace(pawn);
        
        return board;
    }
}
