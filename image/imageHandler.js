const tileSets = [

    [0, 1, "actuator/blue"],
    [0, 1, "actuator/red"],
    [0, 3, "coin"],
    [0, 3, "demon/idle"],
    [0, 3, "demon/run"],
    [0, 4, "edge"],
    [0, 7, "floor"],
    [0, 2, "heart"],
    [0, 3, "player/idle"],
    [0, 3, "player/run"],
    [0, 3, "potion/flask"],
    [0, 3, "potion/tube"],
    [0, 3, "spikes"],
    [0, 1, "switch/blue"],
    [0, 1, "switch/red"],
    [0, 2, "wall"],
    [0, 20, "weapon"]

];

const imageList = [

    "ladder",
    "player/hit"

];


class ImageHandler {

    constructor (imagePath) {

        this.sprites = {};

        this.path = imagePath;

    }

    loadImages (...imageFiles) {

        for (let fileName of imageFiles) {

            this.sprites[`${imagePath}`] = loadImage(`../${this.path}/${imagePath}0.png`);

        }

    }

    loadTileSets (...imageFolders) {

        for (let tileSet of imageFolders) {

            this.sprites[`${tileSet[2]}`] = [];

            for (let x = tileSet[0]; x <= tileSet.upper[1]; x ++) {

                this.sprites[`${tileSet[2]}`].push(loadImage(`../${this.path}/${tileSet[2]}${x}.png`));

            }

        }

    }

}