import { should } from 'chai';
should();

import * as net from 'net';

import { SPlayer } from '../../src/players/SPlayer';
import { MLastPlayer } from '../../src/players/MPlayer';
import { Color } from '../../src/definitions';

describe('SPlayer', function() {
	it('should connect to the remote player', function() {
		let server = net.createServer().listen(8000);
		let splayer: SPlayer;
		server.on('connection', conn => {
			splayer = new SPlayer(conn);
			let xml = splayer.startGame(Color.red);
			console.log('xml', xml);
			(xml).should.equal('<name>red player</name>');
		});

		let mplayer = new MLastPlayer();
		mplayer.connectToGame();
	});
});
