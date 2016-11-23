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

        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.scale(this.scaleX, this.scaleY);
        context.translate(-this.pivotX, -this.pivotY);

        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.compositeOperation;

        // TODO - R E M O V E ! ! !
        context.fillStyle = "#000";
        context.fillRect(0, 0, this.width, this.height);
    }

    get globalX () {
        return this.x - this.pivotX * Math.abs(this.scaleX);
    }

    get globalY () {
        return this.y - this.pivotY * Math.abs(this.scaleY);
    }
}

Sprite.uid = 0;

export default Sprite;
