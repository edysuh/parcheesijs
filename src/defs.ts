export enum Color { blue, yellow, green, red };
// export type Color = "blue" | "yellow" | "green" | "red";

export const NUM_COLORS: number = 4;
export const NUM_HOME_ROW_SPACES: number = 7;
export const NUM_MAIN_SPACES: number = 68;
export const NUM_PAWNS: number = 4;
export const NUM_SPACES: number = 95;
export const PAWN_DISTANCE: number = 71;

export const ColoredSafeties: number[] = [5, 22, 39, 56];
export const Safeties: number[] = [0, 12, 17, 29, 34, 46, 51, 63];

export const EnterHomeRowMap: Map<string, number> = new Map([
	["blue", 34],
	["yellow", 51],
	["green", 0],
	["red", 17] 
]);

export const StartMap: Map<string, number> = new Map([
	["blue", 39],
	["yellow", 56],
	["green", 5],
	["red", 22]
]);
