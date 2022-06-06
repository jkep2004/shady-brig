class Entity {

    static draw = function (posX, posY, sizeX, sizeY, image) {

    	image(image, posX, posY, sizeX, sizeY);

    }

    constructor () {

		

    }

	draw () {

		image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);

	}

}