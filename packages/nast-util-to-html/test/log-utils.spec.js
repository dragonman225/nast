const { raiseWarning } = require('../lib/log-utils')

module.exports = test

function test() {
  raiseWarning('This is a test.')
}