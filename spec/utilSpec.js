import Sprite from "../src/Sprite";
import * as util from "../src/util";

describe("util", ()=> {
    it("itemMatch", ()=> {
        let a = new Sprite();
        let b = new Sprite();
        
        expect(util.itemMatch(a, b)).toBe(false);
        expect(util.itemMatch(a, a)).toBe(true);
    });

    it("getBoundingBox", ()=> {
        let s = new Sprite();

        s.width = s.height = 64;
        expect(util.getBoundingBox(s)).toEqual({
            minX: 0, minY: 0, maxX: 64, maxY: 64
        });

        s.scaleX = s.scaleY = -2;
        expect(util.getBoundingBox(s)).toEqual({
            minX: -128, minY: -128, maxX: 0, maxY: 0
        });

        s.x = s.y = 64;
        expect(util.getBoundingBox(s)).toEqual({
            minX: -64, minY: -64, maxX: 64, maxY: 64
        });
    });

    xit("pointRectCollide", ()=> {

    });

    xit("getScaleFactor", ()=> {

    });    
});
