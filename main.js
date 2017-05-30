import { Game } from "./src/game";
import { HPlayer } from "./src/hplayer";

function main() {
	let g = new Game();
	g.startServer();
	
	let h = new HPlayer("purple");
	h.renderBoard();
}

main();
