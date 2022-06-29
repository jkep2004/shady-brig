const keys = new Map (); // Create empty map to store currently pressed keys

function keyPressed () {

    let lowerKey = key.toLowerCase(); // Ensure all keys are lower case

    keys.set(lowerKey, true); // Insert the key into the map

    return false; // Prevent default

}

function keyReleased () {

    let lowerKey = key.toLowerCase(); // Ensure all keys are lower case

    keys.delete(lowerKey); // Delete the key from the map

    return false; // Prevent default

}

function mousePressed () {

    keys.set(`mouse${mouseButton}`, true);

    return false; // Prevent default

}

function mouseReleased () {

    keys.delete(`mouse${mouseButton}`, true);

    return false; // Prevent default

}

class InputHandler {

    

}
