/**
 * @author Scott van Looy
 */
/**
 * @namespace contains the framework.
 */

function nodePath($node, name) {
    if (typeof name !== 'string') {
        return;
    }
    return $node.find('[data-json=' + name + ']');
}

function processText($node, name, text) {
    var n = nodePath($node, name);
    if (n) {
        n.parent().removeClass('template');
        n.removeClass('template');
        if (text === null) {
            n.addClass('template');
            return;
        }
        if (text.domID) {
            n.attr('id', text.domID);
        }
        if (text.cssClass) {
            n.addClass(text.cssClass);
        }
        if (text.href) {
            n.attr('href', text.href);
        }
        if (text.text || typeof text === 'string') {
            n.html(text.text || text);
        }
        return true;
    }
    return false;
}

function processLoop($node, name, array) {
    var n = nodePath($node, name),
        l = array.length,
        i,
        p,
        tmp;
    if (!n.length) {
        n = $node;
    }
    p = n.parent();
    n = n.remove().eq(0).removeClass('template');
    p.empty();
    for (i = 0; i < l; i++) {
        tmp = n.clone();
        if (typeof array[i] === 'string') {
            tmp.html(array[i]);
        } else {
            walkTree(tmp, array[i], name);
        }
        p.append(tmp);
    }
}

function checkNotJSON(json, j) {
    return json[j] === null ||
        (json !== null && (typeof json[j] === 'string' || json[j].text ||
        json[j].domID || json[j].cssClass || json[j].href));
}

function walkTree($node, json, name) {
    var j;
    if (typeof name === 'string' && typeof json === 'string') {
        processText($node, name, json);
    } else if (Array.isArray(json)) {
        processLoop($node, json);
    } else {
        for (j in json) {
            if (json.hasOwnProperty(j) && j !== 'enabled' && j !== 'obj_attributes') {
                if (checkNotJSON(json, j)) {
                    processText($node, j, json[j]);
                } else if (Array.isArray(json[j])) {
                    processLoop($node, j, json[j]);
                } else if (typeof json[j] === 'object') {
                    walkTree(nodePath($node, j), json[j]);
                }
            }
        }
    }
}
export default {walkTree};
