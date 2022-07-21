class Player extends Entity {

    static size;
    static speed;
    static images;
    static animationRate = 0.05;

    constructor (posX, posY, score = 0, level = 0, parentLevel) {

        super(posX, posY, Player.size.x, Player.size.y, Player.speed.x, Player.speed.y, Player.images['idle'][0]);

        this.score = score;
        this.level = level;
        this.keys = 0;

        this.surface = parentLevel;
        this.last = {};

        this.weapon = new Weapon ();
        this.mesh = new Mesh (this.pos.x, this.pos.y + this.size.y * 0.25, this.size.x, this.size.y * 0.75);

        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.isHit = false;
        this.hitDelay = 500;
        this.hitTimeout;

        this.moving = false;
        this.imageDirection = 1;

        this.animationState = 0;
        this.animationRate = Player.animationRate;

    }

    draw () {

        let indexY = (Math.round(this.pos.y / Tile.size) >= 0 && Math.round(this.pos.y / Tile.size) < this.surface.size.y) ? Math.round(this.pos.y / Tile.size) : null;
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

        if (this.isHit) {

            image(Player.images['hit'], this.imageDirection * this.pos.x, this.pos.y, this.imageDirection * this.size.x, this.size.y);
            
            pop();
            return;

        }

        if (this.moving) {

            image(Player.images['run'][Math.floor(this.animationState)], this.imageDirection * this.pos.x, this.pos.y, this.imageDirection * this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * 2 * simRate)) % 4;

        } else {

            image(Player.images['idle'][Math.floor(this.animationState)], this.imageDirection * this.pos.x, this.pos.y, this.imageDirection * this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * simRate)) % 4;

        }

        pop();

    }

    hit () {

        if (!this.isHit) {

            this.changeHealth(-1);

            if (this.hitTimeout) {

                clearTimeout(this.hitTimeout);
    
            } 
    
            this.hitTimeout = window.setTimeout(() => {
    
                this.isHit = false;
    
            }, this.hitDelay)

        }

        this.isHit = true;

    }

    changeHealth (change) {

        if (change < 0) {

            this.health += change;

            if (this.health <= 0) this.die();

        } else if (change > 0) {

            this.health += change;

            if (this.health > this.maxHealth) this.health = this.maxHealth;

        }

    }

    die () {

        updateObjects = false;

        let resetTime = 1000;
        fadeAlpha = 0;
        
        window.setInterval(() => {

            fadeAlpha += 10;

        }, resetTime / 30);

        window.setTimeout(() => {

            document.location.reload(true);

        }, resetTime)

        // TODO

    }

}