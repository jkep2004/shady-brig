var simRate, targetFPS, simSpeed; // Initialise global framerate variables

function setup () {

    // Setup p5.js canvas object

    createCanvas(windowWidth, windowHeight);

    // Populate framerate variables

    simRate = 1; // Ensure movement is constant, is 1 at 60fps, 2 at 30fps and 0.5 at 120fps
    targetFPS = 60; // Game target framerate
    simSpeed = 1000 / targetFPS; // Game target time per frame (ms)
    frameRate(targetFPS); // Set target framerate

}

function draw () {

    simRate = deltaTime / simSpeed; // Update simRate from current deltaTime
    

}
