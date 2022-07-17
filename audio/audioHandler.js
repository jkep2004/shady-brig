const audioList = [ // Contains all audio tracks

    "backgroundMusic",
    "collectCoin",
    "collectPotion",
    "createBlock",
    "toggleSwitch"

];

class AudioHandler {

    /** Handles all audio DOM elements as p5.Audio
     * 
     * @param {String} audioPath \<str> File path to audio folder
     * 
     * @author Jakob
     * 
     */

    constructor (audioPath) {

        /* Dictionary of all tracks as p5.Audio tracks 
        {"track": track} */

        this.playlist = {};
        
        this.path = audioPath; // Path to audio folder

    }

    /** Adds all audio files as p5.Audio objects to playlist
     * 
     * @param  {...String} audioFiles \<str> Array of ["trackName1", "trackName2"] within audio folder
     * 
     * @author Jakob
     * 
     */

    loadTracks (...audioFiles) {

        let volume = getItem('globalVolume');

        if (volume == undefined) volume = 1;

        for (let fileName of audioFiles) {

            // Insert p5.audio track into playlist dictionary
            this.playlist[`${fileName}`] = createAudio(`./${this.path}/${fileName}.mp3`);


            this.playlist[`${fileName}`].volume(volume);

        }

    }

    /** Toggles all audio volumes in playlist
     * 
     *  @author Jakob
     * 
     */

    toggleMute () {

        for (let [name, audio] of Object.entries(this.playlist)) {

            audio.volume((audio.volume() == 1) ? 0: 1);

            
        }
        
        storeItem('globalVolume', (getItem('globalVolume') == 1) ? 0 : 1);

    }

}

/** Automatically begin play of background music when possible
 * 
 * @param {AudioHandler} audioHandler \<AudioHandler> Object handling all p5.Audio objects
 * 
 * @author Jakob
 * 
 */

function playBackgroundMusic (audioHandler) {

    if (audioHandler.playlist["backgroundMusic"].time() == 0) {

        audioHandler.playlist["backgroundMusic"].play(); // Try to play the music

    } else {

        playBackgroundMusic = () => {}; // Remove this function so it takes up as little time after it's been useful

    }


}