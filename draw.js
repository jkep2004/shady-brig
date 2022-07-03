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
    
    imageHandler.animateFavicon(); // Animate the favicon
    
    playBackgroundMusic(audioHandler); // Attempt to play background music until DOM allows it

    // Canvas

    inputHandler.handlePlayer(keys);
    inputHandler.handleMouse(keys, world, world.player);
    inputHandler.handleKeyboard(keys, world);

    push(); // Save current translation

    translate(width / 2 - world.player.pos.x, height / 2 - world.player.pos.y);

    background(100); // Make background a light-grey

    world.draw(); // Draw tiles and objects
    world.drawEdges('up', 'left'); // Draw top edges

    world.player.draw(); // Draw player
    CollisionHandler.drawCollisionBox(world.player.pos.x, world.player.pos.y, world.player.size.x, world.player.size.y); // DEBUG - draw player collision
    
    world.drawEdges('down', 'right'); // Draw bottom edges

    pop();

}