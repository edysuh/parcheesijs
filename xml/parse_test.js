import { assert } from '../tests/tester';
import { parse } from './parse';

export function parse_test() {
	let test = "<board> <start> <pawn> <color> yellow </color> <id> 3 </id> </pawn> <pawn> <color> red </color> <id> 2 </id> </pawn> <pawn> <color> green </color> <id> 1 </id> </pawn> <pawn> <color> blue </color> <id> 0 </id> </pawn> </start> <main> <piece-loc> <pawn> <color> yellow </color> <id> 2 </id> </pawn> <loc> 56 </loc> </piece-loc> <piece-loc> <pawn> <color> blue </color> <id> 3 </id> </pawn> <loc> 39 </loc> </piece-loc> <piece-loc> <pawn> <color> red </color> <id> 1 </id> </pawn> <loc> 22 </loc> </piece-loc> <piece-loc> <pawn> <color> green </color> <id> 0 </id> </pawn> <loc> 5 </loc> </piece-loc> </main> <home-rows> <piece-loc> <pawn> <color> green </color> <id> 2 </id> </pawn> <loc> 0 </loc> </piece-loc> <piece-loc> <pawn> <color> red </color> <id> 3 </id> </pawn> <loc> 1 </loc> </piece-loc> <piece-loc> <pawn> <color> blue </color> <id> 1 </id> </pawn> <loc> 2 </loc> </piece-loc> <piece-loc> <pawn> <color> yellow </color> <id> 0 </id> </pawn> <loc> 3 </loc> </piece-loc> </home-rows> <home> <pawn> <color> yellow </color> <id> 1 </id> </pawn> <pawn> <color> red </color> <id> 0 </id> </pawn> <pawn> <color> green </color> <id> 3 </id> </pawn> <pawn> <color> blue </color> <id> 2 </id> </pawn> </home> </board>";
	
	let test2 = "<moves> <enter-piece> <pawn> <color> green </color> <id> 0 </id> </pawn> </enter-piece> <move-piece-main> <pawn> <color> green </color> <id> 0 </id> </pawn> <start> 5 </start> <distance> 3 </distance> </move-piece-main> </moves>";
	
	let test3 = "<move-piece-main> <pawn> <color> green </color> <id> 0 </id> </pawn> <start> 5 </start> <distance> 3 </distance> </move-piece-main>";
	
	console.log("parse_test", parse(test3));
}
