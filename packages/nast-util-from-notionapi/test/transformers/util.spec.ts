import { test } from 'zora'
import {
  convertImageUrl,
  getBlockIcon,
  getBlockColor
} from '../../src/transformers/utils'

export function testConvertImageUrl() {

  test('Convert these types of image URLs', t => {
    t.test('Convert a private AWS S3 URL to a public one', t => {
      t.equal(convertImageUrl('https://s3'),
        'https://notion.so/image/https%3A%2F%2Fs3')
    })

    t.test('Convert a built-in image URL to a public one', t => {
      t.equal(convertImageUrl('/image/xxx.jpg'),
        'https://notion.so/image/xxx.jpg')
    })

    t.test('Convert a built-in image URL with width', t => {
      t.equal(convertImageUrl('/image/xxx.jpg', 123),
        'https://notion.so/image/xxx.jpg?width=123')
    })

    t.test('Bypass a normal image URL', t => {
      t.equal(convertImageUrl('http://foo.com/bar.jpg'),
        'http://foo.com/bar.jpg')
    })

    t.test('Bypass an emoji', t => {
      t.equal(convertImageUrl('😃'), '😃')
    })
  })

}

export function testGetBlockIcon() {

  test('Get block icon', t => {
    t.test('Get icon from a block without format', t => {
      t.equal(typeof getBlockIcon({} as any), 'undefined')
    })

    t.test('Get icon from a block with format but no format.page_icon', t => {
      t.equal(typeof getBlockIcon({ format: {} } as any), 'undefined')
    })

    t.test('Get emoji icon from a block with format and format.page_icon', t => {
      t.equal(getBlockIcon({ format: { page_icon: '😃' } } as any), '😃')
    })

    t.test('Get URL icon from a block with format and format.page_icon', t => {
      t.equal(getBlockIcon({ format: { page_icon: 'https://foo.com/bar.jpg' } } as any), 'https://foo.com/bar.jpg')
    })

    t.test('Get uploaded icon from a block with format and format.page_icon', t => {
      t.equal(getBlockIcon({ format: { page_icon: 'https://s3' } } as any), 'https://notion.so/image/https%3A%2F%2Fs3')
    })
  })

}

export function testGetBlockColor() {

  test('Get block color', t => {
    t.test('Get color from a block without format', t => {
      t.equal(typeof getBlockColor({} as any), 'undefined')
    })

    t.test('Get color from a block with format but no format.block_color', t => {
      t.equal(typeof getBlockColor({ format: {} } as any), 'undefined')
    })

    t.test('Get color from a block with format and format.block_color', t => {
      t.equal(getBlockColor({ format: { block_color: 'red' } } as any), 'red')
    })
  })

}