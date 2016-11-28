/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	var _Rectangle = __webpack_require__(13);
	
	var _Rectangle2 = _interopRequireDefault(_Rectangle);
	
	var _util = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _Game2.default({
	    initial: {
	        init: function init() {
	            this.bgColor = "#789";
	
	            this.rect = new _Rectangle2.default(64, 64);
	            this.rect.pivotX = 32;
	            this.rect.pivotY = 32;
	            this.rect.scaleX = -2;
	            this.rect.scaleY = -2;
	            this.rect.alpha = 0.2;
	            this.rect.rotation = 7.5;
	            this.rect.draggable = true;
	
	            this.rect2 = new _Rectangle2.default(320, 256);
	            this.rect2.draggable = true;
	            this.rect2.pivotX = -16;
	            this.rect2.pivotY = -16;
	            this.rect2.scaleX = -1;
	            this.rect2.scaleY = -1;
	            this.rect2.alpha = 0.4;
	            this.rect2.rotation = -45;
	
	            this.rect3 = new _Rectangle2.default(512, 64);
	            this.rect3.alpha = 0.4;
	            this.rect3.draggable = true;
	
	            this.pool.add(this.rect, this.rect2, this.rect3);
	
	            this.listeners.add("click", function (e) {
	                console.log((0, _util.getBoundingBox)(e.target));
	            }, this.rect);
	
	            this.listeners.add("drag", function (e) {
	                console.log((0, _util.getBoundingBox)(e.target));
	            }, this.rect2);
	
	            this.listeners.add("mousemove", function (e) {
	                console.log((0, _util.getBoundingBox)(e.target));
	            }, this.rect3);
	        },
	        update: function update(delta) {
	            //console.log("initial#update", delta);
	
	            //let speed = delta / 4;
	
	            //this.rect.x += speed;
	            //this.rect.rotation += speed;
	
	            if (this.rect.x + this.rect.width >= this.width) {
	                this.fsm.load("play");
	            }
	        },
	        remove: function remove() {
	            console.log("initial#remove");
	
	            this.pool.removeAll();
	        }
	    },
	    play: {
	        init: function init() {
	            console.log("play#init");
	            console.log(this.listeners);
	        },
	        update: function update(delta) {
	            console.log("play#update", delta);
	
	            this.game.reset();
	        }
	    }
	}, {
	    preload: ["assets/cragger.png"],
	    debug: true
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Camera = __webpack_require__(2);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var _Pool = __webpack_require__(3);
	
	var _Pool2 = _interopRequireDefault(_Pool);
	
	var _Viewport = __webpack_require__(5);
	
	var _Viewport2 = _interopRequireDefault(_Viewport);
	
	var _Input = __webpack_require__(6);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Listeners = __webpack_require__(7);
	
	var _Listeners2 = _interopRequireDefault(_Listeners);
	
	var _FSM = __webpack_require__(8);
	
	var _FSM2 = _interopRequireDefault(_FSM);
	
	var _Ticker = __webpack_require__(9);
	
	var _Ticker2 = _interopRequireDefault(_Ticker);
	
	var _Preloader = __webpack_require__(10);
	
	var _Preloader2 = _interopRequireDefault(_Preloader);
	
	var _debug = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	    function Game(states) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        _classCallCheck(this, Game);
	
	        var defaults = {
	            width: 640,
	            height: 512,
	            id: "game",
	            preload: [],
	            debug: false,
	            listenForMouse: true,
	            listenForTouch: true,
	            listenForKeyboard: true
	        };
	
	        this.states = states;
	        this.options = Object.assign(defaults, options);
	        this.hasBooted = false;
	
	        this.boot();
	    }
	
	    _createClass(Game, [{
	        key: "boot",
	        value: function boot() {
	            var _this = this;
	
	            // psuedo game object
	            this.game = {
	                reset: this.boot.bind(this)
	            };
	
	            this.camera = new _Camera2.default();
	            this.pool = new _Pool2.default();
	
	            if (!this.hasBooted) {
	                this.viewport = new _Viewport2.default(this.options);
	                this.input = new _Input2.default(this.viewport.canvas, this.pool, this.options);
	            }
	
	            this.listeners = new _Listeners2.default(this.input);
	            this.fsm = new _FSM2.default(this);
	
	            if (this.hasBooted) {
	                this.ticker.cancel();
	            }
	
	            this.ticker = new _Ticker2.default(this.update.bind(this));
	
	            if (!this.hasBooted && this.options.preload.length) {
	                new _Preloader2.default(this.options.preload, function () {
	                    _this.fsm.load("initial");
	                });
	            } else {
	                this.fsm.load("initial");
	            }
	
	            this.hasBooted = true;
	        }
	    }, {
	        key: "update",
	        value: function update(delta) {
	            var _this2 = this;
	
	            if (!this.fsm.state) {
	                return;
	            }
	
	            var context = this.viewport.context;
	
	            this.listeners.executeHandlers();
	            this.viewport.clear(this.fsm.state.bgColor);
	
	            context.save();
	            context.translate(-this.camera.x, -this.camera.y);
	
	            if (this.options.debug) {
	                (0, _debug.drawGrid)(context, this.options.width, this.options.height);
	            }
	
	            this.fsm.state.update(delta);
	            this.fsm.state.pool.each(function (item) {
	                context.save();
	                item.render(context);
	                context.restore();
	
	                if (_this2.options.debug) {
	                    (0, _debug.drawBoundingBox)(context, item);
	                    (0, _debug.drawPivot)(context, item);
	                }
	            }, this);
	
	            context.restore();
	        }
	    }]);
	
	    return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Camera = function Camera() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	    _classCallCheck(this, Camera);
	
	    this.x = x;
	    this.y = y;
	};
	
	exports.default = Camera;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	                if ((0, _util.itemMatch)(item, removee)) {
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
	
	exports.default = Pool;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var itemMatch = exports.itemMatch = function itemMatch(a, b) {
	    return a.uid === b.uid;
	};
	
	var getBoundingBox = exports.getBoundingBox = function getBoundingBox(item) {
	    var w = item.width * Math.abs(item.scaleX);
	    var h = item.height * Math.abs(item.scaleY);
	    var x1 = item.globalX;
	    var y1 = item.globalY;
	    var x2 = item.scaleX >= 0 ? x1 + w : x1 - w;
	    var y2 = item.scaleY >= 0 ? y1 + h : y1 - h;
	
	    return {
	        minX: x1 <= x2 ? x1 : x2,
	        minY: y1 <= y2 ? y1 : y2,
	        maxX: x1 >= x2 ? x1 : x2,
	        maxY: y1 >= y2 ? y1 : y2
	    };
	};
	
	var pointRectCollide = exports.pointRectCollide = function pointRectCollide(x, y, rect) {
	    var bb = getBoundingBox(rect);
	    return x >= bb.minX && x <= bb.maxX && y >= bb.minY && y <= bb.maxY;
	};
	
	var getScaleFactor = exports.getScaleFactor = function getScaleFactor(canvas) {
	    var factor = 1;
	
	    // check if canvas has been scaled via CSS
	    if (canvas.style.width) {
	        var cssWidth = parseInt(canvas.style.width, 10);
	        factor = canvas.width / cssWidth;
	    }
	
	    return factor;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Xform = function () {
	    function Xform() {
	        _classCallCheck(this, Xform);
	
	        this.stack = [this.getSet()];
	    }
	
	    _createClass(Xform, [{
	        key: "translate",
	        value: function translate() {
	            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	            var xforms = this.getTransforms();
	
	            xforms.x += x;
	            xforms.y += y;
	        }
	    }, {
	        key: "scale",
	        value: function scale() {
	            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	            var xforms = this.getTransforms();
	
	            xforms.scaleX *= x;
	            xforms.scaleY *= y;
	        }
	    }, {
	        key: "rotate",
	        value: function rotate(rad) {
	            var xforms = this.getTransforms();
	
	            xforms.rotation += rad;
	        }
	    }, {
	        key: "clone",
	        value: function clone(set) {
	            return {
	                x: set.x,
	                y: set.y,
	                scaleX: set.scaleX,
	                scaleY: set.scaleY,
	                rotation: set.rotation
	            };
	        }
	    }, {
	        key: "getSet",
	        value: function getSet() {
	            return {
	                x: 0,
	                y: 0,
	                scaleX: 1,
	                scaleY: 1,
	                rotation: 0
	            };
	        }
	    }, {
	        key: "getTransforms",
	        value: function getTransforms() {
	            return this.stack[this.stack.length - 1];
	        }
	    }, {
	        key: "save",
	        value: function save() {
	            this.stack.push(this.clone(this.getTransforms()));
	        }
	    }, {
	        key: "restore",
	        value: function restore() {
	            this.stack.pop();
	
	            if (!this.stack.length) {
	                this.stack[0] = this.getSet();
	            }
	        }
	    }]);
	
	    return Xform;
	}();
	
	var Viewport = function () {
	    function Viewport(options) {
	        var _this = this;
	
	        _classCallCheck(this, Viewport);
	
	        this.width = options.width;
	        this.height = options.height;
	        this.canvas = document.querySelector("#" + options.id);
	        this.canvas.width = this.width;
	        this.canvas.height = this.height;
	        this.context = this.canvas.getContext("2d");
	        this.xform = new Xform();
	
	        // save original context operations
	        var original = {
	            translate: this.context.translate,
	            rotate: this.context.rotate,
	            scale: this.context.scale,
	            save: this.context.save,
	            restore: this.context.restore
	        };
	
	        // set new operations that call originals
	        // NOTE setTransform is not currently supported
	        this.context.translate = function (x, y) {
	            _this.xform.translate(x, y);
	            original.translate.call(_this.context, x, y);
	            _this.context.xform = _this.xform.getTransforms();
	        };
	
	        this.context.rotate = function (deg) {
	            _this.xform.rotate(deg);
	            original.rotate.call(_this.context, deg);
	            _this.context.xform = _this.xform.getTransforms();
	        };
	
	        this.context.scale = function (x, y) {
	            _this.xform.scale(x, y);
	            original.scale.call(_this.context, x, y);
	            _this.context.xform = _this.xform.getTransforms();
	        };
	
	        this.context.save = function () {
	            _this.xform.save();
	            original.save.call(_this.context);
	            _this.context.xform = _this.xform.getTransforms();
	        };
	
	        this.context.restore = function () {
	            _this.xform.restore();
	            original.restore.call(_this.context);
	            _this.context.xform = _this.xform.getTransforms();
	        };
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
	
	exports.default = Viewport;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ClickManager = function () {
	    function ClickManager(start, end) {
	        _classCallCheck(this, ClickManager);
	
	        this.startEvent = start;
	        this.endEvent = end;
	        this.clickee = null;
	    }
	
	    _createClass(ClickManager, [{
	        key: "getEvents",
	        value: function getEvents(event) {
	            var clickEvents = [];
	
	            // emulate events
	            switch (event.type) {
	                case this.startEvent:
	                    this.clickee = event.target;
	                    break;
	                case this.endEvent:
	                    if (this.clickee && (0, _util.itemMatch)(this.clickee, event.target)) {
	                        var type = void 0;
	
	                        switch (this.endEvent) {
	                            case "mouseup":
	                                type = "click";
	                                break;
	                            case "touchend":
	                                type = "tap";
	                                break;
	                        }
	
	                        clickEvents.push(Object.assign({}, event, {
	                            type: type
	                        }));
	                    }
	
	                    this.clickee = null;
	                    break;
	            }
	
	            return clickEvents;
	        }
	    }]);
	
	    return ClickManager;
	}();
	
	var DragManager = function () {
	    function DragManager(start, move, end) {
	        _classCallCheck(this, DragManager);
	
	        this.startEvent = start;
	        this.moveEvent = move;
	        this.endEvent = end;
	        this.dragee = null;
	        this.isDragging = false;
	        this.canDrag = false;
	    }
	
	    _createClass(DragManager, [{
	        key: "getEvents",
	        value: function getEvents(event) {
	            var dragEvents = [];
	
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
	    }]);
	
	    return DragManager;
	}();
	
	var Input = function () {
	    function Input(canvas, pool, options) {
	        _classCallCheck(this, Input);
	
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
	
	    _createClass(Input, [{
	        key: "handleEvents",
	        value: function handleEvents(e) {
	            e.preventDefault();
	            e.stopPropagation();
	
	            var boundingRect = this.canvas.getBoundingClientRect();
	            var scaleFactor = (0, _util.getScaleFactor)(this.canvas);
	            var event = {
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
	                event.x = Math.floor((event.x - (boundingRect.left + window.scrollX)) * scaleFactor);
	                event.y = Math.floor((event.y - (boundingRect.top + window.scrollY)) * scaleFactor);
	
	                // find and set target object
	                this.pool.each(function (item) {
	                    if ((0, _util.pointRectCollide)(event.x, event.y, item)) {
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
	
	            this.queuedEvents = this.queuedEvents.concat(this.mouseClickManager ? this.mouseClickManager.getEvents(event) : [], this.touchClickManager ? this.touchClickManager.getEvents(event) : [], this.mouseDragManager ? this.mouseDragManager.getEvents(event) : [], this.touchDragManager ? this.touchDragManager.getEvents(event) : []);
	        }
	    }]);
	
	    return Input;
	}();
	
	exports.default = Input;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Listeners = function () {
	    function Listeners(input) {
	        _classCallCheck(this, Listeners);
	
	        this.input = input;
	        this.dragActionManager = {
	            dragee: null,
	            offset: {
	                x: 0,
	                y: 0
	            },
	
	            handle: function handle(event) {
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
	
	    _createClass(Listeners, [{
	        key: "add",
	        value: function add(type, handler, target) {
	            this.events[type].push({
	                original: handler,
	                handler: handler.bind(this.state),
	                target: target
	            });
	        }
	    }, {
	        key: "remove",
	        value: function remove(type, handler) {
	            for (var i = 0, len = this.events[type].length; i < len; i++) {
	                var event = this.events[type][i];
	
	                if (event.original === handler) {
	                    this.events[type].splice(i, 1);
	                    break;
	                }
	            }
	        }
	    }, {
	        key: "executeHandlers",
	        value: function executeHandlers() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.input.queuedEvents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var event = _step.value;
	
	                    switch (event.type) {
	                        case "drag":
	                        case "dragstart":
	                        case "dragend":
	                            this.dragActionManager.handle(event);
	                            break;
	                    }
	
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;
	
	                    try {
	                        for (var _iterator2 = this.events[event.type][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var handlerObj = _step2.value;
	
	                            // if not drag|dragend event, and target given, and it matches OR no target given
	                            // it doesn't apply to drag b/c on fast dragging, the event coordinates will move off the target
	                            // it doesn't apply to dragend b/c a dragend can happen on higher (top-most) target
	                            if (handlerObj.target) {
	                                if (event.target && (0, _util.itemMatch)(handlerObj.target, event.target)) {
	                                    handlerObj.handler(event);
	                                }
	                            } else {
	                                handlerObj.handler(event);
	                            }
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
	
	            this.input.queuedEvents = [];
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
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
	            };
	        }
	    }]);
	
	    return Listeners;
	}();
	
	exports.default = Listeners;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FSM = function () {
	    function FSM(game) {
	        _classCallCheck(this, FSM);
	
	        this.states = game.states;
	        this.game = game.game;
	        this.listeners = game.listeners;
	        this.camera = game.camera;
	        this.pool = game.pool;
	        this.width = game.options.width;
	        this.height = game.options.height;
	    }
	
	    _createClass(FSM, [{
	        key: "load",
	        value: function load(name) {
	            if (this.state && this.state.remove) {
	                this.state.remove();
	            }
	
	            this.listeners.reset();
	
	            this.state = this.states[name];
	
	            this.state.game = this.game;
	            this.state.listeners = this.listeners;
	            this.state.camera = this.camera;
	            this.state.pool = this.pool;
	            this.state.fsm = this;
	            this.state.width = this.width;
	            this.state.height = this.height;
	
	            if (this.state.init) {
	                this.state.init();
	            }
	        }
	    }]);
	
	    return FSM;
	}();
	
	exports.default = FSM;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ticker = function () {
	    function Ticker(callback) {
	        _classCallCheck(this, Ticker);
	
	        this.callback = callback;
	        this.then = Date.now();
	        this.update = this.update.bind(this);
	        this.cancelled = false;
	
	        this.requestId = requestAnimationFrame(this.update);
	    }
	
	    _createClass(Ticker, [{
	        key: "update",
	        value: function update() {
	            if (this.cancelled) {
	                return;
	            }
	
	            var now = Date.now();
	            // use min to cap delta so things don't go haywire on "blur"
	            var delta = Math.min(now - this.then, 32);
	
	            this.callback(delta);
	            this.then = now;
	
	            this.requestId = requestAnimationFrame(this.update);
	        }
	    }, {
	        key: "cancel",
	        value: function cancel() {
	            this.cancelled = true;
	            cancelAnimationFrame(this.requestId);
	        }
	    }]);
	
	    return Ticker;
	}();
	
	exports.default = Ticker;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Preloader = function () {
	    function Preloader(paths, callback) {
	        _classCallCheck(this, Preloader);
	
	        this.callback = callback;
	        this.loaded = 0;
	        this.count = paths.length;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var path = _step.value;
	
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
	
	exports.default = Preloader;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.drawBoundingBox = exports.drawPivot = exports.drawGrid = undefined;
	
	var _util = __webpack_require__(4);
	
	var drawGrid = exports.drawGrid = function drawGrid(context, width, height) {
	    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;
	    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#000";
	
	    var halfWidth = width / 2;
	    var halfHeight = height / 2;
	    var linesX = width / size;
	    var linesY = height / size;
	    var count = linesX > linesY ? linesX : linesY;
	    var i = -1;
	
	    context.save();
	    context.strokeStyle = color;
	    context.translate(width / 2, height / 2);
	    context.globalAlpha = 0.6;
	    context.lineWidth = 1;
	
	    while (i++ < count) {
	        if (i !== 0) {
	            context.globalAlpha = i % 2 > 0 ? 0.2 : 0.4;
	        }
	
	        context.beginPath();
	
	        context.moveTo(-halfWidth, -i * size);
	        context.lineTo(width, -i * size);
	        context.moveTo(-halfWidth, i * size);
	        context.lineTo(width, i * size);
	
	        context.moveTo(-i * size, -halfHeight);
	        context.lineTo(-i * size, height);
	        context.moveTo(i * size, -halfHeight);
	        context.lineTo(i * size, height);
	
	        context.stroke();
	    }
	
	    context.restore();
	};
	
	var drawPivot = exports.drawPivot = function drawPivot(context, item) {
	    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;
	    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#FFF";
	
	    var halfSize = size / 2;
	
	    context.save();
	    context.translate(Math.floor(item.x), Math.floor(item.y));
	    context.rotate(item.rotation * Math.PI / 180);
	    context.scale(item.scaleX, item.scaleY);
	
	    context.strokeStyle = color;
	    context.lineWidth = 4;
	    context.globalAlpha = 0.4;
	
	    context.beginPath();
	    context.moveTo(-halfSize, 0);
	    context.lineTo(halfSize, 0);
	    context.moveTo(0, -halfSize);
	    context.lineTo(0, halfSize);
	    context.stroke();
	    context.restore();
	};
	
	var drawBoundingBox = exports.drawBoundingBox = function drawBoundingBox(context, item) {
	    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#C66";
	
	    var bb = (0, _util.getBoundingBox)(item);
	
	    context.save();
	    context.fillStyle = color;
	    context.lineWidth = 2;
	    context.globalAlpha = 0.4;
	    context.fillRect(bb.minX, bb.minY, bb.maxX - bb.minX, bb.maxY - bb.minY);
	    context.restore();
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	        this.pivotX = 0;
	        this.pivotY = 0;
	        this.draggable = false;
	        this.visible = true;
	        this.composite = "source-over";
	        this.uid = Sprite.uid++;
	    }
	
	    _createClass(Sprite, [{
	        key: "render",
	        value: function render(context) {
	            if (!this.visible) {
	                return;
	            }
	
	            context.translate(Math.floor(this.x), Math.floor(this.y));
	            context.rotate(this.rotation * Math.PI / 180);
	            context.scale(this.scaleX, this.scaleY);
	            context.translate(Math.floor(-this.pivotX), Math.floor(-this.pivotY));
	
	            context.globalAlpha = this.alpha;
	            context.globalCompositeOperation = this.compositeOperation;
	        }
	    }, {
	        key: "globalX",
	        get: function get() {
	            return this.x - this.pivotX * this.scaleX;
	        }
	    }, {
	        key: "globalY",
	        get: function get() {
	            return this.y - this.pivotY * this.scaleY;
	        }
	    }]);
	
	    return Sprite;
	}();
	
	Sprite.uid = 0;
	
	exports.default = Sprite;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Sprite2 = __webpack_require__(12);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rectangle = function (_Sprite) {
	    _inherits(Rectangle, _Sprite);
	
	    function Rectangle(x, y) {
	        _classCallCheck(this, Rectangle);
	
	        var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, x, y));
	
	        _this.fill = "#000";
	        _this.stroke = "";
	        return _this;
	    }
	
	    _createClass(Rectangle, [{
	        key: "render",
	        value: function render(context) {
	            _get(Rectangle.prototype.__proto__ || Object.getPrototypeOf(Rectangle.prototype), "render", this).call(this, context);
	
	            context.beginPath();
	            context.rect(0, 0, this.width, this.height);
	
	            if (this.fill) {
	                context.fillStyle = this.fill;
	                context.fill();
	            }
	
	            if (this.stroke) {
	                context.strokeStyle = this.stroke;
	                context.stroke();
	            }
	        }
	    }]);
	
	    return Rectangle;
	}(_Sprite3.default);
	
	exports.default = Rectangle;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map