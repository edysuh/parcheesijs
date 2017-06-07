import { PAWN_DISTANCE, HOMEROWLENGTH, homeRowLocations, startingLocations } from "./def";

export class Pawn {
  constructor(id, color) {
    this._id = id;
    this._color = color;
    this.distRemaining = PAWN_DISTANCE;
  }
  
  getId() {
    return this._id;
  }
  
  getColor() {
    return this._color;
  }
  
  resetToStart() {
    this.distRemaining = 71;
  }
	
	calcPawnDistRem(spaceIndex) {
		if (spaceIndex >= homeRowLocations[this._color]["home"]) {
			this.distRemaining = 
				homeRowLocations[this._color]["home"] + HOMEROWLENGTH - spaceIndex;
		} else if (spaceIndex < startingLocations[this._color]) {
			this.distRemaining = 71 - (spaceIndex + 1 + 67 - startingLocations[this._color]);
		} else {
			this.distRemaining = 71 + startingLocations[this._color] - spaceIndex;
		}
	}
}

