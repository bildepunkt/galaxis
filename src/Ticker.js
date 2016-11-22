export default class Ticker {
    constructor (callback) {
        this.callback = callback;
        this.then = Date.now();
        this.update = this.update.bind(this);
        this.cancelled = false

        this.requestId = requestAnimationFrame(this.update);
    }

    update () {
        if (this.cancelled) {
            return;
        }

        let now = Date.now();
        // use min to cap delta so things don't go haywire on "blur"
        let delta = Math.min(now - this.then, 32);

        this.callback(delta);
        this.then = now;    

        this.requestId = requestAnimationFrame(this.update);
    }

    cancel () {
        this.cancelled = true;
        cancelAnimationFrame(this.requestId);
    }
}
