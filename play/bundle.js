"use strict";

var _Game = require("../src/Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Game2.default({
    initial: {
        init: function init() {
            console.log("initial#init");

            this.bgColor = "#678";
            this.rect = new Sprite();
            //this.rect.pivotX = 32;
            //this.rect.pivotY = 32;
            //this.rect.scaleX = 2;
            //this.rect.scaleY = 2;
            this.rect2 = new Sprite(128, 128);
            this.rect2.draggable = true;
            this.pool.add(this.rect, this.rect2);

            this.listeners.add("click", function (e) {
                console.log(e);
            }, this.rect);

            console.log(this.listeners, 2);
        },
        update: function update(delta) {
            //console.log("initial#update", delta);

            var speed = delta / 4;

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
    preload: ["assets/cragger.png"]
});

//# sourceMappingURL=bundle.js.map