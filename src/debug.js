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
    context.globalAlpha = 1;
    context.lineWidth = 1;

    while (i++ < count) {
        if (i !== 0) {
            context.globalAlpha = 0.4;
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

export const drawPivot = (context, size=16, color="#FFF")=> {
    const halfSize = size / 2;

    context.save();
    context.strokeStyle = color;
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(-halfSize, 0);
    context.moveTo(halfSize, 0);
    context.moveTo(0, -halfSize);
    context.moveTo(0, halfSize);
    context.stroke();
    context.restore();
}
