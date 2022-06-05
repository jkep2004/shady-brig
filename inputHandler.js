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