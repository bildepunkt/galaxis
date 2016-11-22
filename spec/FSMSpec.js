import FSM from "../src/FSM";

describe("FSM", ()=> {
    const noop = ()=> {};

    it("initializes", ()=> {
        let init = jasmine.createSpy("init");
        let fsm = new FSM({
            states: {
                intro: { init }
            },
            game: {},
            listeners: {
                reset: noop
            },
            camera: {},
            pool: {},
            options: {
                width: 512,
                height: 512
            }
        });
        fsm.load("intro");

        expect(init).toHaveBeenCalled();
    });
});
