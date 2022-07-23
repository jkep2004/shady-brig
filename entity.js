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
		this.show = true;

		this.dir = {x: 0, y:0};

    }

	/** Draw entity on canvas
	 * 
	 * @author Jakob
	 * 
	 */

	draw () {

		if (this.show) image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);

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

		this.dir = {x: xDir, y: yDir};

		if (xDir || yDir) this.moving = true;

		this.pos.x += this.speed.x * xDir * simRate;
		this.mesh.pos.x += this.speed.x * xDir * simRate;
		CollisionHandler.entityToWall(this.surface, this, 'left');
		CollisionHandler.entityToWall(this.surface, this, 'right');
		CollisionHandler.entityToActuator(this.surface, this, 'left');
		CollisionHandler.entityToActuator(this.surface, this, 'right');

		this.pos.y += this.speed.y * yDir * simRate;
		this.mesh.pos.y += this.speed.y * yDir * simRate;
		CollisionHandler.entityToWall(this.surface, this, 'up');
		CollisionHandler.entityToWall(this.surface, this, 'down');
		CollisionHandler.entityToActuator(this.surface, this, 'up');
		CollisionHandler.entityToActuator(this.surface, this, 'down');

		if (xDir == 0) return;

		this.imageDirection = Math.sign(xDir);

	}

}