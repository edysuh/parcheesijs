import { should } from 'chai';
should();

import { Game } from '../src/Game';
import { Color } from '../src/definitions';
import { MFirstPlayer, MLastPlayer } from '../src/players/MPlayer';

describe("Game", function() {
	it('should register a player (object version)', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		game.register(p1);
		
		(game.players).should.include(p1);
	});
	
	it('should register a player on connection and send them a color (network version)');
	
	it.skip('should start a game with 4 players', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		let p2 = new MFirstPlayer();
		let p3 = new MLastPlayer();
		let p4 = new MLastPlayer();
		game.register(p1);
		game.register(p2);
		game.register(p3);
		game.register(p4);
		game.start();
	});
		// (p1.color).should.equal(Color.blue);

		// need states:
		// enum game.state { START, DOMOVE, DOUBLEPENALTY }
		// (game.state).should.equal(state.START);
		
	// it('should start multiple games if there are more than 4 players');
	// it('should fill with MPlayers if there are not enough players');
	
	// it('should enforce contracts between the game rules and the player');
	// it('should uphold behavioral contracts');
	// it('should adher to sequencial contracts');
});
