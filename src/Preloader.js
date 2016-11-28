export default class Preloader {
    constructor (paths, callback) {
        this.callback = callback;
        this.loaded = 0;
        this.count = paths.length;

        if (this.count === 0) {
            console.warn("no assets to load!");
            callback();
            return;
        }

        for (let path of paths) {
            let asset;

            switch (this.getType(path)) {
            case "audio":
                asset = new Audio();
                break;
            case "image":
                asset = new Image();
                break;
            }

            asset.onload = this.onLoad();
        }
    }

    // only works for images and sounds
    getType (path) {
        return path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0 ?
            "audio" :
            "image";
    }

    onLoad () {
        this.loaded++;
        console.log(`asset ${this.loaded} of ${this.count} loaded`);

        if (this.loaded === this.count) {
            console.log("all assets loaded!");
            this.callback();
        }
    }
}
