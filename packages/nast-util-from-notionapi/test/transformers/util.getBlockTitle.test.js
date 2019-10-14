const { getBlockTitle } = require('../../dist/transformers/utils')

test('Get title from a block without properties', () => {
  expect(getBlockTitle({})).toStrictEqual([])
})

test('Get title from a block with properties but no properties.title', () => {
  expect(getBlockTitle({ properties: {} })).toStrictEqual([])
})

test('Get title from a block with properties and properties.title', () => {
  expect(getBlockTitle({ properties: { title: [['hello']] } })).toStrictEqual([['hello']])
})