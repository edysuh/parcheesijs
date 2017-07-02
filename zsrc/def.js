export const COLORS = ["blue", "yellow", "green", "red"];

export const HOMEROWLENGTH = 7;
export const NSPACES = 95;
export const NUMPAWNS = 4;
// export const PAWN_DISTANCE = 71;

export const NUM_HOME_ROW_SPACES = 7;
export const NUM_MAIN_SPACES = 68;
export const NUM_PAWNS = 4;
export const NUM_SPACES = 95;
export const PAWN_DISTANCE = 71;

export const SAFETIES = [0, 5, 12, 17, 22, 29, 34, 39, 46, 51, 56, 63];
// for loop through board indices,
//		if index === SAFETIES.unshift()
//		make safe space instead
// export const safeties = [0, 5, 12, 17, 22, 29, 34, 39, 46, 51, 56, 63];

export const enterHomeRowSpaces = {
	"blue": 34,
	"yellow": 51,
	"green": 0,
	"red": 17
};

export const startingLocations = {
	"blue": 39,
	"yellow": 56,
	"green": 5,
	"red": 22
};

export const homeRowLocations = {
	"blue": {
		"enter": 34,
		"home": 68
	},
	"yellow": {
		"enter" : 51,
		"home": 75
	},
	"green": {
		"enter": 0,
		"home": 82
	},
	"red": {
		"enter": 17,
		"home": 89
	}
};
