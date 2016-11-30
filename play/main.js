import Game from "../src/Game";
import Rectangle from "../src/shape/Rectangle";
import { getBoundingBox } from "../src/util";

new Game({
    initial: {
        preload: [
            "assets/cragger.png"
        ],

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

            this.game.pool.add(this.rect, this.rect2, this.rect3);

            this.game.listeners.add("click", (e)=> {
                console.log(getBoundingBox(e.target, this.game.camera));
            }, this.rect);

            this.game.listeners.add("drag", (e)=> {
                console.log(getBoundingBox(e.target, this.game.camera));
            }, this.rect2);

            this.game.listeners.add("mousemove", (e)=> {
                console.log(getBoundingBox(e.target, this.game.camera));
            }, this.rect3);
        },

        update (delta) {
            //console.log("initial#update", delta);

            //let speed = delta / 4;

            //this.rect.x += speed;
            //this.rect.rotation += speed;

            this.game.camera.x += 1;

            if (getBoundingBox(this.rect, this.game.camera).maxX >= this.game.width) {
                this.game.fsm.load("play");
            }
        },

        destroy () {
            console.log("initial#remove");

            this.game.pool.removeAll();
        }
    },
    play: {
        init () {
            console.log("play#init");
            console.log(this.game.listeners);

            this.game.listeners.add("click", ()=> {
                this.game.reset();    
            });
        },
        update (delta) {
            console.log("play#update", delta);
        }
    }
}, {
    debug: true
});
