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

const LEVELSIZE = 5;

var LEVELS = new Array (LEVELSIZE);

for (let level = 0; level < LEVELSIZE; level ++) {

    LEVELS[level] = new Array (LEVELSIZE);

}

LEVELS[0][2] = new Level (2, 0, 31, 16, '9!6!1l9!6!/9!6!109!6!/9!6!109!6!/9!1c5!109!6!/1c203!201!105!205!1c2!2c2!2c/1c201!2c401c3!1c304!502!20/2!803!504!90/4!302c103!401c3!9010/4!302!103!404!702!1c/4!302!103!404!702!1c/4!3c2!202!403!301c2!203!/5!1c4!102!403!101!1c3!2c3!/9!1!1c90109!1!/9!2!1c701c9!2!/9!3!1c501c9!3!/9!4!201P209!4!/');

LEVELS[1][2] = new Level (2, 1, 33, 16, '9!7!109!7!/2!102!101!101c3!1c101!201!402c5!103!/1!2c90402c104!1c4!201c2!/1!204!1e801c204!102!1c1!302!/1!204!402c604!102!502!/1!2a4!301c2!602!302!202c201!/201a703!201c2!1c401e402!201J/1j101a203!1c103!204!605!30/1!2a2c3!1c102!304!605!201!/1!206!604!605!102!/1!206!402c102!705!102!/1!206!402!603!101c3!1c102!/2!901e102!402c3!701c1!/3!2c4!1c2!1c2!302!1c4!104!1c2!/9!7!1P9!7!/9!7!1L9!7!/');
LEVELS[1][1] = new Level (1, 1, 6, 6, '401J1P/60/60/60/60/60/');
LEVELS[1][3] = new Level (3, 1, 33, 13, '9!9!109!5!/9!9!109!5!/9!9!109!5!/6!606!1g9!5!/5!809!9!2!/4!206!1O109!9!1!/1j1P308!509!1!50/409!1!508!501J/9!9!206!205!/9!9!1!204!101O6!/9!9!2!607!/9!9!3!408!/9!9!9!6!/');
LEVELS[1][4] = new Level (4, 1, 33, 11, '7!1e1c8!1c9!6!/7!207!207!1c201o1c3!/7!202!104!109!1o204!/7!201!1c1g4!403c4!1c104!/7!504!401c1e1z5!101c3!/90206!109!6!/1j1P905!209!6!/7!401c4!109!7!/7!202!104!301c9!4!/7!202!1e4!102!104!1c101G6!/7!1c107!1c201g4!1o101c6!/')