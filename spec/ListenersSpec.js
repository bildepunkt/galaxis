import Listeners from "../src/Listeners";
import Input from "../src/Input";
import Pool from "../src/Pool";
import Element from "./_mocks/Element";

describe("Listeners", ()=> {
    let canvas = new Element();
    let handleEvent;
    let listeners;

    beforeEach(()=> {
        let input = new Input(canvas, new Pool(), {});
        handleEvent = jasmine.createSpy("handleEvent");
        listeners = new Listeners(input);
    });

    it("instantiates", ()=> {
        expect(listeners instanceof Listeners).toBe(true);
    });

    it("adds a handler object", ()=> {
        let item = { uid: 16 };
        listeners.add("click", handleEvent, item);
        expect(listeners.events.click[0].original).toEqual(handleEvent);
        expect(typeof listeners.events.click[0].handler).toEqual("function");
        expect(listeners.events.click[0].target).toEqual(item);
    });

    it("adds a handler object without target", ()=> {
        listeners.add("click", handleEvent);
        expect(listeners.events.click[0].original).toEqual(handleEvent);
        expect(typeof listeners.events.click[0].handler).toEqual("function");
        expect(listeners.events.click[0].target).toEqual(undefined);
    });

    it("removes a handler", ()=> {
        listeners.add("touchend", handleEvent);
        expect(listeners.events.touchend.length).toEqual(1);
        listeners.remove("touchend", handleEvent);
        expect(listeners.events.touchend.length).toEqual(0);
    });

    it("executes handlers", ()=> {
        listeners.add("tap", handleEvent);
        listeners.input.queuedEvents.push({
            type: "tap"
        });

        expect(listeners.input.queuedEvents.length).toEqual(1);
        listeners.executeHandlers();
        expect(listeners.events.tap[0].original).toHaveBeenCalled();
        expect(listeners.input.queuedEvents.length).toEqual(0);
    });

    xit("doesn't execute a handler - with a target - if coordinates don't match", ()=> {
        //
    });

    xit("updates item's coordinates on drag*", ()=> {
        //
    });
});
