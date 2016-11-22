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
global.requestAnimationFrame = (callback)=> {
    setTimeout(()=> {
        console.log("callback");
        callback();
    }, 16);
};
global.cancelAnimationFrame = noop;

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: noop});    // jasmine < 2.4.1, remove default reporter logs
jrunner.env.clearReporters();                       // jasmine >= 2.5.2, remove default reporter logs
jrunner.addReporter(new SpecReporter());            // add jasmine-spec-reporter
jrunner.loadConfigFile();                           // load jasmine.json configuration
jrunner.execute();
