import { test } from 'zora'
import { NotionAgent } from 'notionapi-agent'
import { getAllBlocksInOnePage, getOnePageAsTree } from '../src'

import {
  testConvertImageUrl,
  testGetBlockTitle,
  testGetBlockIcon,
  testGetBlockColor
} from './transformers/util'

/** Test transformers/util first */
testConvertImageUrl()
testGetBlockTitle()
testGetBlockIcon()
testGetBlockColor()

const pageId = '181e961a-eb5c-4ee6-9153-07c0dfd5156d'
const agent = new NotionAgent()

test('Get all blocks in a Notion page', async t => {
  const blocks = await getAllBlocksInOnePage(pageId, agent)
  t.equal(Array.isArray(blocks), true, 'should return an array')
  t.equal(typeof blocks[0].role, 'string', 'BlockRecord.role should be\
 a string')
})

test('Get Notion page as a tree', async t => {
  const tree = await getOnePageAsTree(pageId, agent)
  t.equal(typeof tree.id, 'string', 'Block.id should be a string.')
  t.equal(typeof tree.type, 'string', 'Block.type should be a string.')
  t.equal(Array.isArray(tree.children), true, 'Block.children should be an\
 array.')

  const child = tree.children[0]
  if (child) {
    t.equal(typeof child.id, 'string', 'Child 0\'s Block.id should be a\
 string.')
    t.equal(typeof child.type, 'string', 'Child 0\'s Block.type should be a\
 string.')
    t.equal(Array.isArray(child.children), true, 'Child 0\'s Block.children\
 should be an array.')
  } else {
    console.log('This tree contain no children, so some tests are\
 skippied. Please consider changing pageId.')
  }
})