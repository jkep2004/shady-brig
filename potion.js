class Potion {

    static size;
    static images = {};

    constructor (posX, posY, sizeX, sizeY, potionColor, potionSize, parentTile, index) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.size = {

            x: sizeX,
            y: sizeY

        }

        this.index = index;

        this.show = true;

        this.mesh = new Mesh (this.pos.x, this.pos.y, this.size.x, this.size.y);

        this.potionSize = potionSize;

        this.tile = parentTile;
        this.surface = this.tile.level;

        switch (potionColor) {

            case 'blue':

                this.image = Potion.images[this.potionSize][0];

                this.effect = function () {

                    // UNUSED

                    this.surface.potions.splice(this.index, 1);
                    this.tile.object = null;

                    for (let potion in this.surface.potions) {

                        this.surface.potions[potion].index = potion;

                    }

                }

                break;

            case 'green': // Build

                this.image = Potion.images[this.potionSize][1];

                this.effect = function (player) { // TODO

                    let size = (this.potionSize == 'tube') ? 1: 3;
                    
                    if (player.dir.x != 0) {

                        if (player.dir.x == 1) {



                        } else {



                        }

                    } else if (player.dir.y != 0) {

                        if (player.dir.y == 1) {



                        } else {

                            

                        }

                    }

                    this.surface.potions.splice(this.index, 1);
                    this.tile.object = null;

                    for (let potion in this.surface.potions) {

                        this.surface.potions[potion].index = potion;

                    }

                }

                break;

            case 'orange': // Health

                this.image = Potion.images[this.potionSize][2];

                this.effect = function (player) {

                    let size = (this.potionSize == 'tube') ? 1: 2;

                    player.changeHealth(size);

                    this.surface.potions.splice(this.index, 1);
                    this.tile.object = null;

                    for (let potion in this.surface.potions) {

                        this.surface.potions[potion].index = potion;

                    }

                }

                break;

            case 'yellow': // Key

                this.image = Potion.images[this.potionSize][3];

                this.effect = function (player) {

                    player.keys += 1;

                    this.surface.potions.splice(this.index, 1);
                    this.tile.object = null;

                    for (let potion in this.surface.potions) {

                        this.surface.potions[potion].index = potion;

                    }

                }

                break;

        }

    }

    draw () {

        if (this.show) image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);

    }

}