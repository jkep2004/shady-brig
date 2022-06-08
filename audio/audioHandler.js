const audioList = [ // Contains all audio tracks

    "backgroundMusic",
    "collectCoin",
    "collectPotion",
    "createBlock",
    "toggleSwitch"

];

class AudioHandler { // Handles all DOM audio

    constructor (audioPath) { // Handler is created with a path to the audio folder

        /* Dictionary of all tracks as p5.js audio tracks 
        {"track": track} */
        this.playlist = {};
        
        this.path = audioPath; // Path to audio folder

    }

    loadTracks (...audioFiles) { // Array of ["trackName1", "trackName2"] within audio folder

        for (let fileName of audioFiles) {

            // Insert p5.js audio track into playlist dictionary
            this.playlist[`${fileName}`] = createAudio(`../${this.path}/${fileName}.mp3`);

        }

    }

}

function playBackgroundMusic () { // Automatically play background music when possible

    if (audioHandler.playlist["backgroundMusic"].time() == 0) {

        audioHandler.playlist["backgroundMusic"].play(); // Try to play the music

    } else {

        playBackgroundMusic = () => {}; // Remove this function so it takes up as little time after it's been useful

    }


}