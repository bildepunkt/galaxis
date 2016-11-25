import { getBoundingBox } from "./util";

export const drawGrid = (context, width, height, size=32, color="#000")=> {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const linesX = width / size;
    const linesY = height / size;
    const count = linesX > linesY ? linesX : linesY;
    let i = -1;

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
}

export const drawPivot = (context, item, size=16, color="#FFF")=> {
    const halfSize = size / 2;

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
}

export const drawBoundingBox = (context, item, color="#C66")=> {
    let bb = getBoundingBox(item);

    context.save();
    context.fillStyle = color;
    context.lineWidth = 2;
    context.globalAlpha = 0.4;
    context.fillRect(bb.minX, bb.minY, bb.maxX - bb.minX, bb.maxY - bb.minY);
    context.restore();
}
