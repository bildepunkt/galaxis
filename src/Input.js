import { itemMatch, getScaleFactor, pointRectCollide } from "./util";

class ClickManager {
    constructor (start, end) {
        this.startEvent = start;
        this.endEvent = end;
        this.clickee = null;
    }

    getEvents (event) {
        let clickEvents = [];

        // emulate events
        switch (event.type) {
        case this.startEvent:
            this.clickee = event.target;
            break;
        case this.endEvent:
            if (this.clickee && itemMatch(this.clickee, event.target)) {
                let type;

                switch (this.endEvent) {
                case "mouseup":
                    type = "click";
                    break;
                case "touchend":
                    type = "tap";
                    break;
                }

                clickEvents.push(Object.assign({}, event, {
                    type
                }));
            }

            this.clickee = null;
            break;
        }

        return clickEvents;
    }
}

class DragManager {
    constructor (start, move, end) {
        this.startEvent = start;
        this.moveEvent = move;
        this.endEvent = end;
        this.dragee = null;
        this.isDragging = false;
        this.canDrag = false;
    }

    getEvents (event) {
        let dragEvents = [];

        // emulate events
        switch (event.type) {
        case this.startEvent:
            this.canDrag = true;
            this.dragee = event.target;
            break;
        case this.moveEvent:
            if (this.canDrag) {
                if (!this.isDragging) {
                    dragEvents.push(Object.assign({}, event, {
                        type: "dragstart",
                        target: this.dragee
                    }));
                }

                dragEvents.push(Object.assign({}, event, {
                    type: "drag",
                    target: this.dragee
                }));

                this.isDragging = true;
            }
            break;
        case this.endEvent:
            if (this.isDragging) {
                dragEvents.push(Object.assign({}, event, {
                    type: "dragend",
                    target: this.dragee
                }));

                this.isDragging = false;
                this.dragee = null;
            }

            this.canDrag = false;
            break;
        }

        return dragEvents;
    }
}

export default class Input {
    constructor (canvas, pool, options) {
        this.canvas = canvas;
        this.pool = pool;
        this.queuedEvents = [];
        this.handleEvents = this.handleEvents.bind(this);

        if (options.listenForMouse) {
            this.canvas.addEventListener("mousedown", this.handleEvents, false);
            this.canvas.addEventListener("mouseup", this.handleEvents, false);
            this.canvas.addEventListener("mousemove", this.handleEvents, false);
            this.canvas.addEventListener("wheel", this.handleEvents, false);

            this.mouseClickManager = new ClickManager("mousedown", "mouseup");
            this.mouseDragManager = new DragManager("mousedown", "mousemove", "mouseup");
        }

        if (options.listenForTouch) {
            this.canvas.addEventListener("touchstart", this.handleEvents, false);
            this.canvas.addEventListener("touchend", this.handleEvents, false);
            this.canvas.addEventListener("touchmove", this.handleEvents, false);

            this.touchClickManager = new ClickManager("touchstart", "touchend");
            this.touchDragManager = new DragManager("touchstart", "touchmove", "touchend");
        }

        if (options.listenForKeyboard) {
            this.canvas.addEventListener("keydown", this.handleEvents, false);
            this.canvas.addEventListener("keyup", this.handleEvents, false);
        }
    }

    handleEvents (e) {
        e.preventDefault();
        e.stopPropagation();

        let boundingRect = this.canvas.getBoundingClientRect();
        let scaleFactor = getScaleFactor(this.canvas);
        let event = {
            domEvent: e,
            type: e.type,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
            button: e.button,
            target: { uid: -1 }
        };

        if (e.type !== "keyup" && e.type !== "keydown") {
            if (e.touches && e.touches.length) {
                event.x = e.touches[0].pageX;
                event.y = e.touches[0].pageY;
            } else if (e.changedTouches && e.changedTouches.length) {
                event.x = e.changedTouches[0].pageX;
                event.y = e.changedTouches[0].pageY;
            } else {
                event.x = e.pageX;
                event.y = e.pageY;
            }

            // coordinate positions relative to canvas scaling
            event.x = Math.round((event.x - (boundingRect.left + window.scrollX)) * scaleFactor);
            event.y = Math.round((event.y - (boundingRect.top + window.scrollY)) * scaleFactor);

            // find and set target object
            this.pool.each((item)=> {
                if (pointRectCollide(event.x, event.y, item)) {
                    event.target = item;
                    // don't break, we want the last-most (highest) item
                }
            });
        }

        if (e.type === "wheel") {
            event.deltaX = e.deltaX;
            event.deltaY = e.deltaY;
        }

        this.queuedEvents.push(event);

        this.queuedEvents = this.queuedEvents.concat(
            this.mouseClickManager ? this.mouseClickManager.getEvents(event) : [],
            this.touchClickManager ? this.touchClickManager.getEvents(event) : [],
            this.mouseDragManager ? this.mouseDragManager.getEvents(event) : [],
            this.touchDragManager ? this.touchDragManager.getEvents(event) : []
        );
    }
}
