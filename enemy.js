class Enemy extends Entity {

    static size;
    static speed;
    static images;

    static animationRate = 0.05;

    constructor (posX, posY) {

        super(posX, posY, Enemy.size.x, Enemy.size.y, Enemy.speed.x, Enemy.speed.y, Enemy.images['idle'][0]);

        this.moving = false;
        this.direction = 1;

        this.animationState = 0;
        this.animationRate = Enemy.animationRate;

    }

    draw () {

        if (!this.show) return;

        if (this.moving) {

            push();

            scale(this.direction, 1);

            if (this.direction == 1) {

                image(Enemy.images['run'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            } else {

                image(Enemy.images['run'][Math.floor(this.animationState)], - this.size.x - this.pos.x, this.pos.y, this.size.x, this.size.y);

            }

            this.animationState = (this.animationState + (this.animationRate * 2 * simRate)) % 4;

            pop();

        } else {

            push();

            scale(this.direction, 1);

            if (this.direction == 1) {

                image(Enemy.images['idle'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            } else {

                image(Enemy.images['idle'][Math.floor(this.animationState)], - this.size.x - this.pos.x, this.pos.y, this.size.x, this.size.y);

            }

            this.animationState = (this.animationState + (this.animationRate * simRate)) % 4;

            pop();

        }

    }

    update () {

        // pathfind to player

    }

}