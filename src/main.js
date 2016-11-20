class Camera {
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
    }
}

class FSM {
    constructor (states, game, listeners, camera, pool, width, height) {
        this.states = states;
        this.game = game;
        this.listeners = listeners;
        this.camera = camera;
        this.pool = pool;
        this.width = width;
        this.height = height;
    }
    
    load (name) {
        if (this.state && this.state.remove) {
            this.state.remove();
        }

        this.state = this.states[name];

        this.listeners.reset();
        
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
            if (spriteMatch(item, removee)) {
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

class Listeners {
    constructor () {
        this.events = {};
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
        let delta = Math.min(now - this.then, 32);

        this.callback(delta);
        this.then = now;    

        this.requestId = requestAnimationFrame(this.update);
    }

    destroy () {
        this.cancelled = true;
        cancelAnimationFrame(this.requestId);
    }
}

class Viewport {
    constructor (width, height, id) {
        this.width = width;
        this.height = height;
        this.canvas = document.querySelector("#" + id);
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
        this.visible = true;
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

        // TODO - R E M O V E ! ! !
        context.fillStyle = "#000";
        context.fillRect(0, 0, this.width, this.height);
    }
}

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
        this.viewport = new Viewport(
            this.options.width, this.options.height, this.options.id
        );
        this.listeners = new Listeners();
        this.fsm = new FSM(
            this.states, this.game, this.listeners, this.camera, this.pool, this.options.width, this.options.height
        );

        if (this.hasBooted) {
            this.ticker.destroy();
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
