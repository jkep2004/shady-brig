function draw () {

    //Fps related functions

    simRate = deltaTime / simSpeed; // Update simRate from current deltaTime

    // Browser related functions
    
    imageHandler.animateFavicon();
    
    playBackgroundMusic();

    // Canvas related functions

    background(100);

}