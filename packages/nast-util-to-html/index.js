'use strict'

const { toHTML } = require('./lib/to-html')
const renderUtils = require('./lib/render-utils')

module.exports = {
  toHTML,
  toHTMLInternal: {
    ...renderUtils
  }
}
