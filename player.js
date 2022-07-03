class Player extends Entity {

    static size;
    static speed;
    static images;
    static animationRate = 0.05;

    constructor (posX, posY, score = 0, level = 0) {

        super(posX, posY, Player.size.x, Player.size.y, Player.speed.x, Player.speed.y, Player.images['idle'][0]);

        this.score = score;
        this.level = level;

        this.weapon = new Weapon ();

        this.moving = false;
        this.direction = 1;

        this.animationState = 0;
        this.animationRate = Player.animationRate;

    }

    draw () {

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