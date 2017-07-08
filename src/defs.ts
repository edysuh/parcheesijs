export enum Color { blue, yellow, green, red };
export const Colors: Color[] = [Color.blue, Color.yellow, Color.green, Color.red];

export const NUM_COLORS: number = 4;
export const NUM_HOME_ROW_SPACES: number = 7;
export const NUM_MAIN_SPACES: number = 68;
export const NUM_PAWNS: number = 4;
export const NUM_SPACES: number = 95;
export const PAWN_DISTANCE: number = 71;

export const Safeties: number[] = [0, 12, 17, 29, 34, 46, 51, 63];

export const ColoredSafeties: Map<Color, number> = new Map([
	[39, Color.blue],
	[56, Color.yellow],
	[5, Color.green],
	[22, Color.red]
]);

export const EnterHomeRowMap: Map<Color, number> = new Map([
	[Color.blue, 34],
	[Color.yellow, 51],
	[Color.green, 0],
	[Color.red, 17]
]);

export const StartMap: Map<Color, number> = new Map([
	[Color.blue, 39],
	[Color.yellow, 56],
	[Color.green, 5],
	[Color.red, 22]
]);
