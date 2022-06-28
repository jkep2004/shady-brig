class Entity {

	/** Draw any image
	 *	Draw given image at set position and size (From top-left corner)
	 *
	 *	@param {Number} posX \<int> X position of image on canvas
	 *	@param {Number} posY \<int> Y position of image on canvas
	 *	@param {Number} sizeX \<int> X size of image on canvas
	 *	@param {Number} sizeY \<int> Y size of image on canvas
	 *	@param {p5.Image} imageEle \<p5.Image> Image to be drawn on canvas
	 *
	 *	@author Jakob
	 *
	*/
	
    static draw = function (posX, posY, sizeX, sizeY, imageEle) {

		imageMode(CORNER);
		image(imageEle, posX, posY, sizeX, sizeY);

    }

	/** Entity object for drawing and moving images
	 * 	- Entity contains position, size and speed of object to be drawn to canvas
	 * 
	 *	@param {Number} posX \<int> X position of entity on canvas
	 *	@param {Number} posY \<int> Y position of entity on canvas
	 *	@param {Number} sizeX \<int> X size of entity on canvas
	 * 	@param {Number} sizeY \<int> Y size of entity on canvas
	 *	@param {Number} speedX \<int> X speed (Distance moved when updated) of entity on canvas
	 *	@param {Number} speedY \<int> Y speed (Distance moved when updated) of entity on canvas
	 *	@param {p5.Image} image \<p5.Image> entity to be drawn on canvas
	 * 
	 *	@author Jakob
	 *
	 */

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

	/** Draw entity on canvas
	 * 
	 * @author Jakob
	 * 
	 */

	draw () {

		image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);

	}

	/** Move entity on canvas
	 * - Update entity position on canvas with respect to current deltaTime
	 * 
	 * @param {Number} xDir \<int> Any number from [-1, 0, 1] for [Left, No movement, Right]
	 * @param {Number} yDir \<int> Any number from [-1, 0, 1] for [Up, No movement, Down]
	 * 
	 * @author Jakob
	 * 
	 */

	update (xDir, yDir) {

		this.pos.x += this.speed.x * xDir * simSpeed;
		this.pos.y += this.speed.y * yDir * simSpeed;

	}

}