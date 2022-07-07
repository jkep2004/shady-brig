// BLOCK string for game level

/* Stored in format ABABABAB/
    A is the number of this Tile
    B is the type of Tile
    / is a new line
    ! is air
    0-7 is floor states
    @see Tile for object names
*/

class Level {

    constructor (indexX, indexY, sizeX, sizeY, code) {

        this.index = {
            
            x: indexX,
            y: indexY

        };

        this.size = {
            
            x: sizeX,
            y: sizeY
            
        }
        
        this.code = code;

    }

}

var LEVELS = [];

LEVELS[0] = [new Level (0, 0, 31, 16, '9!6!1l9!6!/9!6!109!6!/9!6!109!6!/9!1c5!109!6!/1c203!201!105!205!1c2!2c2!2c/1c201!2c401c3!1c304!502!20/2!803!504!90/4!302c103!401c3!9010/4!302!103!404!702!1c/4!302!103!404!702!1c/4!3c2!202!403!301c2!203!/5!1c4!102!403!101!1c3!2c3!/9!1!1c90109!1!/9!2!1c701c9!2!/9!3!1c501c9!3!/9!4!201P209!4!/')];
LEVELS[1] = [new Level (0, 1, 33, 16, '9!7!109!7!/2!102!101!101c3!1c101!201!402c5!103!/1!2c90402c104!1c4!201c2!/1!204!1e801c204!102!1c1!302!/1!204!402c604!102!502!/1!204!301c2!602!302!202c201!/90103!201c2!1c401e402!201l/1l403!1c103!204!605!30/1!202c3!1c102!304!605!201!/1!206!604!605!102!/1!206!402c102!705!102!/1!206!402!603!101c3!1c102!/2!901e102!402c3!701c1!/3!2c4!1c2!1c2!302!1c4!104!1c2!/9!7!1P9!7!/9!7!1L9!7!/')];
LEVELS[2] = [new Level (0, 2, 6, 1, '401L1P/'), new Level (1, 2, 6, 1, '1P1L40/')]
LEVELS[3] = [];
LEVELS[4] = [];
LEVELS[5] = [];
LEVELS[6] = [];
LEVELS[7] = [];
LEVELS[8] = [];
