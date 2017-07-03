import { should } from 'chai';
should();

import { Game } from '../src/Game';
import { Player } from '../src/players/Player';

describe("Game", function() {
	it('should register a player (object version)');
	it('should register a player on connection and send them a color (network version)');
	it('should start a game with 4 players');
	it('should start multiple games if there are more than 4 players');
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
});
