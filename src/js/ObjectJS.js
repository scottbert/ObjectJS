import Mixin from './Native';
import Core from './Core';
function ObjectJS () {
    const core = new Core({
        Mixin: Mixin
    });
    if (window) {
        window.ObjectJS = core;
    }
    return core;
}
export default ObjectJS();
