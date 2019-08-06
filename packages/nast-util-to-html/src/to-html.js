'use strict'
const { renderRoot, renderNode } = require('./render-node')
const { renderChildren, preRenderTransform } = require('./render-utils')

module.exports = {
  toHTML
}

/**
 * @typedef {Object} renderOptions
 * @property {boolean} contentOnly - Render content only, no title, icon,
 * and cover. Default: `false`.
 */

/**
 * Generate HTML from NAST.
 * @param {Root} tree - NAST.
 * @param {renderOptions} options
 * @returns {String} HTML string.
 */
function toHTML(tree, options = {}) {
  const contentOnly = options.contentOnly || false

  /** Transform the tree so that it can be rendered */
  let newTree = preRenderTransform(tree)

  if (contentOnly) {
    return renderChildren(newTree.children, renderNode)
  } else {
    return renderRoot(newTree)
  }
}