import Camera from "./Camera";
import Pool from "./Pool";
import Viewport from "./Viewport";
import Input from "./Input";
import Listeners from "./Listeners";
import FSM from "./FSM";
import Ticker from "./Ticker";
import Preloader from "./Preloader";
import { drawGrid } from "./debug";

export default class Game {
    constructor (states, options={}) {
        const defaults = {
            width: 640,
            height: 512,
            id: "game",
            preload: [],
            debug: false,
            listenForMouse: true,
            listenForTouch: true,
            listenForKeyboard: true
        };

        this.states = states;
        this.options = Object.assign(defaults, options);
        this.hasBooted = false;

        this.boot();
    }

    boot () {
        // psuedo game object
        this.game = {
            reset: this.boot.bind(this)
        };
        this.camera = new Camera();
        this.pool = new Pool();
        this.viewport = new Viewport(this.options);
        this.input = new Input(this.viewport.canvas, this.pool, this.options);
        this.listeners = new Listeners(this.input);
        this.fsm = new FSM(this);

        if (this.hasBooted) {
            this.ticker.cancel();
        }

        this.ticker = new Ticker(this.update.bind(this));

        if (!this.hasBooted && this.options.preload.length) {
            new Preloader(this.options.preload, ()=> {
                this.fsm.load("initial");
            });
        } else {
            this.fsm.load("initial");
        }

        this.hasBooted = true;
    }

    update (delta) {
        if (!this.fsm.state) {
            return;
        }

        this.listeners.executeHandlers();

        this.viewport.clear(this.fsm.state.bgColor);
        this.viewport.context.save();
        this.viewport.context.translate(-this.camera.x, -this.camera.y);

        if (this.options.debug) {
            drawGrid(this.viewport.context, this.options.width, this.options.height);
        }

        this.fsm.state.update(delta);
        this.fsm.state.pool.each(item=> {
            this.viewport.context.save();
            item.render(this.viewport.context);
            this.viewport.context.restore();
        }, this);

        this.viewport.context.restore();
    }
}
