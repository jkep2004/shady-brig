class Enemy extends Entity {

    static size;
    static speed;
    static images;

    static animationRate = 0.02;

    constructor (posX, posY) {

        super(posX, posY, Enemy.size.x, Enemy.size.y, Enemy.speed.x, Enemy.speed.y, Enemy.images['idle'][0]);

        this.moving = false;

        this.animationState = 0;
        this.animationRate = Enemy.animationRate;

    }

    draw () {

        if (this.moving) {

            image(Enemy.images['run'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * 2)) % 4;

        } else {

            image(Enemy.images['idle'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            this.animationState = (this.animationState + this.animationRate) % 4;

        }

    }

}