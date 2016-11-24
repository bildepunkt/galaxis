class Xform {
    constructor () {
        this.stack = [this.getSet()];
    }

    translate (x=0, y=0) {
        let xforms = this.getTransforms();

        xforms.x += x;
        xforms.y += y;
    }

    scale (x=1, y=1) {
        let xforms = this.getTransforms();

        xforms.scaleX *= x;
        xforms.scaleY *= y;
    }

    rotate (rad) {
        let xforms = this.getTransforms();

        xforms.rotation += rad;
    }

    clone (set) {
        return {
            x: set.x,
            y: set.y,
            scaleX: set.scaleX,
            scaleY: set.scaleY,
            rotation: set.rotation
        };
    }

    getSet () {
        return {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            rotation: 0
        }
    }

    getTransforms () {
        return this.stack[this.stack.length - 1];
    }

    save () {
        this.stack.push(
            this.clone(this.getTransforms())
        );
    }

    restore () {
        this.stack.pop();

        if (!this.stack.length) {
            this.stack[0] = this.getSet();
        }
    }
}

export default class Viewport {
    constructor (options) {
        this.width = options.width;
        this.height = options.height;
        this.canvas = document.querySelector("#" + options.id);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.xform = new Xform();

        // save original context operations
        const original = {
            translate: this.context.translate,
            rotate: this.context.rotate,
            scale: this.context.scale,
            save: this.context.save,
            restore: this.context.restore
        };

        // set new operations that call originals
        // NOTE setTransform is not currently supported
        this.context.translate = (x, y)=> {
            this.xform.translate(x, y);
            original.translate.call(this.context, x, y);
            this.context.xform = this.xform.getTransforms();
        };

        this.context.rotate = (deg)=> {
            this.xform.rotate(deg);
            original.rotate.call(this.context, deg);
            this.context.xform = this.xform.getTransforms();
        };

        this.context.scale = (x, y)=> {
            this.xform.scale(x, y);
            original.scale.call(this.context, x, y);
            this.context.xform = this.xform.getTransforms();
        };

        this.context.save = ()=> {
            this.xform.save();
            original.save.call(this.context);
            this.context.xform = this.xform.getTransforms();
        };

        this.context.restore = ()=> {
            this.xform.restore();
            original.restore.call(this.context);
            this.context.xform = this.xform.getTransforms();
        };
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
