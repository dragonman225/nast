import * as fs from "fs"
import * as path from "path"

import { test } from "zora"
import { createAgent } from "notionapi-agent"
import { getAllBlocksInOnePage, getOnePageAsTree } from "../src"

import {
  testConvertImageUrl,
  testGetBlockIcon,
  testGetBlockColor
} from "./util.spec"

/** Test util first */
testConvertImageUrl()
testGetBlockIcon()
testGetBlockColor()

const pageId = "1c4d63a8-ffc7-47be-a565-8672797a595a"
const agent = createAgent()

test("Get all blocks in a Notion page", async t => {
  const blocks = await getAllBlocksInOnePage(pageId, agent)
  t.equal(Array.isArray(blocks), true, "should return an array")
  t.equal(typeof blocks[0].id, "string", "Block.id should be\
 a string")
})

test("Get Notion page as a tree", async t => {
  const tree = await getOnePageAsTree(pageId, agent)
  t.equal(typeof tree.uri, "string", "Block.uri should be a string.")
  t.equal(typeof tree.type, "string", "Block.type should be a string.")
  t.equal(Array.isArray(tree.children), true, "Block.children should be an\
 array.")

  const child = tree.children[0]
  if (child) {
    t.equal(typeof child.uri, "string", "Child's Block.uri should be a\
 string.")
    t.equal(typeof child.type, "string", "Child's Block.type should be a\
 string.")
    t.equal(Array.isArray(child.children), true, "Child's Block.children\
 should be an array.")
  } else {
    console.log("This tree contain no children, so some tests are\
 skippied. Please consider changing pageId.")
  }

  fs.writeFileSync(path.join(__dirname, "tree.json"), JSON.stringify(tree), { encoding: "utf-8" })
})