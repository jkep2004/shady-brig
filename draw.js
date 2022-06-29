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
    
    playBackgroundMusic(audioHandler);

    // Canvas

    background(100);
    world.draw();
    player.draw();

    Entity.drawCollisionBox(player.pos.x, player.pos.y, player.size.x, player.size.y);

}