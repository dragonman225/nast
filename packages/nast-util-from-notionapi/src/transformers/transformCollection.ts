import * as Notion from '../types/api'
import * as Nast from '../types/nast'

async function transformCollection(
  collectionBlockRecord: Notion.BlockValue,
  apiAgent: Notion.Agent
): Promise<Nast.Collection> {

  /** Block ID */
  let id = collectionBlockRecord.id
  /** Collection View IDs */
  let viewIds = collectionBlockRecord['view_ids'] || []
  /** Collection ID */
  let collectionId = collectionBlockRecord['collection_id'] || ''

  if (collectionId.length === 0) {
    throw new Error(`Block ${id} has no collection ID.`)
  }

  if (viewIds.length === 0) {
    throw new Error(`Block ${id} - Collection ${collectionId} has no view.`)
  }

  let rawCollectionViewRecords = await getCollectionViewRecords(viewIds, apiAgent)

  let rawCollectionRecord = await getCollectionRecord(collectionId, apiAgent)

  /**
   * Make query map: collectionViewId -> Notion.Query of the view
   */
  let queryMap: Map<string, Notion.Query> = new Map()
  rawCollectionViewRecords.forEach((record: Notion.CollectionViewRecordValue): void => {
    let viewId = record.value.id
    let query = record.value.query
    queryMap.set(viewId, query)
  })

  let rawQueryCollectionResponses =
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
  let rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewIds[0])
  if (!rawQueryCollectionResponse)
    throw new Error(`No rawQueryCollectionResponse for ${viewIds[0]}`)

  let blockRecordValueMap = rawQueryCollectionResponse.recordMap.block
  let resultBlockIds = rawQueryCollectionResponse.result.blockIds
  let nastCollection = {
    id,
    collectionId,
    /** Icon may be undefined */
    icon: rawCollectionRecord.value.icon
      ? rawCollectionRecord.value.icon
      : '',
    /** TS cannot assign string to 'collection' */
    type: 'collection' as 'collection',
    /** Name may be undefined */
    name: rawCollectionRecord.value.name
      ? rawCollectionRecord.value.name[0][0]
      : 'Untitled',
    /** In case schema is undefined */
    schema: rawCollectionRecord.value.schema
      ? rawCollectionRecord.value.schema
      : {},
    /** blockRecordValueMap[x] is Notion.BlockRecordValue (The one with role) */
    blocks: resultBlockIds.map((id: string): Notion.BlockValue => {
      return blockRecordValueMap[id].value
    }),
    /** Use viewId to access record value maps. */
    views: viewIds.map((viewId: string): Nast.CollectionViewMetadata => {
      let viewRecord = rawCollectionViewRecords
        .find((view): boolean => view.value.id === viewId)
      let view: Notion.CollectionViewValue
      let rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewId)
      let aggregationResults: Notion.AggregationResult[]

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
            let aggregationResult = aggregationResults
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
  viewIds: string[], apiAgent: Notion.Agent
): Promise<Notion.CollectionViewRecordValue[]> {

  let collectionViewRequests = viewIds.map((viewId: string): Notion.RecordRequest => {
    return {
      id: viewId,
      table: 'collection_view'
    }
  })

  let apiRes = await apiAgent.getRecordValues(collectionViewRequests)
  if (apiRes.statusCode !== 200) {
    console.log(apiRes)
    throw new Error('Fail to get rawCollectionViewRecords.')
  }

  let rawCollectionViewRecords: Notion.CollectionViewRecordValue[] =
    apiRes.data.results

  return rawCollectionViewRecords
}

/** 
 * Get collection record
 * 
 * One database only has one collection.
 */
async function getCollectionRecord(
  collectionId: string, apiAgent: Notion.Agent
): Promise<Notion.CollectionRecordValue> {

  let collectionRequests = [{
    id: collectionId,
    table: 'collection'
  }]
  let apiRes = await apiAgent.getRecordValues(collectionRequests)
  if (apiRes.statusCode !== 200) {
    console.log(apiRes)
    throw new Error('Fail to get collectionResponses.')
  }
  let collectionResponses = apiRes.data.results
  let rawCollectionRecord: Notion.CollectionRecordValue = collectionResponses[0]

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
  collectionId: string, queryMap: Map<string, Notion.Query>, apiAgent: Notion.Agent
): Promise<Map<string, Notion.QueryCollectionResponse>> {

  interface RawQueryCollectionRequest {
    collectionId: string
    collectionViewId: string
    aggregateQueries: Notion.AggregateQuery[]
  }

  /** Make request objects. */
  let rawQueryCollectionRequests: RawQueryCollectionRequest[] = []
  queryMap.forEach((query, viewId): void => {
    rawQueryCollectionRequests.push({
      collectionId,
      collectionViewId: viewId,
      aggregateQueries: query.aggregate || []
    })
  })

  /** Do queries and receive responses. */
  let rawQueryCollectionResponses: Map<string, Notion.QueryCollectionResponse> = new Map()
  for (let i = 0; i < rawQueryCollectionRequests.length; ++i) {
    let req = rawQueryCollectionRequests[i]
    let res =
      await apiAgent.queryCollection(
        req.collectionId,
        req.collectionViewId,
        req.aggregateQueries)
    if (res.statusCode !== 200) {
      console.log(res)
      throw new Error('Fail to get rawQueryCollectionResponse.')
    }
    rawQueryCollectionResponses.set(req.collectionViewId, res.data)
  }

  return rawQueryCollectionResponses
}

export {
  transformCollection,
  getCollectionViewRecords,
  getCollectionRecord,
  getQueryCollectionResponses
}