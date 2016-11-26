import Input from "../src/Input";
import Pool from "../src/Pool";
import Sprite from "../src/Sprite";
import Element from "./_mocks/Element";
import event from "./_mocks/event";

describe("Input", ()=> {
    let canvas = new Element();
    let input, pool;

    beforeEach(()=> {
        spyOn(canvas, "addEventListener");

        pool = new Pool();
        input = new Input(canvas, pool, {
            listenForTouch: true,
            listenForMouse: true,
            listenForKeyboard: true
        });
    });

    it("instantiates and adds listeners", ()=> {
        expect(input instanceof Input).toBe(true);
        expect(canvas.addEventListener).toHaveBeenCalled();
        expect(canvas.addEventListener.calls.count()).toEqual(9);
    });

    it("adds mouse event to queue", ()=> {
        event.type = "mousedown";
        input.handleEvents(event);
        expect(input.queuedEvents.length).toEqual(1);
        expect(input.queuedEvents[0].type).toEqual("mousedown");
    });

    it("sets target based on item/event position", ()=> {
        let item = new Sprite();
        item.width = 64;
        item.height = 64;

        pool.add(item);

        event.type = "mousedown";
        event.x = 32;
        event.y = 16;
        input.handleEvents(event);
        expect(input.queuedEvents[0].target).toEqual(item);
    });

    it("[mouse] queues psuedo click event from pointer down/up", ()=> {
        event.type = "mousedown";
        input.handleEvents(event);
        event.type = "mouseup";
        input.handleEvents(event);

        expect(input.queuedEvents.length).toEqual(3);
        expect(input.queuedEvents[2].type).toEqual("click");
    });

    it("[mouse] queues psuedo drag events", ()=> {
        event.type = "mousedown";
        input.handleEvents(event);
        event.type = "mousemove";
        input.handleEvents(event);
        event.type = "mouseup";
        input.handleEvents(event);

        expect(input.queuedEvents.length).toEqual(7);
        expect(input.queuedEvents[2].type).toEqual("dragstart");
        expect(input.queuedEvents[3].type).toEqual("drag");
        expect(input.queuedEvents[6].type).toEqual("dragend");
    });

    it("[touch] queues psuedo tap event from pointer down/up", ()=> {
        event.type = "touchstart";
        input.handleEvents(event);
        event.type = "touchend";
        input.handleEvents(event);

        expect(input.queuedEvents.length).toEqual(3);
        expect(input.queuedEvents[2].type).toEqual("tap");
    });

    it("[touch] queues psuedo drag events", ()=> {
        event.type = "touchstart";
        input.handleEvents(event);
        event.type = "touchmove";
        input.handleEvents(event);
        event.type = "touchend";
        input.handleEvents(event);

        expect(input.queuedEvents.length).toEqual(7);
        expect(input.queuedEvents[2].type).toEqual("dragstart");
        expect(input.queuedEvents[3].type).toEqual("drag");
        expect(input.queuedEvents[6].type).toEqual("dragend");
    });
});