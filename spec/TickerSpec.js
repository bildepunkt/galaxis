import Ticker from "../src/Ticker";

describe("Ticker", ()=> {
    let callback = jasmine.createSpy("callback");
    let ticker;

    beforeEach(()=> {
        callback.calls.reset();
        ticker = new Ticker(callback);
    });

    it("executes the given callback", ()=> {
        setTimeout(()=> {
            expect(callback).toHaveBeenCalled();
        }, 16);
    });

    it("does not update if cancelled", ()=> {
        ticker.cancel();
        callback.calls.reset();
        ticker.update();
        expect(callback).not.toHaveBeenCalled();
    });
});
