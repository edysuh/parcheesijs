import { MLastPlayer } from './src/players/MPlayer';
import { TournamentPlayer } from './src/players/TournamentPlayer';

// let player = new MLastPlayer();
let player = new TournamentPlayer();
player.connectToGame();
