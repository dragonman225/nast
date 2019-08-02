"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const transformBlock_1 = require("./transformBlock");
async function getTreeByBlockId(rootID, agent) {
    assert_1.default(typeof rootID === 'string');
    assert_1.default(typeof agent === 'object');
    assert_1.default(typeof agent.getRecordValues === 'function');
    assert_1.default(typeof agent.queryCollection === 'function');
    const api = agent;
    /**
     * Only downloading children of a root "page" block.
     * This prevents downloading children of "link to a page" and
     * "embeded sub-page" blocks.
     */
    let pageRootDownloaded = false;
    /* Get all records in a flat array. */
    const allRecords = await getChildrenRecords([rootID]);
    return makeTree(allRecords, api);
    //return { records: allRecords }
    /**
     * Get RecordValues of some IDs and their descendants.
     * @param blockIds - Some IDs.
     * @returns RecordValues of those IDs and their descendants.
     */
    async function getChildrenRecords(blockIds) {
        let requests = makeRecordRequests(blockIds, 'block');
        let response = await api.getRecordValues(requests);
        if (response.statusCode !== 200) {
            console.log(response);
            throw new Error('Fail to get records.');
        }
        let responseData = response.data;
        let childrenRecords;
        let childrenIDs;
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
            childrenRecords = responseData.results;
            let childrenRecordsNoPage = responseData.results
                .filter((record) => {
                return record.role !== 'none' && record.value.type !== 'page';
            });
            childrenIDs = collectChildrenIDs(childrenRecordsNoPage);
        }
        else {
            childrenRecords = responseData.results;
            childrenIDs = collectChildrenIDs(childrenRecords);
            pageRootDownloaded = true;
        }
        /* If there're remaining children, download them. */
        if (childrenIDs.length > 0) {
            return childrenRecords.concat(await getChildrenRecords(childrenIDs));
        }
        else {
            return childrenRecords;
        }
    }
}
exports.getTreeByBlockId = getTreeByBlockId;
/**
 * Make request payload for getRecordValues API.
 * @param ids - Notion record ID array.
 * @param table - The table to query.
 * @returns The payload.
 */
function makeRecordRequests(ids, table) {
    let requests = ids.map((id) => {
        return { id, table };
    });
    return requests;
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
async function makeTree(allRecords, apiAgent) {
    /** Remove blocks with role: none */
    let nonEmptyRecords = allRecords
        .filter((record) => {
        return record.role !== 'none';
    });
    /* Tranform Notion.BlockRecordValue to Nast.Block */
    let nastList = await Promise.all(nonEmptyRecords
        .map((record) => {
        return transformBlock_1.transformBlock(record.value, apiAgent);
    }));
    /* A map for quick ID -> index lookup */
    let map = {};
    for (let i = 0; i < nonEmptyRecords.length; ++i) {
        map[nonEmptyRecords[i].value.id] = i;
    }
    /* The tree's root is always the first record */
    let treeRoot = nastList[0];
    let nastBlock;
    /**
     * Wire up each block's children
     * Iterate through blocks and get children IDs from
     * `nonEmptyRecords[i].value.content`, then find each child's reference
     * by ID using `map`.
     */
    for (let i = 0; i < nonEmptyRecords.length; ++i) {
        nastBlock = nastList[i];
        let childrenIDs = nonEmptyRecords[i].value.content;
        if (childrenIDs != null) {
            for (let j = 0; j < childrenIDs.length; ++j) {
                let indexOfChildReference = map[childrenIDs[j]];
                let childReference = nastList[indexOfChildReference];
                if (childReference != null) {
                    nastBlock.children.push(childReference);
                }
            }
        }
    }
    return treeRoot;
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
