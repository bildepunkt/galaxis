import Game from "../src/Game";
import Rectangle from "../src/Rectangle";
import { getBoundingBox } from "../src/util";

new Game({
    initial: {
        init () {
            this.bgColor = "#789";

            this.rect = new Rectangle(64, 64);
            this.rect.pivotX = 32;
            this.rect.pivotY = 32;
            this.rect.scaleX = -2;
            this.rect.scaleY = -2;
            this.rect.alpha = 0.2;
            this.rect.rotation = 7.5;
            this.rect.draggable = true;

            this.rect2 = new Rectangle(320, 256);
            this.rect2.draggable = true;    
            this.rect2.pivotX = -16;
            this.rect2.pivotY = -16;
            this.rect2.scaleX = -1;
            this.rect2.scaleY = -1;
            this.rect2.alpha = 0.4;
            this.rect2.rotation = -45;

            this.rect3 = new Rectangle(512, 64);
            this.rect3.alpha = 0.4;
            this.rect3.draggable = true;

            this.pool.add(this.rect, this.rect2, this.rect3);

            this.listeners.add("click", (e)=> {
                console.log(getBoundingBox(e.target));
            }, this.rect);

            this.listeners.add("drag", (e)=> {
                console.log(getBoundingBox(e.target));
            }, this.rect2);

            this.listeners.add("mousemove", (e)=> {
                console.log(getBoundingBox(e.target));
            }, this.rect3);
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
