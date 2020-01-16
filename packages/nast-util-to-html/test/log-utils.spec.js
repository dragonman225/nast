const { raiseWarning } = require('../src/log-utils')

module.exports = test

function test() {
  raiseWarning('This is a test.')
  raiseWarning('Multiple args', 'second arg', { a: '123' })
}