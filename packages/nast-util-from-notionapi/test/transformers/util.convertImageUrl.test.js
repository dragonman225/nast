const { convertImageUrl } = require('../../dist/transformers/utils')

test('Convert a private AWS S3 URL to a public one', () => {
  expect(convertImageUrl('https://s3')).toBe('https://notion.so/image/https%3A%2F%2Fs3')
})

test('Convert a built-in image URL to a public one', () => {
  expect(convertImageUrl('/image/xxx.jpg')).toBe('https://notion.so/image/xxx.jpg')
})

test('Convert a built-in image URL with width', () => {
  expect(convertImageUrl('/image/xxx.jpg', 123)).toBe('https://notion.so/image/xxx.jpg?width=123')
})

test('Bypass a normal image URL', () => {
  expect(convertImageUrl('http://foo.com/bar.jpg')).toBe('http://foo.com/bar.jpg')
})

test('Bypass an emoji', () => {
  expect(convertImageUrl('😃')).toBe('😃')
})