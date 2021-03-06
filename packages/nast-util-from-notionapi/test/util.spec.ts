import { test } from "zora"
import {
  convertImageUrl,
  getBlockIcon,
  getBlockColor
} from "../src/util"

const dummyBlockId = "0eeee000-cccc-bbbb-aaaa-123450000000"
const imageS3 = "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/example.jpg"
const imageS3Encoded = encodeURIComponent(imageS3)

export function testConvertImageUrl() {

  test("Convert these types of image URLs", t => {
    t.test("Convert a private AWS S3 URL to a public one", t => {
      t.equal(convertImageUrl(dummyBlockId, imageS3),
        `https://www.notion.so/signed/${imageS3Encoded}?table=block&id=${dummyBlockId}`)
    })

    t.test("Convert a built-in image URL to a public one", t => {
      t.equal(convertImageUrl(dummyBlockId, "/images/xxx.jpg"),
        "https://www.notion.so/images/xxx.jpg")
    })

    t.test("Convert a built-in image URL with width", t => {
      t.equal(convertImageUrl(dummyBlockId, "/images/xxx.jpg", 123),
        "https://www.notion.so/images/xxx.jpg?width=123")
    })

    t.test("Bypass a normal image URL", t => {
      t.equal(convertImageUrl(dummyBlockId, "http://foo.com/bar.jpg"),
        "http://foo.com/bar.jpg")
    })

    t.test("Bypass an emoji", t => {
      t.equal(convertImageUrl(dummyBlockId, "😃"), "😃")
    })
  })

}

export function testGetBlockIcon() {

  test("Get block icon", t => {
    t.test("Get icon from a block without format", t => {
      t.equal(typeof getBlockIcon({} as any), "undefined")
    })

    t.test("Get icon from a block with format but no format.page_icon", t => {
      t.equal(typeof getBlockIcon({ format: {} } as any), "undefined")
    })

    t.test("Get emoji icon from a block with format and format.page_icon", t => {
      t.equal(getBlockIcon({ format: { page_icon: "😃" } } as any), "😃")
    })

    t.test("Get URL icon from a block with format and format.page_icon", t => {
      t.equal(getBlockIcon({ format: { page_icon: "https://foo.com/bar.jpg" } } as any),
        "https://foo.com/bar.jpg")
    })

    t.test("Get uploaded icon from a block with format and format.page_icon", t => {
      t.equal(getBlockIcon({
        id: dummyBlockId,
        format: { page_icon: imageS3 }
      } as any), `https://www.notion.so/signed/${imageS3Encoded}?table=block&id=${dummyBlockId}`)
    })
  })

}

export function testGetBlockColor() {

  test("Get block color", t => {
    t.test("Get color from a block without format", t => {
      t.equal(typeof getBlockColor({} as any), "undefined")
    })

    t.test("Get color from a block with format but no format.block_color", t => {
      t.equal(typeof getBlockColor({ format: {} } as any), "undefined")
    })

    t.test("Get color from a block with format and format.block_color", t => {
      t.equal(getBlockColor({ format: { block_color: "red" } } as any), "red")
    })
  })

}