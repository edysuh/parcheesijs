export class Die {
	roll() {
		let min = Math.ceil(1);
		let max = Math.floor(6);
		
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}