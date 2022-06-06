class Entity {

	/* 	Draw any image
		Draw given image at set position and size (From top-left corner)

		@param {Number} posX <int> X position of image on canvas
		@param {Number} posY <int> Y position of image on canvas
		@param {Number} sizeX <int> X size of image on canvas
		@param {Number} sizeY <int> Y size of image on canvas
		@param

		@author Jakob
	
	*/
	
    static draw = function (posX, posY, sizeX, sizeY, image) {

		imageMode(CORNER);
    	image(image, posX, posY, sizeX, sizeY);

    }

    constructor (posX, posY, sizeX, sizeY, speedX, speedY, image) {

		this.pos = {

			x: posX,
			y: posY

		};

		this.size = {

			x: sizeX,
			y: sizeY

		};

		this.speed = {

			x: speedX,
			y: speedY

		}

		this.image = image;

    }

	draw () {

		image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);

	}

	update (xDir, yDir) {

		this.pos.x += this.speed.x * xDir * simSpeed;
		this.pos.y += this.speed.y * yDir * simSpeed;

	}

}