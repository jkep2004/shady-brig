// BLOCK string for game level

/* Stored in format ABABABAB
    A is the number of this Tile
    B is the type of Tile
    
    Each row should sum to levelSizeX and there should be levelSizeY rows
*/

const levelSizeX = 100;
const levelSizeY = 100;

var LEVEL = ``;

// DEBUG

LEVEL = ``;

for (let y = 0; y < levelSizeY; y++) {

	LEVEL += `${levelSizeX}1`;

}
