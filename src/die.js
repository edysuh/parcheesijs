export class Die {
	roll() {
		var min = Math.ceil(1);
		var max = Math.floor(6);
		
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
