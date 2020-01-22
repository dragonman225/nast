/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { transformBlock } from "./transformBlock"
import { getBlockUri } from "./util"

/** Import types. */
import * as NAST from "nast-types"
import * as Notion from "notionapi-agent/dist/interfaces"
import { createAgent } from "notionapi-agent"

async function getOnePageAsTree(
  pageId: string,
  apiAgent: ReturnType<typeof createAgent>
): Promise<NAST.Block> {

  const allBlocks = await getAllBlocksInOnePage(pageId, apiAgent)
  return makeBlockArrayIntoTree(allBlocks, apiAgent)
}

async function getAllBlocksInOnePage(
  pageId: string,
  apiAgent: ReturnType<typeof createAgent>
): Promise<Notion.Block[]> {

  /**
   * getChildrenBlocks() does not download children of a page,
   * so we should get the page first.
   */
  const request = generateGRVPayload([pageId], "block")
  const response = await apiAgent.getRecordValues(request)
  const record = response.results[0]

  if (record.role === "none") {
    throw new Error(`Fail to get page ${pageId}, role is "none"`)
  }

  const pageBlock = record.value as Notion.Block.Page
  const childrenIdsOfPageBlock = pageBlock.content

  let allRecords: Notion.Block[] = [pageBlock]
  if (childrenIdsOfPageBlock) {
    /* Get all records in a flat array. */
    const children =
      await getChildrenBlocks(childrenIdsOfPageBlock, apiAgent)
    allRecords = allRecords.concat(children)
  }

  return allRecords
}

/**
 * Generate request payload for getRecordValues API.
 * @param ids - Notion record ID array.
 * @param table - The table to query.
 * @returns The payload.
 */
function generateGRVPayload(
  ids: string[],
  table: Notion.Util.Table
): Notion.API.GetRecordValues.Request {

  const requests = ids.map((id) => {
    return { id, table }
  })

  return {
    requests
  }
}

/**
 * Recursively get all valid blocks in a page.
 */
async function getChildrenBlocks(
  blockIds: string[],
  apiAgent: ReturnType<typeof createAgent>
): Promise<Notion.Block[]> {

  /** Get children records with getRecordValues */
  const request = generateGRVPayload(blockIds, "block")
  const response = await apiAgent.getRecordValues(request)
  const childrenRecords = response.results

  const validBlocks = childrenRecords
    .reduce((blocks, record, index) => {
      if (record.role !== "none") blocks.push(record.value as Notion.Block)
      else console.log(`Fail to get block ${request.requests[index].id}, 
role is none`)
      return blocks
    }, [] as Notion.Block[])

  const validBlocksNonPage = validBlocks
    .filter((block) => {
      return block.type !== "page"
    })

  const childrenToGet = validBlocksNonPage
    .reduce((childrenIds, block) => {
      if (block.content)
        return childrenIds.concat(block.content)
      else
        return childrenIds
    }, [] as string[])

  if (childrenToGet.length > 0) {
    return validBlocks.concat(
      await getChildrenBlocks(childrenToGet, apiAgent))
  } else {
    return validBlocks
  }

}

/**
 * Convert block array to NAST.
 */
async function makeBlockArrayIntoTree(
  blocks: Notion.Block[],
  apiAgent: ReturnType<typeof createAgent>
): Promise<NAST.Block> {

  /* Transform Notion Block to NAST.Block */
  const nastBlocks = await Promise.all(blocks
    .map((block) => {
      return transformBlock(block, apiAgent)
    }))

  /* A map <block id, reference in nastBlocks> */
  const nastBlockMap: { [key: string]: NAST.Block } = {}
  for (let i = 0; i < nastBlocks.length; ++i) {
    nastBlockMap[nastBlocks[i].uri] = nastBlocks[i]
  }

  /* The tree's root is always the first. */
  const treeRoot = nastBlocks[0]

  /**
   * Wire up each block's children
   * Iterate through blocks and get children IDs from 
   * `nonEmptyRecords[i].value.content`, then find each child's reference 
   * by ID using `map`.
   */
  for (let i = 0; i < blocks.length; ++i) {

    const childrenIds = blocks[i].content

    if (!childrenIds) continue

    childrenIds.forEach(id => {
      const childNastBlock = nastBlockMap[getBlockUri(id)]
      if (childNastBlock) nastBlocks[i].children.push(childNastBlock)
    })

  }

  return treeRoot

}

export {
  getOnePageAsTree,
  getAllBlocksInOnePage
}