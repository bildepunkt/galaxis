import Game from "../src/Game";

new Game({
    initial: {
        init () {
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

            this.listeners.add("click", (e)=> {
                console.log(e);
            }, this.rect);

            console.log(this.listeners, 2);
        },
        update (delta) {
            //console.log("initial#update", delta);

            let speed = delta / 4;

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
    ]
});
