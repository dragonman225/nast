import assert from 'assert'

import { transformBlock } from './transformBlock'

/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from './nast'

async function getOnePageAsTree(
  pageId: string,
  apiAgent: Notion.NotionAgent
): Promise<Nast.Block> {

  const allBlocks = await getAllBlocksInOnePage(pageId, apiAgent)
  return makeBlocksArrayIntoTree(allBlocks, apiAgent)
}

async function getAllBlocksInOnePage(
  pageId: string,
  apiAgent: Notion.NotionAgent
): Promise<(Notion.Record & { value: Notion.Block })[]> {

  assert(typeof pageId === 'string')
  assert(typeof apiAgent === 'object')
  assert(typeof apiAgent.getRecordValues === 'function')
  assert(typeof apiAgent.queryCollection === 'function')
  assert(typeof apiAgent.loadPageChunk === 'function')

  /**
   * getChildrenBlocks() does not download children of a page,
   * so we should get the page first.
   */
  const pageBlockRequest = generateGRVPayload([pageId], 'block')
  const pageBlockResponse = await apiAgent.getRecordValues(pageBlockRequest)

  if (pageBlockResponse.statusCode !== 200) {
    console.log(pageBlockResponse)
    throw new Error('Fail to get page block.')
  }

  const pageBlockData = pageBlockResponse.data as Notion.GetRecordValuesResponse
  const pageBlock = pageBlockData.results[0] as Notion.Record & { value: Notion.Block }
  const childrenIdsOfPageBlock = pageBlock.value.content


  let allRecords = [pageBlock]
  if (childrenIdsOfPageBlock != null) {
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
  table: string
): Notion.RecordRequest[] {

  const requests = ids.map((id) => {
    return { id, table }
  })

  return requests
}

/**
 * Get Notion.BlockRecordValue of IDs and descendants of non-page blocks
 */
async function getChildrenBlocks(
  blockIds: string[],
  apiAgent: Notion.NotionAgent
): Promise<(Notion.Record & { value: Notion.Block })[]> {

  /** Get children records with getRecordValues */
  const requests = generateGRVPayload(blockIds, 'block')
  const response = await apiAgent.getRecordValues(requests)

  if (response.statusCode !== 200) {
    console.log(response)
    throw new Error('Fail to get records.')
  }

  const responseData = response.data as Notion.GetRecordValuesResponse
  const childrenRecords = responseData.results as (Notion.Record & { value: Notion.Block })[]
  /**
   * Filter out "page" blocks and empty blocks.
   * 
   * If we do not filter out "page" blocks, children of "Embedded Page" and 
   * "Link to Page" will be collected.
   */
  const childrenRecordsNoPage = childrenRecords
    .filter((record): boolean => {
      return record.role !== 'none' && record.value.type !== 'page'
    })
  const childrenIDs = collectChildrenIDs(childrenRecordsNoPage)

  /* If there're remaining children, download them. */
  if (childrenIDs.length > 0) {
    return childrenRecords.concat(
      await getChildrenBlocks(childrenIDs, apiAgent))
  } else {
    return childrenRecords
  }

}

/**
 * Collect children IDs of an records array.
 * @param records - The records array.
 * @returns An array of IDs.
 */
function collectChildrenIDs(
  records: (Notion.Record & { value: Notion.Block })[]
): string[] {

  let childrenIDs: string[] = []

  records.forEach((record): void => {
    let _childrenIDs = [] as string[]

    if (record.value != null && record.value.content != null) {
      _childrenIDs = record.value.content
    }

    if (_childrenIDs) {
      childrenIDs = childrenIDs.concat(_childrenIDs)
    }

  })

  return childrenIDs

}

/**
 * Convert BlockRecordValue array to NAST.
 * @param allRecords - The BlockRecordValue array.
 * @returns NAST.
 */
async function makeBlocksArrayIntoTree(
  allRecords: (Notion.Record & { value: Notion.Block })[],
  apiAgent: Notion.NotionAgent
): Promise<Nast.Block> {

  /** Remove blocks with role: none */
  const nonEmptyRecords = allRecords
    .filter((record): boolean => {
      return record.role !== 'none'
    })

  /* Tranform Notion.BlockRecordValue to Nast.Block */
  const nastList = await Promise.all(nonEmptyRecords
    .map((record): Promise<Nast.Block> => {
      return transformBlock(record.value, apiAgent)
    }))

  /* A map for quick ID -> index lookup */
  const map: { [key: string]: number } = {}
  for (let i = 0; i < nonEmptyRecords.length; ++i) {
    map[nonEmptyRecords[i].value.id] = i
  }

  /* The tree's root is always the first record */
  const treeRoot = nastList[0]
  let nastBlock

  /**
   * Wire up each block's children
   * Iterate through blocks and get children IDs from 
   * `nonEmptyRecords[i].value.content`, then find each child's reference 
   * by ID using `map`.
   */
  for (let i = 0; i < nonEmptyRecords.length; ++i) {
    nastBlock = nastList[i]

    const childrenIDs = nonEmptyRecords[i].value.content
    if (childrenIDs != null) {

      for (let j = 0; j < childrenIDs.length; ++j) {
        const indexOfChildReference = map[childrenIDs[j]]
        const childReference = nastList[indexOfChildReference]

        if (childReference != null) {
          nastBlock.children.push(childReference)
        }

      }
    }
  }

  return treeRoot

}

export {
  getOnePageAsTree,
  getAllBlocksInOnePage
}