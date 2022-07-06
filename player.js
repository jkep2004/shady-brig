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
        this.mesh = new Mesh (this.pos.x, this.pos.y + this.size.y * 0.25, this.size.x, this.size.y * 0.75);

        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.isHit = false;
        this.hitDelay = 500;
        this.hitTimeout;

        this.moving = false;
        this.direction = 1;

        this.animationState = 0;
        this.animationRate = Player.animationRate;

    }

    draw () {

        let indexY = (Math.floor(this.pos.y / Tile.size) >= 0 && Math.floor(this.pos.y / Tile.size) < this.surface.size.y) ? Math.floor(this.pos.y / Tile.size) : null;
        let indexX = (Math.floor(this.pos.x / Tile.size) >= 0 && Math.floor(this.pos.x / Tile.size) < this.surface.size.x) ? Math.floor(this.pos.x / Tile.size) : null;

        if (indexY && indexX && this.surface.tiles[indexY][indexX] && this.surface.tiles[indexY][indexX].object == null) {

            this.last = {

                x: indexX,
                y: indexY

            }

        }

        if (!this.show) return;

        if (this.isHit) {

            push();

            scale(this.direction, 1);

            image(Player.images['hit'], this.direction * this.pos.x, this.pos.y, this.direction * this.size.x, this.size.y);

            pop();
            return;

        }

        if (this.moving) {

            push();

            scale(this.direction, 1);

            image(Player.images['run'][Math.floor(this.animationState)], this.direction * this.size.x, this.pos.y, this.direction * this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * 2 * simRate)) % 4;

            pop();

        } else {

            push();

            scale(this.direction, 1);

            image(Player.images['idle'][Math.floor(this.animationState)], this.direction * this.pos.x, this.pos.y, this.direction * this.size.x, this.size.y);

            this.animationState = (this.animationState + (this.animationRate * simRate)) % 4;

            pop();

        }

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