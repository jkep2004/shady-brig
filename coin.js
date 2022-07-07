class Coin extends Entity {

    static size;
    static images;
    static audio;
    static animationRate = 4;

    constructor (posX, posY, parent, index) {

        super(posX, posY, Coin.size, Coin.size, 0, 0, Coin.images[0]);

        this.sprites = Coin.images;

        this.mesh = new Mesh (this.pos.x, this.pos.y, this.size.x, this.size.y);

        this.parent = parent;
        this.index = index;

        this.current = 0;
        this.update = 0;

    }

    draw () {

        if (millis() - this.update > 1000 / Coin.animationRate) { // If it is time for coin to update
            
            this.update = millis(); // Set time of last update to now
            this.current = (this.current + 1) % this.sprites.length; // Increment sprite
            
        }
        
        if (this.show) image(this.sprites[this.current], this.pos.x, this.pos.y, this.size.x, this.size.y);

    }

    collect (player) {

        Coin.audio.time(0);
        Coin.audio.play();
        player.score ++;

        this.parent.object = null;
        this.parent.level.coins.splice(this.index, 1);

        for (let index = 0; index < this.parent.level.coins.length; index ++) {

            this.parent.level.coins[index].index = index;

        }

    }

}