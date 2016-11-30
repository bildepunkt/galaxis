import Preloader from "./Preloader";

export default class FSM {
    constructor (game) {
        this.states = game.states;

        this.game = {
            reset: game.reset.bind(game),
            listeners: game.listeners,
            camera: game.camera,
            pool: game.pool,
            width: game.options.width,
            height: game.options.height
        };
    }
    
    load (name) {
        if (this.state && this.state.destroy) {
            this.state.destroy();
        }

        this.game.listeners.reset();
        this.state = this.states[name];

        new Preloader(this.state.preload || [], ()=> {
            this.state.game = this.game;
            this.state.game.fsm = this;

            if (this.state.init) {
                this.state.init();
            }
        });
    }
}
