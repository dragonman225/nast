import assert from 'assert'

import { transformBlock } from './transformBlock'

import { Notion, Nast } from '../../types/src'

async function getOnePageAsTree(
  pageId: string,
  apiAgent: Notion.Agent
): Promise<Nast.Block> {

  let allBlocks = await getAllBlocksInOnePage(pageId, apiAgent)
  return makeBlocksArrayIntoTree(allBlocks, apiAgent)
}

async function getAllBlocksInOnePage(
  pageId: string,
  apiAgent: Notion.Agent
): Promise<Notion.BlockRecordValue[]> {

  assert(typeof pageId === 'string')
  assert(typeof apiAgent === 'object')
  assert(typeof apiAgent.getRecordValues === 'function')
  assert(typeof apiAgent.queryCollection === 'function')
  assert(typeof apiAgent.loadPageChunk === 'function')

  /**
   * getChildrenBlocks() does not download children of a page,
   * so we should get the page first.
   */
  let pageBlockRequest = generateGRVPayload([pageId], 'block')
  let pageBlockResponse: Notion.BlockRecordValuesResponse =
    await apiAgent.getRecordValues(pageBlockRequest)
  if (pageBlockResponse.statusCode !== 200) {
    console.log(pageBlockResponse)
    throw new Error('Fail to get page block.')
  }
  let pageBlock = pageBlockResponse.data.results[0]
  let childrenIdsOfPageBlock = pageBlock.value.content

  let allRecords: Notion.BlockRecordValue[] = [pageBlock]
  if (childrenIdsOfPageBlock != null) {
    /* Get all records in a flat array. */
    let children =
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

  let requests = ids.map((id): Notion.RecordRequest => {
    return { id, table }
  })

  return requests
}

/**
 * Get Notion.BlockRecordValue of IDs and descendants of non-page blocks
 */
async function getChildrenBlocks(
  blockIds: string[],
  apiAgent: Notion.Agent
): Promise<Notion.BlockRecordValue[]> {

  /** Get children records with getRecordValues */
  let requests = generateGRVPayload(blockIds, 'block')
  let response = await apiAgent.getRecordValues(requests)

  if (response.statusCode !== 200) {
    console.log(response)
    throw new Error('Fail to get records.')
  }

  let responseData = response.data
  let childrenRecords: Notion.BlockRecordValue[] = responseData.results
  /**
   * Filter out "page" blocks and empty blocks.
   * 
   * If we do not filter out "page" blocks, children of "Embedded Page" and 
   * "Link to Page" will be collected.
   */
  let childrenRecordsNoPage = responseData.results
    .filter((record: Notion.BlockRecordValue): boolean => {
      return record.role !== 'none' && record.value.type !== 'page'
    })
  let childrenIDs: string[] = collectChildrenIDs(childrenRecordsNoPage)

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
  records: Notion.BlockRecordValue[]
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
  allRecords: Notion.BlockRecordValue[],
  apiAgent: Notion.Agent
): Promise<Nast.Block> {

  /** Remove blocks with role: none */
  let nonEmptyRecords = allRecords
    .filter((record): boolean => {
      return record.role !== 'none'
    })

  /* Tranform Notion.BlockRecordValue to Nast.Block */
  let nastList = await Promise.all(nonEmptyRecords
    .map((record): Promise<Nast.Block> => {
      return transformBlock(record.value, apiAgent)
    }))

  /* A map for quick ID -> index lookup */
  let map: { [key: string]: number } = {}
  for (let i = 0; i < nonEmptyRecords.length; ++i) {
    map[nonEmptyRecords[i].value.id] = i
  }

  /* The tree's root is always the first record */
  let treeRoot = nastList[0]
  let nastBlock

  /**
   * Wire up each block's children
   * Iterate through blocks and get children IDs from 
   * `nonEmptyRecords[i].value.content`, then find each child's reference 
   * by ID using `map`.
   */
  for (let i = 0; i < nonEmptyRecords.length; ++i) {
    nastBlock = nastList[i]

    let childrenIDs = nonEmptyRecords[i].value.content
    if (childrenIDs != null) {

      for (let j = 0; j < childrenIDs.length; ++j) {
        let indexOfChildReference = map[childrenIDs[j]]
        let childReference = nastList[indexOfChildReference]

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