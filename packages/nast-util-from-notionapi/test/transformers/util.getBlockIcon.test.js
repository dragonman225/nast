const { getBlockIcon } = require('../../dist/transformers/utils')

test('Get icon from a block without format', () => {
  expect(getBlockIcon({})).toBe(undefined)
})

test('Get icon from a block with format but no format.page_icon', () => {
  expect(getBlockIcon({ format: {} })).toBe(undefined)
})

test('Get emoji icon from a block with format and format.page_icon', () => {
  expect(getBlockIcon({ format: { page_icon: '😃' } })).toBe('😃')
})

test('Get URL icon from a block with format and format.page_icon', () => {
  expect(getBlockIcon({ format: { page_icon: 'https://foo.com/bar.jpg' } })).toBe('https://foo.com/bar.jpg')
})

test('Get uploaded icon from a block with format and format.page_icon', () => {
  expect(getBlockIcon({ format: { page_icon: 'https://s3' } })).toBe('https://notion.so/image/https%3A%2F%2Fs3')
})