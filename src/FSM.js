export default class FSM {
    constructor (game) {
        this.states = game.states;
        this.game = game.game;
        this.listeners = game.listeners;
        this.camera = game.camera;
        this.pool = game.pool;
        this.width = game.options.width;
        this.height = game.options.height;
    }
    
    load (name) {
        if (this.state && this.state.remove) {
            this.state.remove();
        }

        this.listeners.reset();

        this.state = this.states[name];

        this.state.game = this.game;
        this.state.listeners = this.listeners;
        this.state.camera = this.camera
        this.state.pool = this.pool;
        this.state.fsm = this;
        this.state.width = this.width;
        this.state.height = this.height;

        if (this.state.init) {
            this.state.init();
        }
    }
}
