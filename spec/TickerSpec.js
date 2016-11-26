import Ticker from "../src/Ticker";

describe("Ticker", ()=> {
    let callback = jasmine.createSpy("callback");
    let ticker;

    beforeEach(()=> {
        callback.calls.reset();
        ticker = new Ticker(callback);
    });

    it("executes the given callback", ()=> {
        rafMock.tick();
        expect(callback).toHaveBeenCalled();
    });

    it("does not update if cancelled", ()=> {
        rafMock.tick();
        ticker.cancel();
        callback.calls.reset();
        ticker.update();
        expect(callback).not.toHaveBeenCalled();
    });
});
