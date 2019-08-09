'use strict';
const { renderBlock } = require('./render-utils');
module.exports = {
    renderBookmark
};
/**
 * Block: WebBookmark
 * !!! This should be replaced with more efficient implementation.
 * @param {WebBookmark} node
 * @returns {String}
 */
function renderBookmark(node) {
    let title = node.title ? node.title : '';
    let link = node.link;
    let content = `\
<div style="display: flex;">
  <div style="display: flex; text-align: left; overflow: hidden; border: 1px solid rgba(55, 53, 47, 0.16); border-radius: 0.7rem; position: relative; flex-grow: 1; color: rgb(55, 53, 47);">
    <div style="min-height: 1rem; overflow: hidden; text-align: left; width: 100%;">
      <a href="${link}" target="_blank" rel="noopener noreferrer" style="display: block; color: inherit; text-decoration: none;">
        <div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; width: 100%; display: block; padding: 16px;">
          <div style="font-size: 14px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${title}</div>
          <div style="font-size: 12px; display: flex; overflow: hidden; padding-top: 3px;">
            <div style="font-size: 12px; min-width: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${link}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>`;
    return renderBlock(node, content);
}
//# sourceMappingURL=render-blocks.js.map