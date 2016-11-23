import Game from "../src/Game";
import Sprite from "../src/Sprite";
import { getBoundingBox } from "../src/util";

new Game({
    initial: {
        init () {
            console.log("initial#init");

            this.bgColor = "#678";

            this.rect = new Sprite(64, 64); 
            //this.rect.pivotX = 32;
            //this.rect.pivotY = 32;
            this.rect.scaleX = 2;
            this.rect.scaleY = 2;
            this.rect.alpha = 0.2;
            this.rect.rotation = 7.5;

            this.rect2 = new Sprite(256, 256);
            this.rect2.draggable = true;    
            this.rect2.scaleX = -1;
            this.rect2.scaleY = -1;
            this.rect2.alpha = 0.4;

            this.pool.add(this.rect, this.rect2);

            this.listeners.add("click", (e)=> {
                console.log(e.target);
                console.log(getBoundingBox(e.target));
            }, this.rect);

            this.listeners.add("drag", (e)=> {
                console.log(e.target);
                console.log(getBoundingBox(e.target));
            }, this.rect2);

            console.log(this.listeners, 2);
        },
        update (delta) {
            //console.log("initial#update", delta);

            //let speed = delta / 4;

            //this.rect.x += speed;
            //this.rect.rotation += speed;

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
    ],
    debug: true
});
