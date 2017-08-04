import { should } from 'chai';
should();

import { Game } from '../src/Game';
import { Color, Colors } from '../src/definitions';
import { MFirstPlayer, MLastPlayer } from '../src/players/MPlayer';

describe("Game", function() {
	it('should register a player (object version)', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		game.register(p1);

		(game.players).should.include(p1);
	});

	// it('should register a player on connection and send them a color (network version)');

	it.skip('should play a game with 4 players', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		let p2 = new MFirstPlayer();
		let p3 = new MLastPlayer();
		let p4 = new MLastPlayer();

		(Colors).should.include(game.play([p1, p2, p3, p4]));
	});

	it.skip('should start multiple games if there are more than 4 players', function() {
		this.timeout(10000);
		let game = new Game();
		
		let numPlayers = 4;
		for (let i = 0; i < numPlayers; i++) {
			let p = (i % 2 == 0) ? new MLastPlayer() : new MLastPlayer();
			game.register(p);
		}

		game.start();
	});

	// it('should start a game server');


	// it('should fill with MPlayers if there are not enough players');
	// it('should enforce contracts between the game rules and the player');
	// it('should uphold behavioral contracts');
	// it('should adher to sequencial contracts');
});
