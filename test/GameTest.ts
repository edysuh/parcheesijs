import { expect } from 'chai';
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
});
