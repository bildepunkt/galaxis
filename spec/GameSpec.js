import Game from "../src/Game";

describe("Game", ()=> {
    let init, update;

    beforeEach(()=> {
        init = jasmine.createSpy("init");
        update = jasmine.createSpy("update");
    });

    it("initializes with options", ()=> {
        let game = new Game({
            initial: {
                init
            }
        }, {
            width: 512,
            debug: true
        });

        expect(game instanceof Game).toBe(true);
        expect(game.options.width).toEqual(512);
        expect(game.options.id).toEqual("game");
        expect(game.options.debug).toBe(true);
        expect(game.hasBooted).toBe(true);
    });

    it("updates the state", ()=> {
        let game = new Game({
            initial: {
                init,
                update
            }
        });

        spyOn(game.listeners, "executeHandlers");
        spyOn(game.viewport, "clear");

        setTimeout(()=> {
            expect(game.fsm.state.update).toHaveBeenCalled();
            expect(game.listeners.executeHandlers).toHaveBeenCalled();
            expect(game.viewport.clear).toHaveBeenCalled();
        }, 16);
    });
});
