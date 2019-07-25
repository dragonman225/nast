import assert from 'assert'

import {
  BlockNode
} from './types/api-lagacy'

import {
  NotionAgent,
  BlockRecordValue,
  RecordRequest,
  QueryCollectionResponse,
  BlockValue,
  AggregateQuery
} from './types/api'

import {
  Collection
} from './types/nast'

export = async function downloadPageAsTree(pageID: string, agent: NotionAgent): Promise<BlockNode> {

  assert(typeof pageID === 'string')
  assert(typeof agent === 'object')
  assert(typeof agent.getRecordValues === 'function')

  const api = agent

  /**
   * Only downloading children of a root "page" block.
   * This prevents downloading children of "link to a page" and
   * "embeded sub-page" blocks.
   */
  let pageRootDownloaded = false

  /* Get all records in a flat array. */
  const allRecords = await getChildrenRecords([pageID])

  /* Replace Notion's "collection_view" with NAST's "collection". */
  for (let i = 0; i < allRecords.length; ++i) {

    let record = allRecords[i]
    let recordType = record.value.type

    if (recordType === 'collection_view'
      || recordType === 'collection_view_page') {

      let collectionID = record.value.collection_id
      let collectionViewID = record.value.view_ids[0]
      let aggregateQueries = [] as AggregateQuery[]

      let response = await api.queryCollection(collectionID, collectionViewID, aggregateQueries)

      if (response.statusCode !== 200) {
        console.log(response)
        throw new Error('Fail to get collection.')
      }

      let responseData = response.data
      allRecords.splice(i, 1, collectionToNastTable(record.value.id, responseData))

    }

  }

  return makeTree(allRecords)
  //return { records: allRecords }

  /**
   * Get RecordValues of some IDs and their descendants.
   * @param ids - Some IDs.
   * @returns RecordValues of those IDs and their descendants.
   */
  async function getChildrenRecords(ids: string[]): Promise<BlockRecordValue[]> {

    let requests = makeRecordRequests(ids)
    let response = await api.getRecordValues(requests)

    if (response.statusCode !== 200) {
      console.log(response)
      throw new Error('Fail to get records.')
    }

    let responseData = response.data
    let childrenRecords: BlockRecordValue[]
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
      childrenRecords = responseData.results.filter((record: BlockRecordValue): boolean => {
        return record.role !== 'none' && record.value.type !== 'page'
      })
      childrenIDs = collectChildrenIDs(childrenRecords)
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
 * Make payload for getRecordValues API.
 * @param ids - Notion record ID array.
 * @returns A payload.
 */
function makeRecordRequests(ids: string[]): RecordRequest[] {

  let requests = ids.map((id): RecordRequest => {
    return { id, table: 'block' }
  })

  return requests

}

/**
 * Collect children IDs of an records array.
 * @param records - The records array.
 * @returns An array of IDs.
 */
function collectChildrenIDs(records: BlockRecordValue[]): string[] {

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
 * Convert BlockRecordValue array to a Notion abstract syntax tree.
 * The tree must have single root and it is the first item in the array.
 * @param allRecords - The BlockRecordValue array.
 * @returns A Notion abstract syntax tree.
 */
function makeTree(allRecords: BlockRecordValue[]): BlockNode {

  /* Cast BlockRecordValue to BlockNode. */
  let list = allRecords.map((record): BlockNode => {
    return {
      id: record.value.id,
      type: record.value.type,
      data: record.value.properties,
      raw_value: record.value,
      children: [] as BlockNode[]
    }
  })

  /* A map for quick ID -> index lookup. */
  let map: { [key: string]: number } = {}
  for (let i = 0; i < allRecords.length; ++i) {
    map[list[i].raw_value.id] = i
  }

  /* The tree's root is always the first of BlockRecordValue array. */
  let treeRoot = list[0]
  let node

  /**
   * Wire up each block's children by iterating through its content
   * and find each child's reference by ID.
   */
  for (let i = 0; i < allRecords.length; ++i) {
    node = list[i]
    /**
     * It's sad that parent_id of some blocks are incorrect, so the following
     * faster way doesn't work.
     */
    // list[map[node.raw_value.parent_id]].children.push(node)

    /** The slower way. */
    let childrenIDs = node.raw_value.content
    if (childrenIDs != null) {
      let pseudoBlock
      /** 
       * FSM with 3 states: normal, bulleted, numbered.
       * Total 3^2 = 9 cases.
       */
      let state = 'normal'
      for (let j = 0; j < childrenIDs.length; ++j) {
        let indexOfChildReference = map[childrenIDs[j]]
        let childReference = list[indexOfChildReference]

        /**
         * Notion's bug: When downloading a public page, 
         * some blocks are not accessible (There is an ID in "content" array,
         * but we can't find a block having that ID) even if the page is set to "public".
         */
        if (childReference != null) {

          // TODO: Too much duplicate code. Need to clean-up.
          switch (state) {
            case 'normal': {
              if (childReference.type === 'bulleted_list') {
                pseudoBlock = newPseudoBlock('unordered_list')
                pseudoBlock.children.push(childReference)
                node.children.push(pseudoBlock)
                state = 'bulleted'
              } else if (childReference.type === 'numbered_list') {
                pseudoBlock = newPseudoBlock('ordered_list')
                pseudoBlock.children.push(childReference)
                node.children.push(pseudoBlock)
                state = 'numbered'
              } else {
                node.children.push(childReference)
              }
              break
            }
            case 'bulleted': {
              if (childReference.type === 'bulleted_list') {
                pseudoBlock.children.push(childReference)
              } else if (childReference.type === 'numbered_list') {
                pseudoBlock = newPseudoBlock('ordered_list')
                pseudoBlock.children.push(childReference)
                node.children.push(pseudoBlock)
                state = 'numbered'
              } else {
                node.children.push(childReference)
                state = 'normal'
              }
              break
            }
            case 'numbered': {
              if (childReference.type === 'numbered_list') {
                pseudoBlock.children.push(childReference)
              } else if (childReference.type === 'bulleted_list') {
                pseudoBlock = newPseudoBlock('unordered_list')
                pseudoBlock.children.push(childReference)
                node.children.push(pseudoBlock)
                state = 'bulleted'
              } else {
                node.children.push(childReference)
                state = 'normal'
              }
              break
            }
            default:
          }

        }

      }
    }
  }

  return treeRoot

}

function newPseudoBlock(type: string): { type: string; children: BlockRecordValue[] } {
  return {
    type,
    children: []
  }
}

function collectionToNastTable(id: string, res: QueryCollectionResponse): { value: Collection } {
  let block = res.recordMap.block
  let collection = res.recordMap.collection
  let resultBlockIds = res.result.blockIds
  let data = [] as BlockValue[]

  for (let i = 0; i < resultBlockIds.length; ++i) {
    data.push(block[resultBlockIds[i]].value)
  }

  return {
    value: {
      id,
      type: 'collection',
      viewType: 'table',
      name: Object.values(collection)[0].value.name[0][0],
      schema: Object.values(collection)[0].value.schema,
      data
    }
  }
}