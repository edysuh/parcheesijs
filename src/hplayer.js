import { Player } from "./player";
import express from "express";
import ejs from "ejs";
import path from 'path';

export class HPlayer extends Player {
	constructor(color) {
		super(color);
		
		this.app = express();
		
		this.app.set('views', path.join(__dirname, '../views'));
		this.app.set('view engine', 'html');
		this.app.engine('html', ejs.renderFile);
		
		this.app.listen(8001, () => {
			console.log('hplayer views hosted on port 8001');
		});
	}
	
	renderBoard(board) {
		// call this function before each turn?
		this.app.get('/', (req, res) => {
			res.render('board');
		});
	}
	
	connectToGame() {
		super.connectToGame();
	}
	
	doMove(board, rolls) {
		// renderBoard()?
	}
	
	doublesPenalty(board) {

	}
}
