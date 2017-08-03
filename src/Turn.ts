import { cloneDeep } from 'lodash';

import { Board } from './Board';
import { Die } from './Die';
import { Player } from './players/Player';
import { chooseMove } from './players/MPlayer';
import { NestSpace } from './spaces/NestSpace';
import { Move } from './moves/Move';
import { EnterPiece } from './moves/EnterPiece';
import { MoveMain } from './moves/MoveMain';
import { MoveHome } from './moves/MoveHome';

export class Turn {
	private player: Player;

	constructor(player: Player) {
		this.player = player;
	}

	takeTurn(board: Board): Board {
		let dice = new Die();
		let doubles = 3;
		let miniturn = true;

		while (miniturn) {
			let initial = cloneDeep(board);
			let rolls = [dice.roll(), dice.roll()];
			miniturn = false;

			if (rolls[0] == rolls[1]) {
				doubles--;
				if (doubles == 0) {
					this.player.doublesPenalty();
					let farthest = this.getFarthestPawn(board);
					board.setPawnOnSpace(farthest, new NestSpace(farthest.color));
					break;
				} else {
					miniturn = true;
				}
				rolls.push(7 - rolls[0], 7 - rolls[1]);
			}

			let moves = this.player.doMove(board, rolls);
			let saveBoard = cloneDeep(board);

			// TODO: if error push to end of moves array to try again later?
			for (let j = 0; j < moves.length; j++) {
				try {
					let moveresult = moves[j].move(board);
					board = moveresult.board;
					if (moveresult.bonus != 0) {
						rolls.push(moveresult.bonus);
					}
				} catch (e) {
					// clean board of their pawns?
					board = saveBoard;
					console.log(e, '\n', this.player.color, 'player cheated. youre out.\n');
					// players.splice(i, 1);
				}
			}

			try {
				this.allRollsConsumed(board, moves, rolls)
				this.checkBlockadeMoves(initial, board);
			} catch (e) {
				board = initial;
				console.log(e, '\n', this.player.color, 'player cheated. youre out.\n');
			}
		}

		return board;
	}

	getFarthestPawn(board: Board) {
		return board.getPlayerPawns(this.player.color).reduce((far, curr) => 
			far.space.distanceFromHome(this.player.color) < 
				curr.space.distanceFromHome(this.player.color) ? 
					far : curr).pawn;
	}

	// TODO: fix check if move intentionally left to prevent moving blockade together
	checkBlockadeMoves(initial: Board, post: Board): void {
		// can limit to this.player.color pawns
		let initBlockSpaces = initial.spaces.filter(sp => sp.isBlockade());
		let postBlockSpaces = post.spaces.filter(sp => sp.isBlockade());

		for (let i = 0; i < initBlockSpaces.length; i++) {
			let pawns = initBlockSpaces[i].pawns;
			for (let j = 0; j < postBlockSpaces.length; j++) {
				if (postBlockSpaces[j].pawns.includes(pawns[0]) &&
						postBlockSpaces[j].pawns.includes(pawns[1])) {
					throw new Error('blockade has been moved together');
				}
			}
		}
	}

	allRollsConsumed(board: Board, moves: Move[], rolls: number[]): void {
		if (moves[0] instanceof EnterPiece && (rolls[0] + rolls[1] == 5)) {
			if (rolls.length == 2) {
				return;
			} else {
				moves.splice(0, 1);
				rolls.splice(0, 2);
			}
		}

		for (let i = 0; i < moves.length; i++) {
			for (let j = 0; j < rolls.length; j++) {
				if ((moves[i] instanceof EnterPiece) && (rolls[j] == 5) ||
						(moves[i] instanceof MoveMain) && (rolls[j] == (<MoveMain>moves[i]).dist) ||
						(moves[i] instanceof MoveHome) && (rolls[j] == (<MoveHome>moves[i]).dist)) {
							rolls.splice(j, 1);
							break;
				}
			}
		}

		if (rolls.length == 0) { return; }

		let pairs = board.getPlayerPawns(this.player.color);

		for (let i = 0; i < rolls.length; i++) {
			for (let j = 0; j < pairs.length; j++) {
				let move = chooseMove(pairs[j], rolls[i]);
				let errorThrown = false;
				try {
					move.move(board);
					// cant just call this.checkBlockadeMoves b/c itll try the already moved pawn
				} catch (e) {
					errorThrown = true;
				}
				if (!errorThrown) {
					throw new Error('all rolls have not been consumed');
				}
			}
		}
	}
}
