"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_control_1 = require("./render-control");
const render_utils_1 = require("./render-utils");
/**
 * Generate static HTML from NAST.
 */
function renderToHTML(tree, options = {
    contentOnly: false
}) {
    const contentOnly = typeof options.contentOnly !== 'undefined'
        ? options.contentOnly : false;
    /** Transform the tree so that it can be rendered */
    let newTree = render_utils_1.preRenderTransform(tree);
    if (contentOnly) {
        return render_utils_1.renderChildren(newTree.children, render_control_1.renderNode);
    }
    else {
        return render_control_1.renderRoot(newTree);
    }
}
exports.renderToHTML = renderToHTML;
//# sourceMappingURL=index.js.map