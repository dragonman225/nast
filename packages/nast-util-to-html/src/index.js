'use strict'

const { toHTML } = require('./to-html')
const renderUtils = require('./render-utils')

module.exports = {
  toHTML,
  toHTMLInternal: {
    ...renderUtils
  }
}
