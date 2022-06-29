var simRate, targetFPS, simSpeed; // Initialise global framerate variables
var world, player; // Initialise global level variables

/** Initialise all variables and create p5.Canvas
 * 
 *  @see preload()
 * 
 *  @author Jakob
 * 
 */

function setup () {

    // Setup p5.js canvas object

    createCanvas(windowWidth, windowHeight);
    noSmooth()

    // Populate framerate variables

    simRate = 1; // Ensure movement is constant, is 1 at 60fps, 2 at 30fps and 0.5 at 120fps
    targetFPS = 60; // Game target framerate
    simSpeed = 1000 / targetFPS; // Game target time per frame (ms)
    frameRate(targetFPS); // Set target framerate

    // Start background music

    audioHandler.playlist["backgroundMusic"].loop();

    // Initialise statics

    Tile.size = width / 24;

    Player.size = {

        x: Tile.size / 2,
        y: Tile.size

    }

    Player.speed = {

        x: width / 256,
        y: width / 256

    }

    Player.images = {

        'idle': imageHandler.sprites['player/idle'], 
        'run': imageHandler.sprites['player/run'], 
        'hit': imageHandler.sprites['player/hit'][0]

    }

    Enemy.size = {

        x: width / 96,
        y: width / 32

    }

    Enemy.speed = {

        x: width / 320,
        y: width / 320

    }

    Enemy.images = {

        'idle': imageHandler.sprites['demon/idle'], 
        'run': imageHandler.sprites['demon/run']

    };


    // Create world

    world = new Surface (LEVEL);

    player = new Player (width / 2, height / 2);

}