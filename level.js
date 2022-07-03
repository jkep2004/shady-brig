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

    constructor (code, sizeX, sizeY) {

        this.code = code;

        this.size = {

            x: sizeX,
            y: sizeY

        }

    }

}

const LEVELS = [
    new Level ('9!6!109!6!/9!6!109!6!/9!6!109!6!/9!105!109!6!/303!201!105!205!102!202!20/301!703!404!502!20/2!803!504!90/4!603!503!9010/4!302!103!404!702!10/4!302!103!404!702!10/4!302!202!403!402!203!/5!104!102!403!101!103!203!/9!1!90209!1!/9!2!909!2!/9!3!709!3!/9!4!201P209!4!/', 31, 16),
    ];