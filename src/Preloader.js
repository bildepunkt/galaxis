export default class Preloader {
    constructor (paths, callback) {
        this.callback = callback;
        this.loaded = 0;
        this.count = paths.length;

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

    getType (path) {
        return path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0 ?
            "audio" :
            "image";
    }

    onLoad () {
        this.loaded++;
        console.log(`asset ${this.loaded} of ${this.count} loaded`);

        if (this.loaded === this.count) {
            console.log("assets loaded");
            this.callback();
        }
    }
}
