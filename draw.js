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

    if (updateObjects) inputHandler.handlePlayer(keys, world.player);
    if (updateObjects) inputHandler.handleMouse(keys, world, world.player);
    if (updateObjects) inputHandler.handleKeyboard(keys, world, world.player);

    if (updateObjects) world.updateEnemies();

    if (updateObjects) CollisionHandler.playerObjectCollisions(world, world.player, world.enemies, world.coins, world.ladders, world.potions);
    
    background(BACKGROUND); // Color background
    inputHandler.draw['lowHealth'](inputHandler, world.player);

    push(); // Save current translation

    translate(width / 2 - world.player.pos.x, height / 2 - world.player.pos.y);

    world.draw(); // Draw tiles and objects
    world.drawEdges('up', 'left'); // Draw top edges

    world.player.draw(); // Draw player
    
    world.drawEdges('down', 'right'); // Draw bottom edges

    // DEBUG
    
    // if (updateObjects) Mesh.draw(world.player.mesh.pos.x, world.player.mesh.pos.y, world.player.mesh.size.x, world.player.mesh.size.y); // DEBUG - draw player collision
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.ladders);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.coins);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.enemies);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.potions);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.switches['red']);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.actuators['red']);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.switches['blue']);
    // if (updateObjects) CollisionHandler.drawArrayMeshBox(world.actuators['blue']);

    if (updateObjects) {

        for (let row of world.tiles) {

            for (let tile of row) {

                if (!tile || !tile.mesh) continue;

                // CollisionHandler.drawDictCollisionBox(tile.mesh);

            }

        }

    }

    pop();

    inputHandler.draw['hotbar'](inputHandler);
    inputHandler.draw['hearts'](inputHandler, world.player);
    inputHandler.draw['score'](inputHandler, world.player);

    if (!updateObjects) {

        fill(0, fadeAlpha);
        stroke(0);
        strokeWeight(2);
        rect(0, 0, width, height);

    }

}