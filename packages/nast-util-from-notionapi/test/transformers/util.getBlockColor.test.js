const { getBlockColor } = require('../../dist/transformers/utils')

test('Get color from a block without format', () => {
  expect(getBlockColor({})).toBe(undefined)
})

test('Get color from a block with format but no format.block_color', () => {
  expect(getBlockColor({ format: {} })).toBe(undefined)
})

test('Get color from a block with format and format.block_color', () => {
  expect(getBlockColor({ format: { block_color: 'red' } })).toBe('red')
})