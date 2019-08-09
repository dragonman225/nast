"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const render_utils_1 = require("../render-utils");
function renderList(node, renderNext) {
    if (node.type === constants_1.NAST_BLOCK_TYPES.bulletedList)
        return renderBulletedList(node, renderNext);
    else
        (node.type === constants_1.NAST_BLOCK_TYPES.numberedList);
    return renderNumberedList(node, renderNext);
}
function renderBulletedList(node, renderNext) {
    let listItemsHTML = node.children.map(listItem => {
        return renderListItem(listItem, renderNext);
    });
    let html = `\
<ul>
  ${listItemsHTML.join('')}
</ul>`;
    return html;
}
function renderNumberedList(node, renderNext) {
    let listItemsHTML = node.children.map(listItem => {
        return renderListItem(listItem, renderNext);
    });
    let html = `\
<ol>
  ${listItemsHTML.join('')}
</ol>`;
    return html;
}
function renderListItem(node, renderNext) {
    let content = render_utils_1.renderTitle(node.text, false, '');
    /**
     * Without ul, some content become out of container.
     * But ul has its own indent padding, so we don't need the indent class.
     */
    let html = `\
<li>
  <div id="${node.id}">
    ${render_utils_1.renderBlock(node, content)}
  </div>
  ${render_utils_1.renderChildren(node.children, renderNext)}
</li>`;
    return html;
}
exports.default = renderList;
//# sourceMappingURL=list.js.map