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
		let i = 0;
		
		while (!this.gameOver(board)) {
			let currPlayer = players[i];
			let currBoard = cloneDeep(board);
			let rolls = [(new Die()).roll(), (new Die()).roll()];
			
			let moves = currPlayer.doMove(currBoard, rolls);
			
			try{
				let ret = moves[i].move(currBoard);
				board = ret.board;
			} catch(e) { }

			i = (i == 3) ? 0 : i+1;
		}
	}
	
	gameOver(board: Board): boolean {
		return true;
	}
}
