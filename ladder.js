class Ladder {

    constructor (posX, posY, sizeX, sizeY, direction) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.size = {

            x: sizeX,
            y: sizeY

        }

        this.direction = direction;

    }

    changeLevel (surface, player) {

        let newLevel = player.level + this.direction;

        surface = new Surface (LEVELS[newLevel], player);
        surface.player.level = newLevel;

    }

}