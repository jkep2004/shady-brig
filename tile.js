class Tile {

    static size;

    constructor (indexX, indexY, tileType, parentLevel) {

        this.index = {

            x: indexX,
            y: indexY

        }

        this.pos = {

            x: indexX * Tile.size,
            y: indexY * Tile.size

        }

        this.level = parentLevel;

        this.imageNum = tileType;
        this.object = null;

        switch (tileType) {

            case 0: // Any floor sprite
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:

                this.image = imageHandler.sprites['floor'][tileType];

                break;

            case 'l': // Down ladder

                this.image = imageHandler.sprites['ladder'][0];
                this.object = new Ladder (this.pos.x, this.pos.y, Tile.size, Tile.size, 1);

                break;

            case 'L': // Up ladder

                this.image = imageHandler.sprites['ladder'][0];
                this.object = new Ladder (this.pos.x, this.pos.y, Tile.size, Tile.size, -1);

                break;

            case 'e': // Enemy

                this.image = imageHandler.sprites[floor][0];
                this.parentLevel.enemies.push(new Enemy (this.pos.x, this.pos.y, Enemy.speed));

                break;

            case 'c': // Coin

                break;

            case 's': // Spikes (No offset)

                break;

            case 'S': // Spikes (Offset by 1/2 a period)

                break;

            case 'b': // Blue tube

                break;

            case 'B': // Blue flask

                break;

            case 'g': // Green tube

                break;

            case 'G': // Green flask

                break;

            case 'o': // Orange tube

                break;

            case 'O': // Orange flask

                break;

            case 'y': // Yellow tube

                break;

            case 'Y': // Yellow flask

                break;

            case 's': // Red switch

                break;

            case 'S': // Blue switch

                break;

            case 'a': // Red actuator

                break;

            case 'A': // Blue actuator

                break;

        }

    }

    draw () {

        image(this.image, this.pos.x, this.pos.y, Tile.size, Tile.size);

    }

}