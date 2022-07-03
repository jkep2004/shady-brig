class Edge {

    static size = {};

    constructor (indexX, indexY, posX, posY, side, parent) {

        this.index = {

            x: indexX,
            y: indexY

        }

        this.pos = {

            x: posX,
            y: posY

        }

        this.size = {};

        this.side = side;
        this.parent = parent;
        this.cap = [];

        switch (this.side) {

            case 'up':

                this.image = imageHandler.sprites['wall'][0];

                this.size.x = Edge.size.x;
                this.size.y = Edge.size.x;

                this.cap.push(new Edge (this.index.x, this.index.y, this.pos.x, this.pos.y - this.size.x + Edge.size.off, 'upC', this.parent));

                break;
            
            case 'upC':

                this.image = imageHandler.sprites['edge'][2];

                this.size.x = Edge.size.x;
                this.size.y = Edge.size.y;

            case 'down':

                this.image = imageHandler.sprites['edge'][2];

                this.size.x = Edge.size.x;
                this.size.y = Edge.size.y;

                break;
                
            case 'left':

                this.image = imageHandler.sprites['edge'][1];

                this.size.x = Edge.size.y;
                this.size.y = Edge.size.x;

                break;

            case 'right':

                this.image = imageHandler.sprites['edge'][0];

                this.size.x = Edge.size.y;
                this.size.y = Edge.size.x;

                break;

            case 'downRight':

                this.image = imageHandler.sprites['edge'][3];
                
                this.size.x = Edge.size.y;
                this.size.y = Edge.size.y;

                break;

            case 'downLeft':

                this.image = imageHandler.sprites['edge'][4];

                this.size.x = Edge.size.y;
                this.size.y = Edge.size.y;

                break;

        }

        this.show = true;

    }

    draw () {

        if (this.show) image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);

        if (this.cap.length != 0) {
            
            for (let cap of this.cap) {

                cap.draw();

            }

        }

    }

}