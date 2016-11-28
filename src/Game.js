import Camera from "./Camera";
import Pool from "./Pool";
import Viewport from "./Viewport";
import Input from "./Input";
import Listeners from "./Listeners";
import FSM from "./FSM";
import Ticker from "./Ticker";
import { drawGrid, drawPivot, drawBoundingBox } from "./debug";

export default class Game {
    constructor (states, options={}) {
        const defaults = {
            width: 640,
            height: 512,
            id: "game",
            debug: false,
            listenForMouse: true,
            listenForTouch: true,
            listenForKeyboard: true
        };

        this.states = states;
        this.options = Object.assign(defaults, options);

        this.boot();
    }

    boot () {
        // TODO add plugin support with events & lifecycle directives
        this.camera = new Camera();
        this.pool = new Pool();
        this.viewport = new Viewport(this.options);
        this.input = new Input(this.viewport.canvas, this.pool, this.options);
        this.listeners = new Listeners(this.input);
        this.fsm = new FSM(this);
        this.ticker = new Ticker(this.update.bind(this));

        this.fsm.load("initial");
    }

    reset () {
        this.camera = new Camera();
        this.pool.removeAll();
        this.listeners.reset();

        this.fsm.load("initial");
    }

    update (delta) {
        if (!this.fsm.state) {
            return;
        }

        let context = this.viewport.context;

        this.listeners.executeHandlers();
        this.viewport.clear(this.fsm.state.bgColor);

        context.save();
        context.translate(-this.camera.x, -this.camera.y);

        if (this.options.debug) {
            // TODO account for camera
            drawGrid(context, this.options.width, this.options.height);
        }

        let state = this.fsm.state;
        state.update(delta);
        state.game.pool.each(item => {
            context.save();
            item.render(context);
            context.restore();

            if (this.options.debug) {
                drawBoundingBox(context, item);
                drawPivot(context, item);
            }
        }, this);

        context.restore();
    }
}
