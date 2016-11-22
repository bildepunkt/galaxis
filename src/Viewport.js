export default class Viewport {
    constructor (options) {
        this.width = options.width;
        this.height = options.height;
        this.canvas = document.querySelector("#" + options.id);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
    }

    clear (fill) {
        if (fill) {
            this.context.fillStyle = fill;
            this.context.fillRect(0, 0, this.width, this.height);
        } else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }
}
