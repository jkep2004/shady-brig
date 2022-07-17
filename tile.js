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

        let type;

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

                this.createLadder(this.level, LEVELS[this.level.index.y + 1][this.level.index.x]);

                break;

            case 'L': // Up ladder

                this.createLadder(this.level, LEVELS[this.level.index.y - 1][this.level.index.x]);

                break;

            case 'j': // Left ladder

                this.createLadder(this.level, LEVELS[this.level.index.y][this.level.index.x - 1]);

                break;

            case 'J': // Right ladder

                this.createLadder(this.level, LEVELS[this.level.index.y][this.level.index.x + 1]);

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

            case 'b': // Blue tube - Mana

                type = 'tube';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'blue', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'B': // Blue flask - Mana

                type = 'flask';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'blue', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'g': // Green tube - Build

                type = 'tube';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'green', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'G': // Green flask - Build

                type = 'flask';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'green', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'o': // Orange tube - Heal

                type = 'tube';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'orange', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'O': // Orange flask - Heal

                type = 'flask';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'orange', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'y': // Yellow tube - Key

                type = 'tube';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'yellow', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 'Y': // Yellow flask - Key

                type = 'flask';

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Potion (this.pos.x + Tile.size / 2 - Potion.size[type] / 2, this.pos.y + Tile.size / 2 - Potion.size[type] / 2, Potion.size[type], Potion.size[type], 'yellow', type, this, this.level.potions.length);
                this.level.potions.push(this.object);

                break;

            case 's': // Red switch

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Switch (this.pos.x, this.pos.y, 'red', actuated.red, this.level.actuators.length, this, this.level)
                this.level.switches['red'].push(this.object);

                break;

            case 'S': // Blue switch

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Switch (this.pos.x, this.pos.y, 'blue', actuated.blue, this.level.actuators.length, this, this.level)
                this.level.switches['blue'].push(this.object);

                break;

            case 'a': // Red actuator

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Actuator (this.pos.x, this.pos.y, 'red', actuated.red, this.level.actuators.length, this, this.level);
                this.level.actuators['red'].push(this.object);

                break;

            case 'A': // Blue actuator

                this.image = imageHandler.sprites['floor'][0];
                this.object = new Actuator (this.pos.x, this.pos.y, 'blue', actuated.blue, this.level.actuators.length, this, this.level);
                this.level.actuators['blue'].push(this.object);

                break;

            case 'P': // Player

                this.image = imageHandler.sprites['floor'][0];

                if (this.level.player) {
                    
                    this.level.player.pos.x = this.pos.x + Player.size.x / 2;
                    this.level.player.pos.y = this.pos.y;
                    this.level.player.mesh.pos.x = this.pos.x + Player.size.x / 2;
                    this.level.player.mesh.pos.y = this.pos.y - (this.level.player.mesh.size.y - this.level.player.size.y);

                    this.level.player.last.x = this.index.x;
                    this.level.player.last.y = this.index.y;

                } else {
                    
                    this.level.player = new Player (this.pos.x + Player.size.x / 2, this.pos.y, 0, {x: 0, y: 0}, this.level);

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
        
        this.imageNum = 'e'
        this.level.enemies.push(new Enemy (this.pos.x, this.pos.y, this.level));

    }

    createLadder (currentSurface, nextLevel) {

        this.image = imageHandler.sprites['ladder'][0];
        this.object = new Ladder (this.pos.x, this.pos.y, Tile.size, Tile.size, currentSurface, nextLevel);
        this.level.ladders.push(this.object);

        console.log(currentSurface, nextLevel)

        if (currentSurface.index.y != nextLevel.index.y) this.imageNum = (currentSurface.index.y > nextLevel.index.y) ? 'L': 'l';
        if (currentSurface.index.x != nextLevel.index.x) this.imageNum = (currentSurface.index.x < nextLevel.index.x) ? 'J': 'j';

    }

}