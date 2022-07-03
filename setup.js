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

    Tile.size = Math.floor(width / 24);

    Player.size = {

        x: Math.floor(Tile.size / 2),
        y: Tile.size

    }

    Player.speed = {

        x: Math.floor(width / 128),
        y: Math.floor(width / 128)

    }

    Player.images = {

        'idle': imageHandler.sprites['player/idle'], 
        'run': imageHandler.sprites['player/run'], 
        'hit': imageHandler.sprites['player/hit'][0]

    }

    Enemy.size = {

        x: Math.floor(width / 96),
        y: Math.floor(width / 32)

    }

    Enemy.speed = {

        x: Math.floor(width / 320),
        y: Math.floor(width / 320)

    }

    Enemy.images = {

        'idle': imageHandler.sprites['demon/idle'], 
        'run': imageHandler.sprites['demon/run']

    }

    Edge.size = {

        x: Tile.size,
        y: Tile.size,
        off: Tile.size / 4

    }

    // Create world

    world = new Surface (LEVELS[0]);

    inputHandler.surface = world;
    inputHandler.player = world.player;

}