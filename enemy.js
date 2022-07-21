class Enemy extends Entity {

    static size;
    static speed;
    static images;

    static animationRate = 0.05;

    constructor (posX, posY, index, surface) {

        super(posX, posY, Enemy.size.x, Enemy.size.y, Enemy.speed.x, Enemy.speed.y, Enemy.images['idle'][0]);

        this.last = {};

        this.moving = false;
        this.imageDirection = 1;

        this.reachedNode = true;
        this.path = [];
        this.target;

        this.index = index;

        this.mesh = new Mesh (this.pos.x , this.pos.y, this.size.x, this.size.y);

        this.surface = surface;

        this.animationState = 0;
        this.animationRate = Enemy.animationRate;

    }

    draw () {

        let indexY = (Math.round(this.pos.y / Tile.size) >= 0 && Math.round(this.pos.y / Tile.size)  < this.surface.size.y) ? Math.round(this.pos.y / Tile.size)  : null;
        let indexX = (Math.round(this.pos.x / Tile.size) >= 0 && Math.round(this.pos.x / Tile.size) < this.surface.size.x) ? Math.round(this.pos.x / Tile.size) : null;
        
        if (indexY && indexX && this.surface.tiles[indexY][indexX] && this.surface.tiles[indexY][indexX].object == null) {

            this.last = {

                x: indexX,
                y: indexY

            }

        }

        if (!this.show) return;

        push();

        scale(this.imageDirection, 1);

        if (this.moving) {

            image(Enemy.images['run'][Math.floor(this.animationState)], this.imageDirection * this.pos.x, this.pos.y, this.imageDirection * this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * 2 * simRate)) % 4;

        } else {

            image(Enemy.images['idle'][Math.floor(this.animationState)], this.imageDirection * this.pos.x, this.pos.y, this.imageDirection * this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * simRate)) % 4;

        }

        pop();

    }

}