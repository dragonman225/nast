/** For types only */
import * as Notion from 'notionapi-agent';
import * as Nast from '../nast';
declare function transformCollection(collectionBlockRecord: Notion.Block, apiAgent: Notion.NotionAgent): Promise<Nast.Collection>;
/**
 * Get collection view records
 *
 * This is necessary to get Notion.Query object,
 * which contains sort, aggregate, filter_operator that are used to do
 * Notion.Agent.queryCollection()
 */
declare function getCollectionViewRecords(viewIds: string[], apiAgent: Notion.NotionAgent): Promise<(Notion.Record & {
    value: Notion.CollectionView;
})[]>;
/**
 * Get collection record
 *
 * One database only has one collection.
 */
declare function getCollectionRecord(collectionId: string, apiAgent: Notion.NotionAgent): Promise<(Notion.Record & {
    value: Notion.Collection;
})>;
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
declare function getQueryCollectionResponses(collectionId: string, queryMap: Map<string, Notion.Query>, apiAgent: Notion.NotionAgent): Promise<Map<string, Notion.QueryCollectionResponse>>;
export { transformCollection, getCollectionViewRecords, getCollectionRecord, getQueryCollectionResponses };
//# sourceMappingURL=transformCollection.d.ts.map