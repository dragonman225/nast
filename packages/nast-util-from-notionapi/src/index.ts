import assert from 'assert'

import { transformBlock } from './transformBlock'
import { log } from './utils'

import * as Notion from './types/api'
import * as Nast from './types/nast'

async function getTreeByBlockId(
  rootID: string,
  agent: Notion.Agent): Promise<Nast.Block> {

  assert(typeof rootID === 'string')
  assert(typeof agent === 'object')
  assert(typeof agent.getRecordValues === 'function')
  assert(typeof agent.queryCollection === 'function')

  const api = agent

  /**
   * Only downloading children of a root "page" block.
   * This prevents downloading children of "link to a page" and
   * "embeded sub-page" blocks.
   */
  let pageRootDownloaded = false

  /* Get all records in a flat array. */
  const allRecords = await getChildrenRecords([rootID])

  return makeTree(allRecords, api)
  //return { records: allRecords }

  /**
   * Get RecordValues of some IDs and their descendants.
   * @param blockIds - Some IDs.
   * @returns RecordValues of those IDs and their descendants.
   */
  async function getChildrenRecords(blockIds: string[]): Promise<Notion.BlockRecordValue[]> {

    let requests = makeRecordRequests(blockIds, 'block')
    let response = await api.getRecordValues(requests)

    if (response.statusCode !== 200) {
      console.log(response)
      throw new Error('Fail to get records.')
    }

    let responseData = response.data
    let childrenRecords: Notion.BlockRecordValue[]
    let childrenIDs: string[]

    /** 
     * Currently, I ignore any "page" block except the root page.
     * 
     * More information:
     * 
     * Notion marks a "link to page" block as "page", which has two problems :
     * 1. The "page" block points to its children, require additional checking
     * when doing recursive download.
     * 2. The "parent_id" of the "page" block does not points to the root page
     * we want to download. This way we can't construct a tree correctly.
     */
    if (pageRootDownloaded) {
      /* Filter out "page" blocks. */
      childrenRecords = responseData.results
      let childrenRecordsNoPage = responseData.results
        .filter((record: Notion.BlockRecordValue): boolean => {
          return record.role !== 'none' && record.value.type !== 'page'
        })
      childrenIDs = collectChildrenIDs(childrenRecordsNoPage)
    } else {
      childrenRecords = responseData.results
      childrenIDs = collectChildrenIDs(childrenRecords)
      pageRootDownloaded = true
    }

    /* If there're remaining children, download them. */
    if (childrenIDs.length > 0) {
      return childrenRecords.concat(await getChildrenRecords(childrenIDs))
    } else {
      return childrenRecords
    }

  }

}

/**
 * Make request payload for getRecordValues API.
 * @param ids - Notion record ID array.
 * @param table - The table to query.
 * @returns The payload.
 */
function makeRecordRequests(ids: string[], table: string): Notion.RecordRequest[] {

  let requests = ids.map((id): Notion.RecordRequest => {
    return { id, table }
  })

  return requests

}

/**
 * Collect children IDs of an records array.
 * @param records - The records array.
 * @returns An array of IDs.
 */
function collectChildrenIDs(records: Notion.BlockRecordValue[]): string[] {

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
async function makeTree(
  allRecords: Notion.BlockRecordValue[],
  apiAgent: Notion.Agent
): Promise<Nast.Block> {

  /** Remove blocks with role: none */
  let nonEmptyRecords = allRecords
    .filter((record) => {
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
  getTreeByBlockId
}

// TODO: Too much duplicate code. Need to clean-up.
/** 
 * FSM with 3 states: normal, bulleted, numbered.
 * Total 3^2 = 9 cases.
 */
//let state = 'normal'
// switch (state) {
//   case 'normal': {
//     if (childReference.type === 'bulleted_list') {
//       pseudoBlock = newPseudoBlock('unordered_list')
//       pseudoBlock.children.push(childReference)
//       node.children.push(pseudoBlock)
//       state = 'bulleted'
//     } else if (childReference.type === 'numbered_list') {
//       pseudoBlock = newPseudoBlock('ordered_list')
//       pseudoBlock.children.push(childReference)
//       node.children.push(pseudoBlock)
//       state = 'numbered'
//     } else {
//       node.children.push(childReference)
//     }
//     break
//   }
//   case 'bulleted': {
//     if (childReference.type === 'bulleted_list') {
//       pseudoBlock.children.push(childReference)
//     } else if (childReference.type === 'numbered_list') {
//       pseudoBlock = newPseudoBlock('ordered_list')
//       pseudoBlock.children.push(childReference)
//       node.children.push(pseudoBlock)
//       state = 'numbered'
//     } else {
//       node.children.push(childReference)
//       state = 'normal'
//     }
//     break
//   }
//   case 'numbered': {
//     if (childReference.type === 'numbered_list') {
//       pseudoBlock.children.push(childReference)
//     } else if (childReference.type === 'bulleted_list') {
//       pseudoBlock = newPseudoBlock('unordered_list')
//       pseudoBlock.children.push(childReference)
//       node.children.push(pseudoBlock)
//       state = 'bulleted'
//     } else {
//       node.children.push(childReference)
//       state = 'normal'
//     }
//     break
//   }
//   default:
// }