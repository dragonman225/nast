"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function queryCollection(collectionBlockRecord, apiAgent) {
    /** Useful info */
    let id = collectionBlockRecord.id;
    let viewIds = collectionBlockRecord['view_ids'] || [];
    let collectionId = collectionBlockRecord['collection_id'] || '';
    if (collectionId.length === 0) {
        throw new Error(`Block ${id} has no collection ID.`);
    }
    if (viewIds.length === 0) {
        throw new Error(`Block ${id} - Collection ${collectionId} has no view.`);
    }
    /**
     * Get collection view records
     * This is necessary to get Notion.query object,
     * which contains sort, aggregate, filter_operator that are used to do
     * Notion.Agent.queryCollection()
     */
    let collectionViewRequests = viewIds.map((viewId) => {
        return {
            id: viewId,
            table: 'collection_view'
        };
    });
    let apiRes = await apiAgent.getRecordValues(collectionViewRequests);
    if (apiRes.statusCode !== 200) {
        console.log(apiRes);
        throw new Error('Fail to get rawCollectionViewRecords.');
    }
    let rawCollectionViewRecords = apiRes.data.results;
    /**
     * Get collection record
     * One database only has one collection.
     */
    let collectionRequests = [{
            id: collectionId,
            table: 'collection'
        }];
    apiRes = await apiAgent.getRecordValues(collectionRequests);
    if (apiRes.statusCode !== 200) {
        console.log(apiRes);
        throw new Error('Fail to get collectionResponses.');
    }
    let collectionResponses = apiRes.data.results;
    let rawCollectionRecord = collectionResponses[0];
    /**
     * Make query map: collectionViewId -> Notion.Query of the view
     */
    let queryMap = new Map();
    rawCollectionViewRecords.forEach((record) => {
        let viewId = record.value.id;
        let query = record.value.query;
        queryMap.set(viewId, query);
    });
    /** Make request objects. */
    let rawQueryCollectionRequests = [];
    queryMap.forEach((query, viewId) => {
        rawQueryCollectionRequests.push({
            collectionId,
            collectionViewId: viewId,
            aggregateQueries: query.aggregate || []
        });
    });
    /** Do queries and receive responses. */
    let rawQueryCollectionResponses = new Map();
    for (let i = 0; i < rawQueryCollectionRequests.length; ++i) {
        let req = rawQueryCollectionRequests[i];
        let res = await apiAgent.queryCollection(req.collectionId, req.collectionViewId, req.aggregateQueries);
        if (res.statusCode !== 200) {
            console.log(res);
            throw new Error('Fail to get rawQueryCollectionResponse.');
        }
        rawQueryCollectionResponses.set(req.collectionViewId, res.data);
    }
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
    let blockRecordValueMap = rawQueryCollectionResponses.get(viewIds[0]).recordMap.block;
    let resultBlockIds = rawQueryCollectionResponses.get(viewIds[0]).result.blockIds;
    let nastCollection = {
        id,
        collectionId,
        /** Icon may be undefined */
        icon: rawCollectionRecord.value.icon
            ? rawCollectionRecord.value.icon
            : '',
        /** TS cannot assign string to 'collection' */
        type: 'collection',
        /** Name may be undefined */
        name: rawCollectionRecord.value.name
            ? rawCollectionRecord.value.name[0][0]
            : 'Untitled',
        /** In case schema is undefined */
        schema: rawCollectionRecord.value.schema
            ? rawCollectionRecord.value.schema
            : {},
        /** blockRecordValueMap[x] is Notion.BlockRecordValue (The one with role) */
        blocks: resultBlockIds.map(id => {
            return blockRecordValueMap[id].value;
        }),
        /** Use viewId to access record value maps. */
        views: viewIds.map(viewId => {
            let viewRecord = rawCollectionViewRecords.find(view => view.value.id === viewId);
            let view;
            let rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewId);
            let aggregationResults;
            if (viewRecord) {
                view = viewRecord.value;
            }
            else {
                throw new Error(`View ${viewId} does not have collection_view record.`);
            }
            if (rawQueryCollectionResponse) {
                aggregationResults = rawQueryCollectionResponse.result.aggregationResults;
            }
            else {
                throw new Error(`View ${viewId} does not have queryCollection response.`);
            }
            return {
                id: viewId,
                type: view.type,
                name: view.name,
                query: view.query,
                format: view.format,
                aggregate: (view.query.aggregate || []).map(prop => {
                    let aggregationResult = aggregationResults.find(res => res.id === prop.id);
                    return {
                        aggregationType: prop.aggregation_type,
                        property: prop.property,
                        value: aggregationResult
                            ? aggregationResult.value
                            : 0
                    };
                })
            };
        }),
        defaultViewId: viewIds[0]
    };
    return nastCollection;
}
exports.queryCollection = queryCollection;
