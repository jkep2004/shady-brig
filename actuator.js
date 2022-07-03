class Actuator {

    static images;

    constructor (posX, posY, color, state = false, parent, surface) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.parent = parent;
        this.surface = surface;

        this.images = Actuator.images[color];
        this.color = color;
        this.state = (state) ? 1: 0;

        this.show = true;

    }

    draw () {

        if (this.show) image(this.images[this.state], this.pos.x, this.pos.y, Tile.size, Tile.size);

    }

}


class Switch {

    static images;
    static delay = 500;

    constructor (posX, posY, color, state = false, parent, surface) {

        this.pos = {

            x: posX,
            y: posY

        }

        this.parent = parent;
        this.surface = surface;

        this.images = Switch.images[color];
        this.color = color;
        this.state = (state) ? 1: 0;

        this.last = millis();

        this.show = true;

    }

    draw () {

        if (this.show) image(this.images[this.state], this.pos.x, this.pos.y, Tile.size, Tile.size);

    }

    flip () {

        if (this.last - millis() > Switch.delay) {

            actuated[this.color] = !actuated[this.color];
    
            for (let actuator of this.surface.switches[this.color]) {
    
                actuator.state = !actuator.state;
    
            }
    
            for (let actuator of this.surface.actuators[this.color]) {
    
                actuator.state = !actuator.state;
    
            }

            this.last = millis();
    
        }

    }


}