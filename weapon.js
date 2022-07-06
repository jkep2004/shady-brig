class Weapon extends Entity {

    constructor (posX, posY, sizeX, sizeY, image) {

        super (posX, posY, sizeX, sizeY, 0, 0, image);

        this.mesh = new Mesh (this.pos.x, this.pos.y, this.size.x, this.size.y);

    }

}