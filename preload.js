var imageHandler, audioHandler;

function preload () {

    imageHandler = new ImageHandler ("image");

    imageHandler.loadTileSets(...tileSets);
    imageHandler.loadImages(...imageList);

    imageHandler.loadFavicon(0, 3, "coin");

    audioHandler = new AudioHandler ("audio");

    audioHandler.loadTracks(...audioList);

}