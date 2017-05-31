import { Tag } from './tag';

export function parse(input) {
	input = input.split(' ');
	
	let root = new Tag("root");
	let parent = []; 
	
	for (let i = 0; i < input.length; i++) {
		let str = input[i];
		let tag;
		
		// close tag
		if (str.startsWith("</")) {
			tag = str.slice(2, str.indexOf(">"));
			
			if (root.name === tag) {
				root = parent.pop();
			} else {
				throw new Error("tag mismatch");
			}

		// open tag
		} else if (str.startsWith("<")) {
			tag = str.slice(1, str.indexOf(">"));
			let curr = new Tag(tag);
			
			root.children.push(curr);
			parent.push(root);
			root = curr;

		// is data
		} else {
			tag = str;
			root.data = tag;
		}
	}
	
	return root.children[0];
}

export function generateBoard(boardTag) {
	if (tag.name !== 'board') {
		throw new Error("Tag is not a board");
	}

	let board = new Board();
	
	for (i = 0; i < tag.children.length; i++) {
		switch (tag.children[i]) {
			case "start": 
				
				break;
			case "main":
        for (j = 0; i < tag.children.children.length; j ++) {
					// if (tag.children.children[j] == "color") {
					// 	//pawncolor = tag.children.children[]
					// }
					// else if (tag.children.children[j] == "id") {
					// 	//pawnid = tag.children.children[]
					// }
					// else (tag.children.children[j] == "loc") {
					// 	//pawnloc = tag.children.children[]
					// }
				}
				// pawn = {pawncolor, id, loc}
				//set this pawn on board 
				
				break;

			case "home-rows":

				break;
			case "home":
				//
				break;
		}
	}
}


// function traverstree(tag) {
//if (tag.name == "board")
		// traverstree on each child
		// 
		// for each tho, if child == 'start':
		// put child.child.pawn on start 
		// 
		// if child === 'main'
		// piece-loc
		// put pawn on that piece loc
		// 
		// if child === 'home-row'
		//
		// if child === 'home'
		//  pawn are children
// } 
