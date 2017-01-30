/**
 * @author scottvanlooy
 */

var Console = (function () {
    var Nlog,
        log,
        warn,
        error;
    Nlog = function (type) {
        if (window.console) {
            return function () {
                window.console[type](arguments);
            };
        }
    };
    log = new Nlog('log');
    warn = new Nlog('warn');
    error = new Nlog('error');
    return {
        log: log,
        warn: warn,
        error: error
    };
}());
export default Console;
