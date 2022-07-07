class Ladder {

    constructor (posX, posY, sizeX, sizeY, currentSurface, nextLevel) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.size = {

            x: sizeX,
            y: sizeY

        }

        this.mesh = new Mesh (this.pos.x, this.pos.y, this.size.x, this.size.y);

        this.currentSurface = currentSurface;
        this.nextLevel = nextLevel;

    } 

    draw () {return false;} // This is useless as the object is drawn as a tile sprite

    changeLevel (player) {

        LEVELS[this.currentSurface.index.y][this.currentSurface.index.x] = Surface.saveLevel(this.currentSurface, player);

        let timeout = 1000;
        let time = millis();
        updateObjects = false;

        let fadeToBlack = setInterval((surface, player) => {

            fadeAlpha = Math.sin(map(millis() - time, 0, timeout, 0, PI)) * 255;

        }, 1000 / targetFPS)

        window.setTimeout(() => {

            world = Surface.loadLevel(this.nextLevel, player);

        }, Math.floor(timeout / 2))

        window.setTimeout(() => {

            clearInterval(fadeToBlack);
            fadeAlpha = 0;

            updateObjects = true;

        }, timeout)

    }

}