import { Move } from './Move'
import { Pawn } from '../Pawn'

export class EnterPiece implements Move {
  pawn: Pawn;
  
	constructor(pawn: Pawn) {
		this.pawn = pawn;
	}
}
