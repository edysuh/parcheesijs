import { cloneDeep } from 'lodash';

import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Move } from './Move';
import { Space } from '../spaces/Space';
import { NestSpace } from '../spaces/NestSpace';

export class EnterPiece implements Move {
  readonly pawn: Pawn;
  
	constructor(pawn: Pawn) {
		this.pawn = pawn;
	}
	
	move(board: Board): { 'board': Board, 'bonus': number } {
		let newBoard = cloneDeep(board);
		let currSpace = <Space>(new NestSpace(this.pawn.color));
		let bonus = 0; 
		
		if (!currSpace.equals(newBoard.getSpaceForPawn(this.pawn))) {
			throw new Error("specified pawn is not on the specified space");
		}
		
		currSpace = currSpace.getNextSpace(this.pawn.color);

		if (newBoard.isBop(this.pawn, currSpace)) {
			bonus = 20;
		}
		
		newBoard.setPawnOnSpace(this.pawn, currSpace);

		return { 'board': newBoard, 'bonus': bonus };
	}
}
