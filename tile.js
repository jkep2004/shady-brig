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
        }

    }

    draw () {

        image(this.image, this.pos.x, this.pos.y, Tile.size, Tile.size);

    }

}