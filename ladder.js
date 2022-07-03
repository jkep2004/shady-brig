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

    draw () {



    }

    changeLevel (surface, player) {

        LEVELS[player.level] = Surface.saveLevel(surface, player);

        let timeout = 1000;
        let time = millis();
        updateObjects = false;

        let fadeToBlack = setInterval((surface, player) => {

            fadeAlpha = Math.sin(map(millis() - time, 0, timeout, 0, PI)) * 255;

        }, 1000 / targetFPS)

        window.setTimeout(() => {

            world = new Surface(LEVELS[player.level + this.direction], player);
            player.level += this.direction;
            player.surface = world;

        }, Math.floor(timeout / 2))

        window.setTimeout(() => {

            clearInterval(fadeToBlack);
            fadeAlpha = 0;

            updateObjects = true;

        }, timeout)

    }

}