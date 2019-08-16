"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_control_1 = require("./render-control");
const render_utils_1 = require("./render-utils");
/**
 * Generate static HTML from NAST or StyledString[].
 */
function renderToHTML(unknown, options = {
    contentOnly: false,
    bypassPreRenderTransform: false
}) {
    /** Check which type of input is it */
    if (Array.isArray(unknown)) {
        /** View it as StyledString[] if it's an array */
        return render_utils_1.renderTitle(unknown);
    }
    else {
        /** Otherwise, a tree */
        const tree = unknown;
        const contentOnly = typeof options.contentOnly !== 'undefined'
            ? options.contentOnly : false;
        /** Transform the tree if necessary so that it can be rendered */
        let newTree = options.bypassPreRenderTransform ? tree : render_utils_1.preRenderTransform(tree);
        /** If contentOnly flag is set, do not render the root node */
        if (contentOnly) {
            return render_utils_1.renderChildren(newTree.children, render_control_1.renderNode);
        }
        else {
            return render_control_1.renderRoot(newTree);
        }
    } // else
} // function
exports.renderToHTML = renderToHTML;
//# sourceMappingURL=index.js.map