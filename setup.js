var simRate, targetFPS, simSpeed; // Initialise global framerate variables

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

}