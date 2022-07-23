class Actuator {

    static images; // Contains 'red' and 'blue' actuator images

    /** Controls switchable wall blocks (Actuators), 'red' and 'blue' are opposite
     *  
     *  @param {Number} posX \<int> X position of image on canvas
	 *	@param {Number} posY \<int> Y position of image on canvas
     *  @param {String} color \<str> Color of actuator 'blue' / 'red'
     *  @param {Boolean} state \<bool> Actuator collisions on / off
     *  @param {Tile} parent \<Tile> Tile this object is on
     *  @param {Surface} surface \<Surface> Surface this object is on
     * 
     *  @author Jakob
     * 
     */

    constructor (posX, posY, color, state = false, index, parent, surface) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.size = {

            x: Tile.size,
            y: Tile.size

        }

        this.mesh = {

            'up': new Mesh (this.pos.x, this.pos.y, this.size.x, 1),
            'down': new Mesh (this.pos.x, this.pos.y + this.size.y, this.size.x, 1),
            'left': new Mesh (this.pos.x, this.pos.y, 1, this.size.y),
            'right': new Mesh (this.pos.x + this.size.x, this.pos.y, 1, this.size.y)

        }

        this.index = index;

        this.parent = parent;
        this.surface = surface;

        this.images = Actuator.images[color];
        this.color = color;
        this.state = state;

        this.show = true;

    }

    /** Draw image to canvas
     * 
     *  @author Jakob
     * 
     */

    draw () {

        if (this.show) image(this.images[(this.state) ? 1 : 0], this.pos.x, this.pos.y, this.size.x, this.size.y);

    }

}


class Switch {

    static images; // Contains 'red' and 'blue' switch images
    static delay = 500; // Delay between switch activations

    /** Switch objects that control actuator states
     * 
     *  @param {Number} posX \<int> X location of switch on canvas
     *  @param {Number} posY \<int> Y location of switch on canvas
     *  @param {String} color \<str> Color of switch: 'red' or 'blue'
     *  @param {Boolean} state \<bool> State of switch
     *  @param {Tile} parent \<Tile> Parent tile of switch
     *  @param {Surface} surface \<Surface> Parent surface of switch
     *  
     *  @author Jakob
     * 
     */

    constructor (posX, posY, color, state = false, index, parent, surface) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.size = {

            x: Tile.size,
            y: Tile.size

        }

        this.parent = parent;
        this.surface = surface;

        this.mesh = new Mesh (this.pos.x, this.pos.y, this.size.x, this.size.y);

        this.index = index;

        this.images = Switch.images[color];
        this.color = color;
        this.state = state;

        this.last = millis();

        this.show = true;

    }

    /** Draw switch to canvas
     * 
     *  @author Jakob
     * 
     */

    draw () {

        if (this.show) image(this.images[(this.color == 'red') ? ((this.state) ? 1 : 0) : ((this.state) ? 0 : 1)], this.pos.x, this.pos.y, this.size.x, this.size.y);

    }

    /** Flip switch
     * 
     *  @author Jakob
     * 
     */

    flip () {

        if (millis() - this.last > Switch.delay) {

            for (let [color, state] of Object.entries(actuated)) {

                actuated[color] = !actuated[color];

                for (let switchObject of this.surface.switches[color]) {
    
                    switchObject.state = !switchObject.state;
        
                }
        
                for (let actuator of this.surface.actuators[color]) {
        
                    actuator.state = !actuator.state;
        
                }

            }

            this.last = millis();

            Surface.updateGrid(this.surface);
    
        }

    }


}