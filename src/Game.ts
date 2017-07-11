import { cloneDeep } from 'lodash';
import { Board } from './Board';
import { Color, Colors } from './definitions';
import { Die } from './Die';
import { Player } from './players/Player';
import { MFirstPlayer } from './players/MPlayer';

export class Game {
	players: Player[];

	constructor() {
		this.players = [];
	}

	register(player: Player): void {
		this.players.push(player);
	}

	start() {
		for (let i = this.players.length % 4; i < Colors.length; i++) {
			this.players.push(new MFirstPlayer());
		}

		while (this.players) {
			let players = this.players.splice(0, 4);
			this.play(players);
		}
	}

	play(players: Player[]) {
		for (let i = 0; i < players.length; i++) {
			players[i].startGame(Colors[i]);
		}

		let board = new Board();
		let die = new Die();
		let i = 0;
		
		while (board.gameOver() == null) {
			let currPlayer = players[i];
			let currBoard = cloneDeep(board);
			let rolls = [die.roll(), die.roll()];
			
			let moves = currPlayer.doMove(currBoard, rolls);
			
			try {
				let ret = moves[i].move(currBoard);
				board = ret.board;
			} catch (e) {

			}
			console.log('board', board);

			i = (i == 3) ? 0 : i+1;
		}
	}
}
