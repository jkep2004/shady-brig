class Surface {

    static levelToCode = function (...tiles) {

        

    }

    constructor (levelCode) {

        this.tiles = new Array (levelSizeY);

        for (let index = 0; index < levelSizeY; index ++) {

            this.tiles[index] = new Array (levelSizeX);

        }

        levelCode = levelCode.split('/');

        for (let indexY = 0; indexY < levelSizeY; indexY ++) {

            let totalLength = 0;

            for (let index = 0; index < levelCode[indexY].length; index += 2) {

                let tileCount = parseInt(levelCode[indexY][index]);
                let tileType = parseInt(levelCode[indexY][index + 1]);

                for (let count = 0; count < tileCount; count ++) {

                    this.tiles[indexY][totalLength + count] = new Tile (totalLength + count, indexY, tileType);

                }

                totalLength += tileCount;
                
            }

        }
    
    }

    draw () {

        for (let row of this.tiles) {

            for (let tile of row) {

                tile.draw();

            }

        }

    }

}