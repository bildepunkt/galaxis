import Jasmine from "jasmine";
import Element from "./_mocks/Element";
import SpecReporter from "jasmine-spec-reporter";

const noop = ()=> {};

// mock some DOM items
global.document = {
    querySelector () {
        return new Element();
    }
};

global.rafMock = {
    callback: null,

    cancel () {
        this.callback = null;
    },
    request (callback) {
        this.callback = callback;
    },
    tick () {
        this.callback();
    }
};
global.requestAnimationFrame = global.rafMock.request.bind(global.rafMock);
global.cancelAnimationFrame = global.rafMock.cancel.bind(global.rafMock);

global.window = {
    scrollX: 0,
    scrollY: 0
};

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: noop});    // jasmine < 2.4.1, remove default reporter logs
jrunner.env.clearReporters();                       // jasmine >= 2.5.2, remove default reporter logs
jrunner.addReporter(new SpecReporter());            // add jasmine-spec-reporter
jrunner.loadConfigFile();                           // load jasmine.json configuration
jrunner.execute();
