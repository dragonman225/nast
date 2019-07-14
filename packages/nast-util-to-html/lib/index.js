'use strict'
const { renderRoot } = require('./render-node')

module.exports = {
  toHTML
}

/**
 * Generate HTML from NotionAST.
 * @param {Root} tree - NotionAST.
 * @returns {String} HTML string.
 */
function toHTML(tree) {
  return renderRoot(tree)
}