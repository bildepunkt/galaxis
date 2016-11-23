import { itemMatch } from "./util";

export default class Listeners {
    constructor (input) {
        this.input = input;
        this.dragActionManager = {
            dragee: null,
            offset: {
                x: 0,
                y: 0
            },

            handle (event) {
                switch (event.type) {
                case "dragstart":
                    if (event.target && event.target.draggable) {
                        this.dragee = event.target;
                        this.offset.x = event.x - this.dragee.x;
                        this.offset.y = event.y - this.dragee.y;
                    }
                    break;
                case "drag":
                    if (this.dragee) {
                        this.dragee.x = event.x - this.offset.x;
                        this.dragee.y = event.y - this.offset.y;
                    }
                    break;
                case "dragend":
                    this.dragee = null;
                    break;
                }
            }
        };

        this.reset();
    }

    add (type, handler, target) {
        this.events[type].push({
            original: handler,
            handler: handler.bind(this.state),
            target
        });
    }

    remove (type, handler) {
        for (let i = 0, len = this.events[type].length; i < len; i++) {
            let event = this.events[type][i];

            if (event.original === handler) {
                this.events[type].splice(i, 1);
                break;
            }
        }
    }

    executeHandlers () {
        for (let event of this.input.queuedEvents) {
            switch (event.type) {
            case "drag":
            case "dragstart":
            case "dragend":
                this.dragActionManager.handle(event);
                break;
            }

            for (let handlerObj of this.events[event.type]) {
                // if not drag|dragend event, and target given, and it matches OR no target given
                // it doesn't apply to drag b/c on fast dragging, the event coordinates will move off the target
                // it doesn't apply to dragend b/c a dragend can happen on higher (top-most) target
                if (handlerObj.target ) {
                    if (event.target && itemMatch(handlerObj.target, event.target)) {
                        handlerObj.handler(event);
                    }
                } else {
                    handlerObj.handler(event);
                }
            }
        }

        this.input.queuedEvents = [];
    }

    reset () {
        // add all - even without listeners - b/c some are implicit eg: drag*
        this.events = {
            "mousedown": [],
            "mouseup": [],
            "mousemove": [],
            "click": [],
            "wheel": [],
            "touchstart": [],
            "touchend": [],
            "touchmove": [],
            "tap": [],
            "drag": [],
            "dragstart": [],
            "dragend": []
        }
    }
}
