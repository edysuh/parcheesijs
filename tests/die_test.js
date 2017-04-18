import { Die } from "../src/die";
import { assert } from "./tester";

export function die_test() {
	var d = new Die();
	
	var r = d.roll();
	assert(1 <= r && r <= 6, "DIE: rolls are between 1 and 6");
	r = d.roll();
	assert(1 <= r && r <= 6, "DIE: rolls are between 1 and 6");
	r = d.roll();
	assert(1 <= r && r <= 6, "DIE: rolls are between 1 and 6");
	r = d.roll();
	assert(1 <= r && r <= 6, "DIE: rolls are between 1 and 6");
	r = d.roll();
	assert(1 <= r && r <= 6, "DIE: rolls are between 1 and 6");
	r = d.roll();
	assert(1 <= r && r <= 6, "DIE: rolls are between 1 and 6");
}
