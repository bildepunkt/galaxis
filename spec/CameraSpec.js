import Camera from "../src/Camera";

describe("Camera", ()=> {
    it("initializes", ()=> {
        let cam = new Camera();
        expect(cam instanceof Camera).toBe(true);
        expect(cam.x).toEqual(0);
        expect(cam.y).toEqual(0);
    });
});
