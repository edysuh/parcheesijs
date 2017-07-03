import { Color, Colors } from './defs';
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

	// TODO maybe create a cheated object
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
	}
}
