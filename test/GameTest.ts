import { should } from 'chai';
should();

import { Color } from '../src/definitions';
import { Game } from '../src/Game';
import { MFirstPlayer, MLastPlayer } from '../src/players/MPlayer';

describe("Game", function() {
	it('should register a player (object version)', function() {
		let game = new Game();
		let p1 = new MFirstPlayer();
		game.register(p1);
		
		(game.players).should.include(p1);
	});
	it('should register a player on connection and send them a color (network version)');
	it('should start a game with 4 players');
		// (p1.color).should.equal(Color.blue);

		// need states:
		// enum game.state { START, DOMOVE, DOUBLEPENALTY }
		// (game.state).should.equal(state.START);
	it('should start multiple games if there are more than 4 players');
	it('should fill with MPlayers if there are not enough players');
	
	// it('should enforce contracts between the game rules and the player');
	// it('should uphold behavioral contracts');
	// it('should adher to sequencial contracts');
	
	it('should not be able to ignore a die roll');
	it('should allow for no move, due to a blockade');
	it('should allow for just first die, due to a blockade');
	it('should allow for just second die, due to a blockade');
	it('should be able to bop, but dont take bonus of 20');
	it('should be able to move home, but dont take bonus of 10');
	it('should be able to move just one die, to not move a blockade together');
	it('should move the furthest along pawn back to home on doublesPenalty');
});
