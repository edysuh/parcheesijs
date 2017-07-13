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
		
	it('should start multiple games if there are more than 4 players');
	it('should fill with MPlayers if there are not enough players');
	
	it('should enforce contracts between the game rules and the player');
	it('should uphold behavioral contracts');
	it('should adher to sequencial contracts');
	
	it('should not be able to ignore a die roll');
	it('should allow for no move, due to a blockade');
	it('should allow for just first die, due to a blockade');
	it('should allow for just second die, due to a blockade');
	it('should be able to bop, but dont take bonus of 20');
	it('should be able to move home, but dont take bonus of 10');
	it('should be able to move just one die, to not move a blockade together');
	it('should move the furthest along pawn back to home on doublesPenalty');

	it('should be able to make a bonus move upon receiving it');
	it('should not be able to move a blockade together');
	it('should not be able to move a blockade together with bonuses of 20');
	it('should not be able to move a blockade together with bonuses of 10');
	it('should not be able to move a blockade together with doubles (two 3s and two 4s)');
	
  it('enterpiece should only be called on a 5 roll');
});
