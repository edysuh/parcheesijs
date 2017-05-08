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
