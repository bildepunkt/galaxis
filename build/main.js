"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function Camera() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Camera);

    this.x = x;
    this.y = y;
};

var FSM = function () {
    function FSM(states, camera, pool) {
        _classCallCheck(this, FSM);

        this.states = states;
        this.camera = camera;
        this.pool = pool;
    }

    _createClass(FSM, [{
        key: "load",
        value: function load(name) {
            if (this.state) {
                this.state.remove();
            }

            this.state = this.states[name];

            this.state.camera = this.camera;
            this.state.pool = this.pool;
            this.state.fsm = this;

            this.state.init();
        }
    }, {
        key: "update",
        value: function update(delta) {
            this.state.update(delta);
        }
    }]);

    return FSM;
}();

var Pool = function () {
    function Pool() {
        _classCallCheck(this, Pool);

        for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
            items[_key] = arguments[_key];
        }

        this.items = items || [];
    }

    /**
     * Add n items(s)
     * @method Collection#add
     * @param  {...Object} items - item(s) to add
     */


    _createClass(Pool, [{
        key: "add",
        value: function add() {
            for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                items[_key2] = arguments[_key2];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.items.push(item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Add an item at a given index
         * @method Collection#addAt
         * @param  {Integer} index - The index to add the item
         * @param  {Any}     item - The item to add
         */

    }, {
        key: "addAt",
        value: function addAt(index, item) {
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

    }, {
        key: "each",
        value: function each(fn, scope) {
            fn = scope ? fn.bind(scope) : fn;

            for (var i = 0, len = this.getCount(); i < len; i++) {
                var item = this.items[i];
                var doContinue = void 0;

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

    }, {
        key: "fetchAt",
        value: function fetchAt(index) {
            return this.items[index];
        }

        /**
         * iterates items and return the ones that meet criteria
         * @method Collection#filter
         * @param  {Function} fn - Truth predicate
         * @param  {Object} [scope] - The scope in which to execute the function
         * @return {Array}
         */

    }, {
        key: "filter",
        value: function filter(fn, scope) {
            var filteredItems = [];

            this.each(function (item, i) {
                var predicate = fn(item, i);

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

    }, {
        key: "getCount",
        value: function getCount() {
            return this.items.length;
        }

        /**
         * Returns the given item's index, with optional starting index
         * @method Collection#getIndex
         * @param  {Any} item - the item to query
         * @param  {Integer} [fromIndex] - starting index
         * @return {Integer} - the item's index
         */

    }, {
        key: "getIndex",
        value: function getIndex(item, fromIndex) {
            return this.items.indexOf(item, fromIndex);
        }

        /**
         * Checks if item is at front of render order
         * @method Collection#isAtFront
         * @param  {Any} item - The item to query
         * @return {Boolean} - If item is at front
         */

    }, {
        key: "isAtFront",
        value: function isAtFront(item) {
            return this.getIndex(item) === this.getCount() - 1;
        }

        /**
         * Checks if item is at back of render order
         * @method Collection#isAtBack
         * @param  {Any} item - The item to query
         * @return {Boolean} - If item is at back
         */

    }, {
        key: "isAtBack",
        value: function isAtBack(item) {
            return this.getIndex(item) === 0;
        }

        /**
         * Moves an item to a new index
         * @method Collection#move
         * @param  {Any} movee - the item to move
         * @param  {Integer} indices - the amount of indices to shift item. Can be positive/negative
         * @return {Boolean} - Whether the item was successfully moved
         */

    }, {
        key: "move",
        value: function move(movee, indices) {
            var index = this.getIndex(movee);

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

    }, {
        key: "moveToFront",
        value: function moveToFront(movee) {
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

    }, {
        key: "moveToBack",
        value: function moveToBack(movee) {
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

    }, {
        key: "remove",
        value: function remove(removee) {
            var removed = false;

            for (var i = 0, len = this.getCount(); i < len; i++) {
                var item = this.items[i];
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

    }, {
        key: "removeAll",
        value: function removeAll() {
            this.items = [];
        }

        /**
         * Remove item at given index
         * @method Collection#removeAt
         * @param {Integer} index - The index of the item to remove
         */

    }, {
        key: "removeAt",
        value: function removeAt(index) {
            this.items.splice(index, 1);
        }
    }]);

    return Pool;
}();

var Ticker = function () {
    function Ticker(callback) {
        _classCallCheck(this, Ticker);

        this.callback = callback;
        this.then = Date.now();
        this.update = this.update.bind(this);

        requestAnimationFrame(this.update);
    }

    _createClass(Ticker, [{
        key: "update",
        value: function update() {
            var now = Date.now();
            var delta = Math.min(now - this.then, 64);

            this.callback(delta);
            this.then = now;

            requestAnimationFrame(this.update);
        }
    }]);

    return Ticker;
}();

var Viewport = function () {
    function Viewport(width, height, id) {
        _classCallCheck(this, Viewport);

        this.width = width;
        this.height = height;
        this.canvas = document.querySelector("#" + id);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
    }

    _createClass(Viewport, [{
        key: "clear",
        value: function clear(fill) {
            if (fill) {
                this.context.fillStyle = fill;
                this.context.fillRect(0, 0, this.width, this.height);
            } else {
                this.context.clearRect(0, 0, this.width, this.height);
            }
        }
    }]);

    return Viewport;
}();

var Preloader = function () {
    function Preloader(paths, callback) {
        _classCallCheck(this, Preloader);

        this.callback = callback;
        this.loaded = 0;
        this.count = paths.length;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = paths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var path = _step2.value;

                var asset = void 0;

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
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

    _createClass(Preloader, [{
        key: "getType",
        value: function getType(path) {
            return path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0 ? "audio" : "image";
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            this.loaded++;
            console.log("asset " + this.loaded + " of " + this.count + " loaded");

            if (this.loaded === this.count) {
                console.log("assets loaded");
                this.callback();
            }
        }
    }]);

    return Preloader;
}();

var Sprite = function () {
    function Sprite() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Sprite);

        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.alpha = 1;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }

    _createClass(Sprite, [{
        key: "render",
        value: function render(context) {
            context.translate(this.x, this.y);

            if (this.rotation !== 0) {
                context.translate(this.width / 2, this.height / 2);
                context.rotate(this.rotation * Math.PI / 180);
                context.translate(-this.width / 2, -this.height / 2);
            }

            context.scale(this.scaleX, this.scaleY);
            context.globalAlpha = this.alpha;
        }
    }]);

    return Sprite;
}();

var Game = function () {
    function Game(states, options) {
        var _this = this;

        _classCallCheck(this, Game);

        var defaults = {
            width: 800,
            height: 600,
            id: "game",
            preload: []
        };

        options = Object.assign(defaults, options);

        this.camera = new Camera();
        this.pool = new Pool();
        this.viewport = new Viewport(options.width, options.height, options.id);
        this.fsm = new FSM(states, this.camera, this.pool, options.width, options.height);
        this.ticker = new Ticker(this.update.bind(this));

        if (options.preload.length) {
            new Preloader(options.preload, function () {
                _this.fsm.load("initial");
            });
        } else {
            this.fsm.load("initial");
        }
    }

    _createClass(Game, [{
        key: "update",
        value: function update(delta) {
            var _this2 = this;

            this.viewport.clear(this.fsm.state.bgColor);
            this.viewport.context.save();
            this.viewport.context.translate(-this.camera.x, -this.camera.y);

            this.fsm.state.update(delta);
            this.fsm.state.pool.each(function (item) {
                item.render(_this2.viewport.context);
            });

            this.viewport.context.restore();
        }
    }]);

    return Game;
}();

new Game({
    initial: {
        init: function init() {
            console.log("init");
        },
        update: function update(delta) {
            console.log(delta);
        },
        remove: function remove() {
            console.log("remove");
        }
    }
}, {
    preload: ["assets/cragger.png"]
});

//# sourceMappingURL=main.js.map