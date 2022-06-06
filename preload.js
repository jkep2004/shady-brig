function preload () {

    imageHandler = new ImageHandler ("image");

    imageHandler.loadTileSets(...tileSets);
    imageHandler.loadImages(...imageList);

    audioHandler = new AudioHandler ("audio");

    audioHandler.loadTracks(...audioList);

}