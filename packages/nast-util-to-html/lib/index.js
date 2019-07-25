'use strict'
const { renderRoot } = require('./render-node')
const renderUtils = require('./render-utils')

module.exports = {
  toHTML,
  toHTMLInternal: {
    ...renderUtils
  }
}

/**
 * Generate HTML from NotionAST.
 * @param {Root} tree - NotionAST.
 * @returns {String} HTML string.
 */
function toHTML(tree) {
  return renderRoot(tree)
}