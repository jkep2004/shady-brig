/** Main loop within game
 * 
 *  @see setup()
 * 
 *  @author Jakob
 * 
 */

function draw () {

    // Framerate

    simRate = deltaTime / simSpeed; // Update simRate from current deltaTime

    // Browser
    
    imageHandler.animateFavicon();
    
    playBackgroundMusic();

    // Canvas

    background(100);

}