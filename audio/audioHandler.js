const audioList = [

    "backgroundMusic",
    "collectCoin",
    "collectPotion",
    "createBlock",
    "toggleSwitch"

];

class AudioHandler {

    constructor (audioPath) {

        this.path = audioPath;
        this.playlist = {};

    }

    loadTracks (...audioFiles) {

        for (let fileName of audioFiles) {

            this.playlist[`${fileName}`] = createAudio(`../${this.path}/${fileName}.mp3`);

        }

    }

}