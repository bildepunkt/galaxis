export const itemMatch = (a, b)=> {
    return a.uid === b.uid;
}

export const getBoundingBox = (item)=> {
    let w = item.width * Math.abs(item.scaleX);
    let h = item.height * Math.abs(item.scaleY);
    let x1 = item.x;
    let y1 = item.y;
    let x2 = item.scaleX >= 0 ? x1 + w : x1 - w;
    let y2 = item.scaleY >= 0 ? y1 + h : y1 - h;

    return {
        minX: x1 <= x2 ? x1 : x2,
        minY: y1 <= y2 ? y1 : y2,
        maxX: x1 >= x2 ? x1 : x2,
        maxY: y1 >= y2 ? y1 : y2
    };
}

export const pointRectCollide = (x, y, rect)=> {
    let bb = getBoundingBox(rect);
    return x >= bb.minX && x <= bb.maxX && y >= bb.minY && y <= bb.maxY;
}

export const getScaleFactor = (canvas)=> {
    let factor = 1;

    // check if canvas has been scaled via CSS
    if (canvas.style.width) {
        let cssWidth = parseInt(canvas.style.width, 10);
        factor = canvas.width / cssWidth;
    }

    return factor;
}
