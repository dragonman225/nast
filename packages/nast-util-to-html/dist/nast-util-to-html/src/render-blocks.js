'use strict';
const colorMap = require('./color-map');
const { renderBlock, renderTitle } = require('./render-utils');
module.exports = {
    renderDivider,
    renderQuote,
    renderCallout,
    renderImage,
    renderBookmark,
    renderEmbed,
    renderAudio,
    renderCode
};
/**
 * Block: Divider
 * @param {Divider} node
 * @returns {String}
 */
function renderDivider(node) {
    let content = '\
<div style="width: 100%; border: 1px solid rgba(55, 53, 47, 0.09);"></div>';
    return renderBlock(node, content);
}
/**
 * Block: Quote
 * @param {Quote} node
 * @returns {String}
 */
function renderQuote(node) {
    let content = `\
<blockquote>
  ${renderTitle(node.text)}
</blockquote>`;
    return renderBlock(node, content);
}
/**
 * Block: Callout
 * @param {Callout} node
 * @returns {String}
 */
function renderCallout(node) {
    let content = `\
<div>
  ${node.icon ? node.icon : ''}
</div>
<div style="margin-left: 8px;">
  ${renderTitle(node.text)}
</div>`;
    return renderBlock(node, content, colorMap.yellowBg);
}
/**
 * Block: Image
 * @param {Image} node
 * @returns {String}
 */
function renderImage(node) {
    let width = node.fullWidth ? '100%' : `${node.width}px`;
    let source = node.source;
    let content = `\
<div style="width: ${width}; margin: 0.5em auto; max-width: 100%;">
  <img src="${source}" style="width: 100%; object-fit: cover;">
</div>`;
    return renderBlock(node, content);
}
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
/**
 * Block: Video
 * @param {Nast.Embed} node
 * @returns {String}
 */
function renderEmbed(node) {
    let width = node.fullWidth ? '100%' : `${node.width}px`;
    let source = node.source;
    let aspectRatio = node.aspectRatio * 100;
    let iframeSandbox = 'allow-scripts allow-popups allow-forms allow-same-origin';
    let iframeStyle = 'position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: rgb(247, 246, 245);';
    let content = `\
<div style="width: ${width};">
  <div style="position: relative; min-height: 100px; height: 0; padding-bottom: ${aspectRatio}%;">
    <iframe src="${source}" frameborder="0" sandbox="${iframeSandbox}" allowfullscreen style="${iframeStyle}"></iframe>
  </div>
</div>`;
    return renderBlock(node, content);
}
/**
 * Block: Audio
 * @param {Nast.Audio} node
 * @returns {string}
 */
function renderAudio(node) {
    let content = `\
<audio controls>
  <source src="${node.source}">
</audio>
  `;
    return renderBlock(node, content);
}
/**
 * Block: Code
 * @param {Code} node
 * @returns {String}
 */
function renderCode(node) {
    let content = `\
<pre>
  <code>
${renderTitle(node.text, true, node.language)}
  </code>
</pre>`;
    return renderBlock(node, content);
}
//# sourceMappingURL=render-blocks.js.map