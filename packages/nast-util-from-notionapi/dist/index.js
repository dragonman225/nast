"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const transformBlock_1 = require("./transformBlock");
async function getOnePageAsTree(pageId, apiAgent) {
    const allBlocks = await getAllBlocksInOnePage(pageId, apiAgent);
    return makeBlocksArrayIntoTree(allBlocks, apiAgent);
}
exports.getOnePageAsTree = getOnePageAsTree;
async function getAllBlocksInOnePage(pageId, apiAgent) {
    assert_1.default(typeof pageId === 'string');
    assert_1.default(typeof apiAgent === 'object');
    assert_1.default(typeof apiAgent.getRecordValues === 'function');
    assert_1.default(typeof apiAgent.queryCollection === 'function');
    assert_1.default(typeof apiAgent.loadPageChunk === 'function');
    /**
     * getChildrenBlocks() does not download children of a page,
     * so we should get the page first.
     */
    const pageBlockRequest = generateGRVPayload([pageId], 'block');
    const pageBlockResponse = await apiAgent.getRecordValues(pageBlockRequest);
    if (pageBlockResponse.statusCode !== 200) {
        console.log(pageBlockResponse);
        throw new Error('Fail to get page block.');
    }
    const pageBlockData = pageBlockResponse.data;
    const pageBlock = pageBlockData.results[0];
    const childrenIdsOfPageBlock = pageBlock.value.content;
    let allRecords = [pageBlock];
    if (childrenIdsOfPageBlock != null) {
        /* Get all records in a flat array. */
        const children = await getChildrenBlocks(childrenIdsOfPageBlock, apiAgent);
        allRecords = allRecords.concat(children);
    }
    return allRecords;
}
exports.getAllBlocksInOnePage = getAllBlocksInOnePage;
/**
 * Generate request payload for getRecordValues API.
 * @param ids - Notion record ID array.
 * @param table - The table to query.
 * @returns The payload.
 */
function generateGRVPayload(ids, table) {
    const requests = ids.map((id) => {
        return { id, table };
    });
    return requests;
}
/**
 * Get Notion.BlockRecordValue of IDs and descendants of non-page blocks
 */
async function getChildrenBlocks(blockIds, apiAgent) {
    /** Get children records with getRecordValues */
    const requests = generateGRVPayload(blockIds, 'block');
    const response = await apiAgent.getRecordValues(requests);
    if (response.statusCode !== 200) {
        console.log(response);
        throw new Error('Fail to get records.');
    }
    const responseData = response.data;
    const childrenRecords = responseData.results;
    /**
     * Filter out "page" blocks and empty blocks.
     *
     * If we do not filter out "page" blocks, children of "Embedded Page" and
     * "Link to Page" will be collected.
     */
    const childrenRecordsNoPage = childrenRecords
        .filter((record) => {
        return record.role !== 'none' && record.value.type !== 'page';
    });
    const childrenIDs = collectChildrenIDs(childrenRecordsNoPage);
    /* If there're remaining children, download them. */
    if (childrenIDs.length > 0) {
        return childrenRecords.concat(await getChildrenBlocks(childrenIDs, apiAgent));
    }
    else {
        return childrenRecords;
    }
}
/**
 * Collect children IDs of an records array.
 * @param records - The records array.
 * @returns An array of IDs.
 */
function collectChildrenIDs(records) {
    let childrenIDs = [];
    records.forEach((record) => {
        let _childrenIDs = [];
        if (record.value != null && record.value.content != null) {
            _childrenIDs = record.value.content;
        }
        if (_childrenIDs) {
            childrenIDs = childrenIDs.concat(_childrenIDs);
        }
    });
    return childrenIDs;
}
/**
 * Convert BlockRecordValue array to NAST.
 * @param allRecords - The BlockRecordValue array.
 * @returns NAST.
 */
async function makeBlocksArrayIntoTree(allRecords, apiAgent) {
    /** Remove blocks with role: none */
    const nonEmptyRecords = allRecords
        .filter((record) => {
        return record.role !== 'none';
    });
    /* Tranform Notion.BlockRecordValue to Nast.Block */
    const nastList = await Promise.all(nonEmptyRecords
        .map((record) => {
        return transformBlock_1.transformBlock(record.value, apiAgent);
    }));
    /* A map for quick ID -> index lookup */
    const map = {};
    for (let i = 0; i < nonEmptyRecords.length; ++i) {
        map[nonEmptyRecords[i].value.id] = i;
    }
    /* The tree's root is always the first record */
    const treeRoot = nastList[0];
    let nastBlock;
    /**
     * Wire up each block's children
     * Iterate through blocks and get children IDs from
     * `nonEmptyRecords[i].value.content`, then find each child's reference
     * by ID using `map`.
     */
    for (let i = 0; i < nonEmptyRecords.length; ++i) {
        nastBlock = nastList[i];
        const childrenIDs = nonEmptyRecords[i].value.content;
        if (childrenIDs != null) {
            for (let j = 0; j < childrenIDs.length; ++j) {
                const indexOfChildReference = map[childrenIDs[j]];
                const childReference = nastList[indexOfChildReference];
                if (childReference != null) {
                    nastBlock.children.push(childReference);
                }
            }
        }
    }
    return treeRoot;
}
//# sourceMappingURL=index.js.map