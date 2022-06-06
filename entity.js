class Entity {

    static draw = function (posX, posY, sizeX, sizeY, image) {

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