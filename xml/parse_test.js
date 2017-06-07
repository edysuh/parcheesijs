import { assert } from '../tests/tester';
import { parse, generateBoard, getInside, doMoveParse, moveListParse } from './parse';

export function parse_test() {
	let test = "<board> <start> <pawn> <color> yellow </color> <id> 3 </id> </pawn> <pawn> <color> red </color> <id> 2 </id> </pawn> <pawn> <color> green </color> <id> 1 </id> </pawn> <pawn> <color> blue </color> <id> 0 </id> </pawn> </start> <main> <piece-loc> <pawn> <color> yellow </color> <id> 2 </id> </pawn> <loc> 56 </loc> </piece-loc> <piece-loc> <pawn> <color> blue </color> <id> 3 </id> </pawn> <loc> 39 </loc> </piece-loc> <piece-loc> <pawn> <color> red </color> <id> 1 </id> </pawn> <loc> 22 </loc> </piece-loc> <piece-loc> <pawn> <color> green </color> <id> 0 </id> </pawn> <loc> 5 </loc> </piece-loc> </main> <home-rows> <piece-loc> <pawn> <color> green </color> <id> 2 </id> </pawn> <loc> 0 </loc> </piece-loc> <piece-loc> <pawn> <color> red </color> <id> 3 </id> </pawn> <loc> 1 </loc> </piece-loc> <piece-loc> <pawn> <color> blue </color> <id> 1 </id> </pawn> <loc> 2 </loc> </piece-loc> <piece-loc> <pawn> <color> yellow </color> <id> 0 </id> </pawn> <loc> 3 </loc> </piece-loc> </home-rows> <home> <pawn> <color> yellow </color> <id> 1 </id> </pawn> <pawn> <color> red </color> <id> 0 </id> </pawn> <pawn> <color> green </color> <id> 3 </id> </pawn> <pawn> <color> blue </color> <id> 2 </id> </pawn> </home> </board>";
	
	let test2 = "<moves> <enter-piece> <pawn> <color> green </color> <id> 0 </id> </pawn> </enter-piece> <move-piece-main> <pawn> <color> green </color> <id> 0 </id> </pawn> <start> 5 </start> <distance> 3 </distance> </move-piece-main> </moves>";
	
	let test3 = "<move-piece-main> <pawn> <color> green </color> <id> 0 </id> </pawn> <start> 5 </start> <distance> 3 </distance> </move-piece-main>";
	
	let test4 = "<start-game> green </start-game>";
	
	let test5 = "<do-move> <board> <start> <pawn> <color> yellow </color> <id> 3 </id> </pawn> <pawn> <color> red </color> <id> 2 </id> </pawn> <pawn> <color> green </color> <id> 1 </id> </pawn> <pawn> <color> blue </color> <id> 0 </id> </pawn> </start> <main> <piece-loc> <pawn> <color> yellow </color> <id> 2 </id> </pawn> <loc> 56 </loc> </piece-loc> <piece-loc> <pawn> <color> blue </color> <id> 3 </id> </pawn> <loc> 39 </loc> </piece-loc> <piece-loc> <pawn> <color> red </color> <id> 1 </id> </pawn> <loc> 22 </loc> </piece-loc> <piece-loc> <pawn> <color> green </color> <id> 0 </id> </pawn> <loc> 5 </loc> </piece-loc> </main> <home-rows> <piece-loc> <pawn> <color> green </color> <id> 2 </id> </pawn> <loc> 0 </loc> </piece-loc> <piece-loc> <pawn> <color> red </color> <id> 3 </id> </pawn> <loc> 1 </loc> </piece-loc> <piece-loc> <pawn> <color> blue </color> <id> 1 </id> </pawn> <loc> 2 </loc> </piece-loc> <piece-loc> <pawn> <color> yellow </color> <id> 0 </id> </pawn> <loc> 3 </loc> </piece-loc> </home-rows> <home> <pawn> <color> yellow </color> <id> 1 </id> </pawn> <pawn> <color> red </color> <id> 0 </id> </pawn> <pawn> <color> green </color> <id> 3 </id> </pawn> <pawn> <color> blue </color> <id> 2 </id> </pawn> </home> </board> <dice> <die> 4 </die> <die> 6 </die> </dice> </do-move>";
	
	
	let t = parse(test);
	let t2 = parse(test2);
	let t3 = parse(test3);
	let t4 = parse(test4);
	let t5 = parse(test5);
	
	// console.log("parse_test", parse(test3));
	// console.log("parse_test", parse(test3));

	

	console.log(generateBoard(t.elements[0]));
	console.log(getInside(t4.elements[0]));
	console.log(doMoveParse(t5));
}
