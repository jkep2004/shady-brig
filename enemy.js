class Enemy extends Entity {

    static size;
    static speed;
    static images;

    static animationRate = 0.05;

    constructor (posX, posY, surface) {

        super(posX, posY, Enemy.size.x, Enemy.size.y, Enemy.speed.x, Enemy.speed.y, Enemy.images['idle'][0]);

        this.moving = false;
        this.imageDirection = 1;

        this.mesh = new Mesh (this.pos.x , this.pos.y, this.size.x, this.size.y);

        this.surface = surface;

        this.animationState = 0;
        this.animationRate = Enemy.animationRate;

    }

    draw () {

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