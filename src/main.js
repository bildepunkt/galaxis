function itemMatch (a, b) {
    return a.uid === b.uid;
}

function getBoundingBox (item) {
    let w = item.width * Math.abs(item.sx);
    let h = item.height * Math.abs(item.sy);
    let x1 = item.x;
    let y1 = item.y;
    let x2 = item.sx >= 0 ? x1 + w : x1 - w;
    let y2 = item.sy >= 0 ? y1 + h : y1 - h;

    return {
        minX: x1 <= x2 ? x1 : x2,
        minY: y1 <= y2 ? y1 : y2,
        maxX: x1 >= x2 ? x1 : x2,
        maxY: y1 >= y2 ? y1 : y2
    };
}

function pointRectCollide (x, y, rect) {
    let bb = getBoundingBox(rect);
    return x >= bb.minX && x <= bb.maxX && y >= bb.minY && y <= bb.maxY;
}

function getScaleFactor (canvas) {
    let factor = 1;

    // check if canvas has been scaled via CSS
    if (canvas.style.width) {
        let cssWidth = parseInt(canvas.style.width, 10);
        factor = canvas.width / cssWidth;
    }

    return factor;
}

class Camera {
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
    }
}

class FSM {
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

class Pool {
    constructor (...items) {
        this.items = items || [];
    }
    
    /**
     * Add n items(s)
     * @method Collection#add
     * @param  {...Object} items - item(s) to add
     */
    add (...items) {
        for (let item of items) {
            this.items.push(item);
        }
    }

    /**
     * Add an item at a given index
     * @method Collection#addAt
     * @param  {Integer} index - The index to add the item
     * @param  {Any}     item - The item to add
     */
    addAt (index, item) {
        if (index > this.getCount()) {
            this.add(item);
        } else {
            this.items.splice(index, 0, item);
        }
    }

    /**
     * Iterates the collection's sorted items. The item, index, and name are supplied
     * to the provided function
     * @method Collection#each
     * @param {Function} fn - The function to execute on the iterable
     * @param {Object} [scope] - The scope with which to execute the function
     */
    each (fn, scope) {
        fn = scope ? fn.bind(scope) : fn;

        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            let doContinue;

            // if item on last item and an item is removed
            if (!item) {
                break;
            }

            doContinue = fn(item, i);

            if (doContinue === false) {
                break;
            }
        }
    }

    /**
     * Returns an object at a given index
     * @method Collection#fetchAt
     * @param  {Integer} index - The index
     * @return {Any}
     */
    fetchAt (index) {
        return this.items[index];
    }

    /**
     * iterates items and return the ones that meet criteria
     * @method Collection#filter
     * @param  {Function} fn - Truth predicate
     * @param  {Object} [scope] - The scope in which to execute the function
     * @return {Array}
     */
    filter(fn, scope) {
        let filteredItems = [];

        this.each((item, i)=> {
            let predicate = fn(item, i);

            if (predicate) {
                filteredItems.push(item);
            }
        }, scope);

        return filteredItems;
    }

    /**
     * Returns the count of items in group
     * @method Collection#getCount
     * @return {Integer} - The item count
     */
    getCount () {
        return this.items.length;
    }

    /**
     * Returns the given item's index, with optional starting index
     * @method Collection#getIndex
     * @param  {Any} item - the item to query
     * @param  {Integer} [fromIndex] - starting index
     * @return {Integer} - the item's index
     */
    getIndex (item, fromIndex) {
        return this.items.indexOf(item, fromIndex);
    }

    /**
     * Checks if item is at front of render order
     * @method Collection#isAtFront
     * @param  {Any} item - The item to query
     * @return {Boolean} - If item is at front
     */
    isAtFront (item) {
        return this.getIndex(item) === this.getCount() - 1;
    }

    /**
     * Checks if item is at back of render order
     * @method Collection#isAtBack
     * @param  {Any} item - The item to query
     * @return {Boolean} - If item is at back
     */
    isAtBack (item) {
        return this.getIndex(item) === 0;
    }

    /**
     * Moves an item to a new index
     * @method Collection#move
     * @param  {Any} movee - the item to move
     * @param  {Integer} indices - the amount of indices to shift item. Can be positive/negative
     * @return {Boolean} - Whether the item was successfully moved
     */
    move (movee, indices) {
        const index = this.getIndex(movee);

        if (indices === 0) {
            return false;
        }

        // cannot move before begining (don't use isAtBack to save getIndex use)
        if (index === 0 && indices < 0) {
            return false;
        }

        // cannot move past end (don't use isAtFront to save getIndex use)
        if (index === this.getCount() - 1 && indices > 0) {
            return false;
        }

        this.remove(movee);
        this.addAt(index + indices, movee);

        return true;
    }

    /**
     * Moves an item to the front of the render order
     * @method Collection#moveToFront
     * @param  {Any} movee - the item to move
     * @return {Boolean} - Whether item successfully moved
     */
    moveToFront (movee) {
        if (this.isAtFront(movee)) {
            return false;
        }

        this.remove(movee);
        this.addAt(this.getCount(), movee);

        return true;
    }

    /**
     * Moves an item to the back of the render order
     * @method Collection#moveToBack
     * @param  {Any} movee - the item to move
     * @return {Boolean} - Whether item successfully moved
     */
    moveToBack (movee) {
        if (this.isAtBack(movee)) {
            return false;
        }

        this.remove(movee);
        this.addAt(0, movee);

        return true;
    }

    /**
     * Remove item by name
     * @method Collection#removeBy
     * @param {String} removee - The item to remove
     * @return {Boolean} - Whether item was successfully removed
     */
    remove (removee) {
        let removed = false;

        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            if (itemMatch(item, removee)) {
                this.items.splice(i, 1);
                removed = true;
                break;
            }
        }

        return removed;
    }

    /**
     * Removes all items
     * @method Collection#removeAll
     */
    removeAll () {
        this.items = [];
    }

    /**
     * Remove item at given index
     * @method Collection#removeAt
     * @param {Integer} index - The index of the item to remove
     */
    removeAt (index) {
        this.items.splice(index, 1);
    }
}

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

class Input {
    constructor (canvas, pool, mouse, touch, keyboard) {
        this.canvas = canvas;
        this.pool = pool;
        this.queuedEvents = [];
        this.handleEvents = this.handleEvents.bind(this);

        if (mouse) {
            this.canvas.addEventListener("mousedown", this.handleEvents, false);
            this.canvas.addEventListener("mouseup", this.handleEvents, false);
            this.canvas.addEventListener("mousemove", this.handleEvents, false);
            this.canvas.addEventListener("wheel", this.handleEvents, false);

            this.mouseClickManager = new ClickManager("mousedown", "mouseup");
            this.mouseDragManager = new DragManager("mousedown", "mousemove", "mouseup");
        }

        if (touch) {
            this.canvas.addEventListener("touchstart", this.handleEvents, false);
            this.canvas.addEventListener("touchend", this.handleEvents, false);
            this.canvas.addEventListener("touchmove", this.handleEvents, false);

            this.mouseClickManager = new ClickManager("touchstart", "touchend");
            this.mouseDragManager = new DragManager("touchstart", "touchmove", "touchend");
        }

        if (keyboard) {
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

        if (e.touches && e.touches.length) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        } else if (e.changedTouches && e.changedTouches.length) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        } else {
            x = e.pageX;
            y = e.pageY;
        }

        if (e.type === "wheel") {
            event.deltaX = e.deltaX;
            event.deltaY = e.deltaY;
        }

        if (e.type !== "keyup" && e.type !== "keydown") {
            // coordinate positions relative to canvas scaling
            event.x = Math.ceil((e.pageX - (boundingRect.left + window.scrollX)) * scaleFactor);
            event.y = Math.ceil((e.pageY - (boundingRect.top + window.scrollY)) * scaleFactor);
        }

        // find and set target object
        this.pool.each((item)=> {
            if (pointRectCollide(event.x, event.y, item)) {
                event.target = item;
                // don't break, we want the last-most (highest) item
            }
        });

        this.queuedEvents.push(event);

        this.queuedEvents = this.queuedEvents.concat(
            this.mouseClickManager ? this.mouseClickManager.getEvents(event) : [],
            this.touchClickManager ? this.touchClickManager.getEvents(event) : [],
            this.mouseDragManager ? this.mouseDragManager.getEvents(event) : [],
            this.touchDragManager ? this.touchDragManager.getEvents(event) : []
        );
    }
}

class Listeners {
    constructor () {
        this.events = {};
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
    }

    add (type, handler, target) {
        if (!this.events[type]) {
            this.events[type] = [];
        }

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
        for (let inputType of this.inputTypes) {
            for (let event of inputType.queuedEvents) {
                switch (event.type) {
                case "drag":
                case "dragstart":
                case "dragend":
                    this.dragActionManager.handle(event);
                    break;
                }

                for (let handlerObj of inputType.handlerObjects[event.type]) {
                    // if not drag|dragend event, and target given, and it matches OR no target given
                    // it doesn't apply to drag b/c on fast dragging, the event coordinates will move off the target
                    // it doesn't apply to dragend b/c a dragend can happen on higher (top-most) target
                    if (handlerObj.target ) {
                        if (event.target && spriteMatch(handlerObj.target, event.target)) {
                            handlerObj.handler(event);
                        }
                    } else {
                        handlerObj.handler(event);
                    }
                }
            }

            inputType.queuedEvents = [];
        }
    }

    reset () {
        this.events = {};
    }
}

class Ticker {
    constructor (callback) {
        this.callback = callback;
        this.then = Date.now();
        this.update = this.update.bind(this);
        this.cancelled = false

        this.update();
    }

    update () {
        if (this.cancelled) {
            return;
        }

        let now = Date.now();
        // use min to cap delta so things don't go haywire on "blur"
        let delta = Math.min(now - this.then, 32);

        this.callback(delta);
        this.then = now;    

        this.requestId = requestAnimationFrame(this.update);
    }

    cancel () {
        this.cancelled = true;
        cancelAnimationFrame(this.requestId);
    }
}

class Viewport {
    constructor (options) {
        this.width = options.width;
        this.height = options.height;
        this.canvas = document.querySelector("#" + options.id);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
    }

    clear (fill) {
        if (fill) {
            this.context.fillStyle = fill;
            this.context.fillRect(0, 0, this.width, this.height);
        } else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }
}

class Preloader {
    constructor (paths, callback) {
        this.callback = callback;
        this.loaded = 0;
        this.count = paths.length;

        for (let path of paths) {
            let asset;

            switch (this.getType(path)) {
            case "audio":
                asset = new Audio();
                break;
            case "image":
                asset = new Image();
                break;
            }

            asset.onload = this.onLoad();
        }
    }

    getType (path) {
        return path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0 ?
            "audio" :
            "image";
    }

    onLoad () {
        this.loaded++;
        console.log(`asset ${this.loaded} of ${this.count} loaded`);

        if (this.loaded === this.count) {
            console.log("assets loaded");
            this.callback();
        }
    }
}

class Sprite {
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.alpha = 1;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.pivotX = 0;
        this.pivotY = 0;
        this.draggable = false;
        this.visible = true;
        this.composite = "source-over";
        this.uid = Sprite.uid++;
    }

    render (context) {
        if (!this.visible) {
            return;
        }

        context.translate(-this.pivotX, -this.pivotY);
        context.translate(this.x, this.y);
        
        if (this.rotation !== 0) {
            context.translate(this.pivotX, this.pivotY);
            context.rotate(this.rotation * Math.PI / 180);
            context.translate(-this.pivotX, -this.pivotY);
        }

        if (this.scaleX !== 1 || this.scaleY !== 1) {
            context.translate(this.pivotX, this.pivotY);
            context.scale(this.scaleX, this.scaleY);
            context.translate(-this.pivotX, -this.pivotY);
        }

        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.compositeOperation;

        // TODO - R E M O V E ! ! !
        context.fillStyle = "#000";
        context.fillRect(0, 0, this.width, this.height);
    }
}
Sprite.uid = 0;

class Game {
    constructor (states, options) {
        const defaults = {
            width: 800,
            height: 600,
            id: "game",
            preload: []
        };

        this.states = states;
        this.options = Object.assign(defaults, options);
        this.hasBooted = false;

        this.boot();
    }

    boot () {
        // psuedo game object
        this.game = {
            reset: this.boot.bind(this)
        };
        this.camera = new Camera();
        this.pool = new Pool();
        this.viewport = new Viewport(this.options);
        this.listeners = new Listeners();
        this.fsm = new FSM(this);

        if (this.hasBooted) {
            this.ticker.cancel();
        }

        this.ticker = new Ticker(this.update.bind(this));

        if (!this.hasBooted && this.options.preload.length) {
            new Preloader(this.options.preload, ()=> {
                this.fsm.load("initial");
            });
        } else {
            this.fsm.load("initial");
        }

        this.hasBooted = true;
    }

    update (delta) {
        if (!this.fsm.state) {
            return;
        }

        this.viewport.clear(this.fsm.state.bgColor);
        this.viewport.context.save();
        this.viewport.context.translate(-this.camera.x, -this.camera.y);

        this.fsm.state.update(delta);
        this.fsm.state.pool.each(item=> {
            this.viewport.context.save();
            item.render(this.viewport.context);
            this.viewport.context.restore();
        }, this);

        this.viewport.context.restore();
    }
}

new Game({
    initial: {
        init () {
            console.log("initial#init");

            this.bgColor = "#678";
            this.rect = new Sprite();
            this.rect2 = new Sprite();
            this.rect.pivotX = 32;
            this.rect.pivotY = 32;
            this.rect.rotation = 45;
            this.rect.scaleX = 2;
            this.rect.scaleY = 2;
            this.pool.add(this.rect, this.rect2);

            this.listeners.add("click", (e)=> {
                console.log(e);
            }, this.rect);

            console.log(this.listeners);
        },
        update (delta) {
            console.log("initial#update", delta);

            let speed = delta / 4;

            this.rect.x += speed;
            this.rect.rotation += speed;

            if (this.rect.x + this.rect.width >= this.width) {
                this.fsm.load("play");
            }
        },
        remove () {
            console.log("initial#remove");

            this.pool.removeAll();
        }
    },
    play: {
        init () {
            console.log("play#init");
            console.log(this.listeners);
        },
        update (delta) {
            console.log("play#update", delta);

            this.game.reset();
        }
    }
}, {
    preload: [
        "assets/cragger.png"
    ]
});
