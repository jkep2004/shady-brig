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

        this.mesh = {};

        this.edges = {};
        this.surrounding = {};

        this.level = parentLevel;

        this.imageNum = tileType;
        this.object = null;

        switch (this.imageNum) {

            case '0': // Any floor sprite
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':

                this.image = imageHandler.sprites['floor'][tileType];

                break;

            case 'l': // Down ladder

                this.createLadder(+1);

                break;

            case 'L': // Up ladder

                this.createLadder(-1);

                break;

            case 'e': // Enemy

                this.image = imageHandler.sprites['floor'][0];
                this.createEnemy();

                break;

            case 'c': // Coin

                this.image = imageHandler.sprites['floor'][0];
                this.createCoin();

                break;

            case 's': // Spikes (No offset)

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'S': // Spikes (Offset by 1/2 a period)

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'b': // Blue tube

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'B': // Blue flask

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'g': // Green tube

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'G': // Green flask

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'o': // Orange tube

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'O': // Orange flask

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'y': // Yellow tube

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 'Y': // Yellow flask

                this.image = imageHandler.sprites['floor'][0];

                break;

            case 's': // Red switch

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Switch (this.pos.x, this.pos.y, 'red', actuated.red, this, this.level)
                this.level.switches['red'].push(this.object);

                break;

            case 'S': // Blue switch

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Switch (this.pos.x, this.pos.y, 'blue', actuated.blue, this, this.level)
                this.level.switches['blue'].push(this.object);

                break;

            case 'a': // Red actuator

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Actuator (this.pos.x, this.pos.y, 'red', actuated.red, this, this.level);
                this.level.actuators['red'].push(this.object);

                break;

            case 'A': // Blue actuator

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Actuator (this.pos.x, this.pos.y, 'blue', actuated.blue, this, this.level);
                this.level.actuators['blue'].push(this.object);

                break;

            case 'P': // Player

                this.image = imageHandler.sprites['floor'][0];

                if (this.level.player) {
                    
                    this.level.player.pos.x = this.pos.x + Player.size.x / 2;
                    this.level.player.pos.y = this.pos.y;
                    this.level.player.mesh.pos.x = this.pos.x + Player.size.x / 2;
                    this.level.player.mesh.pos.y = this.pos.y - (this.level.player.mesh.size.y - this.level.player.size.y);
                    
                } else {
                    
                    this.level.player = new Player (this.pos.x + Player.size.x / 2, this.pos.y, 0, 0, this.level);

                }

        }

        this.show = true;

    }

    draw () {

        if (this.show) image(this.image, this.pos.x, this.pos.y, Tile.size, Tile.size);

        if (this.object) this.object.draw();

    }

    createCoin () {

        this.imageNum = 'c';
        this.object = new Coin (this.pos.x + Tile.size / 2 - Coin.size / 2, this.pos.y + Tile.size / 2 - Coin.size / 2, this, this.level.coins.length);
        this.level.coins.push(this.object);

    }

    createEnemy () {
        
        console.log(this.level.enemies)
        this.imageNum = 'e'
        this.level.enemies.push(new Enemy (this.pos.x, this.pos.y));

    }

    createLadder (direction) {

        this.image = imageHandler.sprites['ladder'][0];
        this.object = new Ladder (this.pos.x, this.pos.y, Tile.size, Tile.size, direction);
        this.level.ladders.push(this.object);
        this.imageNum = (direction == -1) ? 'L': 'l';

    }

}