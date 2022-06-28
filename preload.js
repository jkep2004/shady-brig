var imageHandler, audioHandler;

/** Caches all DOM elements before the page is loaded 
 * 
 *  @author Jakob
 * 
 */

function preload () {

    imageHandler = new ImageHandler ("image");

    imageHandler.loadTileSets(...tileSets);
    imageHandler.loadImages(...imageList);

    imageHandler.loadFavicon(0, 3, "coin");

    audioHandler = new AudioHandler ("audio");

    audioHandler.loadTracks(...audioList);

}