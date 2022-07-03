class Player extends Entity {

    static size;
    static speed;
    static images;
    static animationRate = 0.05;

    constructor (posX, posY, score = 0, level = 0, parentLevel) {

        super(posX, posY, Player.size.x, Player.size.y, Player.speed.x, Player.speed.y, Player.images['idle'][0]);

        this.score = score;
        this.level = level;

        this.surface = parentLevel;
        this.last = {}

        this.weapon = new Weapon ();

        this.moving = false;
        this.direction = 1;

        this.animationState = 0;
        this.animationRate = Player.animationRate;

    }

    draw () {

        let indexY = (Math.floor(this.pos.y / Tile.size) >= 0) ? Math.floor(this.pos.y / Tile.size) : 1;
        let indexX = (Math.floor(this.pos.x / Tile.size) >= 0) ? Math.floor(this.pos.x / Tile.size) : 1;

        if (this.surface.tiles[indexY][indexX] && this.surface.tiles[indexY][indexX].object == null) {

            this.last = {

                x: indexX,
                y: indexY

            }

        }

        if (!this.show) return;

        if (this.hit) {
            
            image(Player.images['hit'], this.pos.x, this.pos.y, this.size.x, this.size.y);
            return;

        }

        if (this.moving) {

            push();

            scale(this.direction, 1);

            if (this.direction == 1) {

                image(Player.images['run'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            } else {

                image(Player.images['run'][Math.floor(this.animationState)], - this.size.x - this.pos.x, this.pos.y, this.size.x, this.size.y);

            }

            this.animationState = (this.animationState + (this.animationRate * 2 * simRate)) % 4;

            pop();

        } else {

            push();

            scale(this.direction, 1);

            if (this.direction == 1) {

                image(Player.images['idle'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            } else {

                image(Player.images['idle'][Math.floor(this.animationState)], - this.size.x - this.pos.x, this.pos.y, this.size.x, this.size.y);

            }

            this.animationState = (this.animationState + (this.animationRate * simRate)) % 4;

            pop();

        }

    }

}