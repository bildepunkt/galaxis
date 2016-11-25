import Input from "../src/Input";
import Pool from "../src/Pool";
import Element from "./_mocks/Element";

describe("Input", ()=> {
    let canvas = new Element();
    let pool

    function handleEvent (e) {
        console.log(e);
    }

    beforeEach(()=> {
        pool = new Pool();
    });

    it("instantiates", ()=> {
        let input = new Input(canvas, pool, {
            listenForTouch: true,
            listenForMouse: true,
            listenForKeyboard: true
        });
        expect(input instanceof Input).toBe(true);
    });

    it("adds mouse handler object with target", ()=> {
        let target = {
            uuid: 2048
        };
        let handlerObject;

        input.addListener(target, "click", handleEvent);
        handlerObject = input.inputTypes[0].handlerObjects.click[0];

        expect(handlerObject.handler).toEqual(handleEvent);
        expect(handlerObject.target).toEqual(target);
    });

    it("adds mouse event handler object with no target", ()=> {
        let handlerObject;

        input.addListener(null, "click", handleEvent);
        handlerObject = input.inputTypes[0].handlerObjects.click[0];

        expect(handlerObject.handler).toEqual(handleEvent);
        expect(handlerObject.target).toEqual(null);
    });

    it("throws error on unlisted event add attempt", ()=> {
        try {
            input.addListener(null, "flubular", handleEvent);
        } catch(err) {
            expect(err).toEqual(new TypeError("Event type \"flubular\" does not exist."));
        }
    });

    it("removes a handler object", ()=> {
        input.addListener(null, "click", handleEvent);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(1);
        input.removeListener("click", handleEvent);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(0);
    });

    it("removes a handler object with scoped handler", ()=> {
        input.addListener(null, "click", handleEvent, this);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(1);
        input.removeListener("click", handleEvent);
        expect(input.inputTypes[0].handlerObjects.click.length).toEqual(0);
    });

    it("throws error on unlisted event removal attempt", ()=> {
        try {
            input.removeListener(null, "flubular", handleEvent);
        } catch(err) {
            expect(err).toEqual(new TypeError("Event type \"flubular\" does not exist."));
        }
    });

    it("adds a mouse handler", ()=> {
        let evt = Object.assign({}, event);
        evt.pageX = 32;
        evt.pageY = 32;

        input.addListener(null, "click", handleEvent);
        input.inputTypes[0].enqueueEvent(evt);

        expect(input.inputTypes[0].queuedEvents[0]).toEqual({
            domEvent: evt,
            type: "click",
            ctrlKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            x: 32,
            y: 32,
            target: stage
        });
    });

    it("executes a mouse handler", ()=> {
        let evt = Object.assign({}, event);
        let type;

        evt.pageX = 32;
        evt.pageY = 32;

        input.addListener(null, "click", handleEvent);
        input.inputTypes[0].enqueueEvent(evt);
        type = input.inputTypes[0].handlerObjects.click[0];

        spyOn(type, "handler");

        input._onTick();
        expect(type.handler).toHaveBeenCalled();
    });
});