import { Color } from './defs';
import { Player } from './players/player';

export class Game {
	players: Player[];

	constructor() {
		this.players = [];
	}
	
	register(player: Player): void {
		this.players.push(player);
		// def color
		// player.startGame(color);
	}

	// TODO maybe create a cheated object
	start() { }
}
