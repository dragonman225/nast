'use strict'
const { renderRoot, renderNode } = require('./render-node')
const { renderChildren } = require('./render-utils')

module.exports = {
  toHTML
}

/**
 * @typedef {Object} renderOptions
 * @property {boolean} contentOnly - Render content only, no title, icon,
 * and cover. Default: `false`.
 */

/**
 * Generate HTML from NotionAST.
 * @param {Root} tree - NotionAST.
 * @param {renderOptions} options
 * @returns {String} HTML string.
 */
function toHTML(tree, options = {}) {
  const contentOnly = options.contentOnly || false
  if (contentOnly) {
    return renderChildren(tree.children, renderNode)
  } else {
    return renderRoot(tree)
  }
}