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

        context.translate(Math.floor(this.x), Math.floor(this.y));
        context.rotate(this.rotation * Math.PI / 180);
        context.scale(this.scaleX, this.scaleY);
        context.translate(Math.floor(-this.pivotX), Math.floor(-this.pivotY));

        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.compositeOperation;
    }

    get globalX () {
        return this.x - this.pivotX * this.scaleX;
    }

    get globalY () {
        return this.y - this.pivotY * this.scaleY;
    }
}

Sprite.uid = 0;

export default Sprite;
