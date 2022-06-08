const tileSets = [ // Contains [lower, upper, "filePath"] for all tile sets

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

const imageList = [ // Contains "filePath" for singular images

    "ladder",
    "player/hit"

];


class ImageHandler { // Handles all DOM to canvas images and favicon animation

    static iconAnimationRate = 4; // Animation changes of the favicon per second (max ≈ 5)

    constructor (imagePath) { // Handler is created with a path to the image folder

        /* Dictionary of all sprites as p5.js images 
        {"image": [image1, image2]} */
        this.sprites = {};

        this.path = imagePath; // Path to image folder

    }

    loadImages (...imageFiles) { // Array of ["imageName1", "imageName2"] within image folder

        for (let fileName of imageFiles) {

            // Insert p5.js image into sprite dictionary
            // 0 is added for forward compatability with animations so it starts at 0 and ends at 0
            this.sprites[`${fileName}`] = loadImage(`../${this.path}/${fileName}0.png`); // Load p5.js image

        }

    }

    loadTileSets (...imageFolders) { // 2d Array of [[lower, upper, "imageFolder"]...]

        for (let tileSet of imageFolders) {

            this.sprites[`${tileSet[2]}`] = []; // Initialise empty array for images in sprites["imageFolder"]

            for (let index = tileSet[0]; index <= tileSet[1]; index ++) { // For every image in the tile set

                let header = tileSet[2]; // Set folder name
                let fileName = (header.includes("/")) ? header.split("/")[1] : header; /* If file is within another folder remove the folder name
                "folderName/fileName" => "fileName" */

                this.sprites[`${header}`].push(loadImage(`../${this.path}/${header}/${fileName}${index}.png`)); // Load p5.js image

            }

        }

    }

    loadFavicon (...tileSet) { // Load tile set for animated favicon

        this.icon = {}; // Icon related variables
        this.icon.dom = document.getElementById("favicon"); // HTML icon element

        this.icon.parentNode = this.icon.dom.parentNode; // Get the parent node of the icon (Usually HTML header)
        
        this.icon.sprites = []; // Set of sprites paths for animated favicon

        let lower = tileSet[0];
        let upper = tileSet[1];

        let header = tileSet[2]; // Set folder name
        let fileName = (header.includes("/")) ? header.split("/")[1] : header; /* If file is within another folder remove the folder name
        "folderName/fileName" => "fileName" */        

        for (let index = lower; index <= upper; index ++) {

            this.icon.sprites.push(`../${this.path}/${header}/${fileName}${index}.png`); // Push sprite path to array

        }

        this.icon.current = 0; // Current sprite is the first
        this.icon.update = 0; // Time since last update is 0

    }

    animateFavicon () { // Update favicon in browser

        if (millis() - this.icon.update > 1000 / ImageHandler.iconAnimationRate) { // If it is time for favicon to update

            this.icon.update = millis(); // Set time of last update to now
            this.icon.current = (this.icon.current + 1) % this.icon.sprites.length; // Increment sprite

            let newFavicon = this.icon.dom.cloneNode(true); // Create a deep copy of the icon element
            newFavicon.setAttribute("href", `${this.icon.sprites[this.icon.current]}`); // Update new icon link to new image
            
            // Icon must be removed and added to force browser to update it
            
            this.icon.parentNode.removeChild(this.icon.dom); // Remove current icon from HTML
            this.icon.parentNode.appendChild(newFavicon); // Add new icon to HTML

            // Update ImageHandler icon to new icon

            this.icon.dom = newFavicon;

        }

    }

}