/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import transformPage from './transformPage'
import { convertImageUrl } from './utils'

async function transformCollection(
  collectionBlockRecord: Notion.Block,
  apiAgent: Notion.NotionAgent
): Promise<Nast.Collection> {

  /** Block ID */
  const id = collectionBlockRecord.id
  /** Collection View IDs */
  const viewIds = collectionBlockRecord['view_ids'] || []
  /** Collection ID */
  const collectionId = collectionBlockRecord['collection_id'] || ''

  if (collectionId.length === 0) {
    throw new Error(`Block ${id} has no collection ID.`)
  }

  if (viewIds.length === 0) {
    throw new Error(`Block ${id} - Collection ${collectionId} has no view.`)
  }

  const rawCollectionViewRecords = await getCollectionViewRecords(viewIds, apiAgent)

  const rawCollectionRecord = await getCollectionRecord(collectionId, apiAgent)
  const rawCollection = rawCollectionRecord.value

  /**
   * Make query map: collectionViewId -> Notion.Query of the view
   */
  const queryMap: Map<string, Notion.Query> = new Map()
  rawCollectionViewRecords.forEach((record): void => {
    const viewId = record.value.id
    const query = record.value.query
    queryMap.set(viewId, query)
  })

  const rawQueryCollectionResponses =
    await getQueryCollectionResponses(collectionId, queryMap, apiAgent)

  /** Transform to Nast */
  /** 
   * Choose one of rawQueryCollectionResponses to get blocks, since 
   * our `apiAgent.queryCollection` ignores `Notion.Query.filter`, all 
   * responses includes all blocks.
   */
  /** 
   * `Notion.QueryCollectionResponse.recordMap.block` has blocks not in the 
   * collection, don't know why.
   * We have to use `Notion.QueryCollectionResponse.result.blockIds`
   * to select only those we want.
   */
  /**
   * We won't get undefined below since viewIds guarantee there are views.
   */
  const rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewIds[0])
  if (!rawQueryCollectionResponse)
    throw new Error(`No rawQueryCollectionResponse for ${viewIds[0]}`)

  const blockRecordValueMap = rawQueryCollectionResponse.recordMap.block
  const resultBlockIds = rawQueryCollectionResponse.result.blockIds
  const nastCollection = {
    /** TS cannot assign string to 'collection' */
    type: 'collection' as 'collection',
    id,
    collectionId,
    createdTime: collectionBlockRecord.created_time,
    lastEditedTime: collectionBlockRecord.last_edited_time,
    icon: rawCollection.icon ? convertImageUrl(rawCollection.icon) : undefined,
    cover: rawCollection.cover ? convertImageUrl(rawCollection.cover) : undefined,
    description: rawCollection.description,
    coverPosition: rawCollection.format
      ? rawCollection.format.collection_cover_position || 1 : 1,
    /** Name may be undefined */
    name: rawCollection.name
      ? rawCollection.name[0][0] || 'Untitled'
      : 'Untitled',
    /** In case schema is undefined */
    schema: rawCollection.schema || {},
    /** blockRecordValueMap[x] is Notion.BlockRecordValue (The one with role) */
    blocks: await Promise.all(resultBlockIds
      .map((id): Promise<Nast.Page> => {
        return transformPage(blockRecordValueMap[id].value)
      })),
    /** Use viewId to access record value maps. */
    views: viewIds.map((viewId): Nast.CollectionViewMetadata => {
      const viewRecord = rawCollectionViewRecords
        .find((view): boolean => view.value.id === viewId)
      const rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewId)

      let view: Notion.CollectionView
      let aggregationResults: Notion.AggregationResult[]

      /** Normally, the following two errors should not happen. */
      if (viewRecord) {
        view = viewRecord.value
      } else {
        throw new Error(`View ${viewId} does not have collection_view record.`)
      }

      if (rawQueryCollectionResponse) {
        aggregationResults = rawQueryCollectionResponse.result.aggregationResults
      } else {
        throw new Error(`View ${viewId} does not have queryCollection response.`)
      }

      return {
        id: viewId,
        type: view.type,
        name: view.name,
        query: view.query,
        format: view.format,
        aggregate: (view.query.aggregate || [])
          .map((prop): Nast.AggregationMetadata => {
            const aggregationResult = aggregationResults
              .find((res): boolean => res.id === prop.id)
            return {
              aggregationType: prop.aggregation_type,
              property: prop.property,
              value: aggregationResult
                ? aggregationResult.value
                : 0
            }
          })
      }
    }),
    defaultViewId: viewIds[0],
    children: []
  }

  return nastCollection

}

/** 
 * Get collection view records
 * 
 * This is necessary to get Notion.Query object,
 * which contains sort, aggregate, filter_operator that are used to do
 * Notion.Agent.queryCollection()
 */
async function getCollectionViewRecords(
  viewIds: string[],
  apiAgent: Notion.NotionAgent
): Promise<(Notion.Record & { value: Notion.CollectionView })[]> {

  const collectionViewRequests = viewIds.map((viewId): Notion.RecordRequest => {
    return {
      id: viewId,
      table: 'collection_view'
    }
  })

  const res = await apiAgent.getRecordValues(collectionViewRequests)
  if (res.statusCode !== 200) {
    console.log(res)
    throw new Error('Fail to get rawCollectionViewRecords.')
  }

  const rawCollectionViewRecords =
    (res.data as Notion.GetRecordValuesResponse).results as (Notion.Record & { value: Notion.CollectionView })[]

  return rawCollectionViewRecords
}

/** 
 * Get collection record
 * 
 * One database only has one collection.
 */
async function getCollectionRecord(
  collectionId: string,
  apiAgent: Notion.NotionAgent
): Promise<(Notion.Record & { value: Notion.Collection })> {

  const collectionRequests = [{
    id: collectionId,
    table: 'collection'
  }]

  const res = await apiAgent.getRecordValues(collectionRequests)
  if (res.statusCode !== 200) {
    console.log(res)
    throw new Error('Fail to get collectionResponses.')
  }

  const collectionResponses =
    (res.data as Notion.GetRecordValuesResponse).results as (Notion.Record & { value: Notion.Collection })[]
  const rawCollectionRecord = collectionResponses[0]

  return rawCollectionRecord
}

/**
 * Query all entries in this collection
 * 
 * To get all entries, we must not filter any entries, this means
 * Notion.Query.filter should be empty. Luckily, current Notion.Agent 
 * set that empty by default.
 * 
 * The queryCollection API can be used to query one collection_view at
 * the same time, though we have queried all collection views previously, 
 * we still need to query the aggregationResults for those collection
 * views.
 */
async function getQueryCollectionResponses(
  collectionId: string,
  queryMap: Map<string, Notion.Query>,
  apiAgent: Notion.NotionAgent
): Promise<Map<string, Notion.QueryCollectionResponse>> {

  type RawQueryCollectionRequest = {
    collectionId: string
    collectionViewId: string
    aggregateQueries: Notion.AggregateQuery[]
  }

  /** Make request objects. */
  const rawQueryCollectionRequests: RawQueryCollectionRequest[] = []
  queryMap.forEach((query, viewId): void => {
    rawQueryCollectionRequests.push({
      collectionId,
      collectionViewId: viewId,
      aggregateQueries: query.aggregate || []
    })
  })

  /** Do queries and receive responses. */
  const rawQueryCollectionResponses: Map<string, Notion.QueryCollectionResponse> = new Map()
  for (let i = 0; i < rawQueryCollectionRequests.length; ++i) {
    const req = rawQueryCollectionRequests[i]
    const res =
      await apiAgent.queryCollection(
        req.collectionId,
        req.collectionViewId,
        req.aggregateQueries)

    if (res.statusCode !== 200) {
      console.log(res)
      throw new Error('Fail to get rawQueryCollectionResponse.')
    }

    rawQueryCollectionResponses.set(req.collectionViewId, res.data as Notion.QueryCollectionResponse)
  }

  return rawQueryCollectionResponses
}

export {
  transformCollection,
  getCollectionViewRecords,
  getCollectionRecord,
  getQueryCollectionResponses
}