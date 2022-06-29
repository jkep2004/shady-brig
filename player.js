class Player extends Entity {

    static size;
    static speed;
    static images;
    static animationRate = 0.05;

    constructor (posX, posY) {

        super(posX, posY, Player.size.x, Player.size.y, Player.speed.x, Player.speed.y, Player.images['idle'][0]);

        this.weapon = new Weapon ();
        this.moving = false;

        this.animationState = 0;
        this.animationRate = Player.animationRate;

        console.log(this)

    }

    draw () {

        if (this.hit) {
            
            image(Player.images['hit'], this.pos.x, this.pos.y, this.size.x, this.size.y);
            return;

        }

        if (this.moving) {

            image(Player.images['run'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * 2)) % 4;

        } else {

            image(Player.images['idle'][Math.floor(this.animationState)], this.pos.x, this.pos.y, this.size.x, this.size.y);

            this.animationState = (this.animationState + this.animationRate) % 4;

        }

    }

}