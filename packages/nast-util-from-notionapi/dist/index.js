(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block-map.ts":
/*!**************************!*\
  !*** ./src/block-map.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map = {
    page: 'page',
    header: 'header',
    subHeader: 'sub_header',
    subSubHeader: 'sub_sub_header',
    toDo: 'to_do',
    toggle: 'toggle',
    columnList: 'column_list',
    column: 'column',
    bulletedList: 'bulleted_list',
    numberedList: 'numbered_list',
    text: 'text',
    code: 'code',
    equation: 'equation',
    divider: 'divider',
    quote: 'quote',
    callout: 'callout',
    tableOfContents: 'table_of_contents',
    breadcrumb: 'breadcrumb',
    image: 'image',
    video: 'video',
    embed: 'embed',
    audio: 'audio',
    bookmark: 'bookmark',
    collectionView: 'collection_view',
    collectionViewPage: 'collection_view_page',
    unorderedList: 'unordered_list',
    orderedList: 'ordered_list'
};
exports.default = map;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "assert"));
const transformBlock_1 = __webpack_require__(/*! ./transformBlock */ "./src/transformBlock.ts");
async function getOnePageAsTree(pageId, apiAgent) {
    let allBlocks = await getAllBlocksInOnePage(pageId, apiAgent);
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
    let pageBlockRequest = generateGRVPayload([pageId], 'block');
    let pageBlockResponse = await apiAgent.getRecordValues(pageBlockRequest);
    if (pageBlockResponse.statusCode !== 200) {
        console.log(pageBlockResponse);
        throw new Error('Fail to get page block.');
    }
    let pageBlock = pageBlockResponse.data.results[0];
    let childrenIdsOfPageBlock = pageBlock.value.content;
    let allRecords = [pageBlock];
    if (childrenIdsOfPageBlock != null) {
        /* Get all records in a flat array. */
        let children = await getChildrenBlocks(childrenIdsOfPageBlock, apiAgent);
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
    let requests = ids.map((id) => {
        return { id, table };
    });
    return requests;
}
/**
 * Get Notion.BlockRecordValue of IDs and descendants of non-page blocks
 */
async function getChildrenBlocks(blockIds, apiAgent) {
    /** Get children records with getRecordValues */
    let requests = generateGRVPayload(blockIds, 'block');
    let response = await apiAgent.getRecordValues(requests);
    if (response.statusCode !== 200) {
        console.log(response);
        throw new Error('Fail to get records.');
    }
    let responseData = response.data;
    let childrenRecords = responseData.results;
    /**
     * Filter out "page" blocks and empty blocks.
     *
     * If we do not filter out "page" blocks, children of "Embedded Page" and
     * "Link to Page" will be collected.
     */
    let childrenRecordsNoPage = responseData.results
        .filter((record) => {
        return record.role !== 'none' && record.value.type !== 'page';
    });
    let childrenIDs = collectChildrenIDs(childrenRecordsNoPage);
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


/***/ }),

/***/ "./src/transformBlock.ts":
/*!*******************************!*\
  !*** ./src/transformBlock.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformCollection_1 = __webpack_require__(/*! ./transformers/transformCollection */ "./src/transformers/transformCollection.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.js");
const block_map_1 = __importDefault(__webpack_require__(/*! ./block-map */ "./src/block-map.ts"));
const transformPage_1 = __importDefault(__webpack_require__(/*! ./transformers/transformPage */ "./src/transformers/transformPage.ts"));
const transformStub_1 = __importDefault(__webpack_require__(/*! ./transformers/transformStub */ "./src/transformers/transformStub.ts"));
const transformText_1 = __importDefault(__webpack_require__(/*! ./transformers/transformText */ "./src/transformers/transformText.ts"));
const transformToDo_1 = __importDefault(__webpack_require__(/*! ./transformers/transformToDo */ "./src/transformers/transformToDo.ts"));
const transformHeading_1 = __importDefault(__webpack_require__(/*! ./transformers/transformHeading */ "./src/transformers/transformHeading.ts"));
const transformBulletedListItem_1 = __importDefault(__webpack_require__(/*! ./transformers/transformBulletedListItem */ "./src/transformers/transformBulletedListItem.ts"));
const transformNumberedListItem_1 = __importDefault(__webpack_require__(/*! ./transformers/transformNumberedListItem */ "./src/transformers/transformNumberedListItem.ts"));
const transformEmbed_1 = __importDefault(__webpack_require__(/*! ./transformers/transformEmbed */ "./src/transformers/transformEmbed.ts"));
const transformImage_1 = __importDefault(__webpack_require__(/*! ./transformers/transformImage */ "./src/transformers/transformImage.ts"));
const transformCallout_1 = __importDefault(__webpack_require__(/*! ./transformers/transformCallout */ "./src/transformers/transformCallout.ts"));
const transformDivider_1 = __importDefault(__webpack_require__(/*! ./transformers/transformDivider */ "./src/transformers/transformDivider.ts"));
const transformQuote_1 = __importDefault(__webpack_require__(/*! ./transformers/transformQuote */ "./src/transformers/transformQuote.ts"));
const transformToggleList_1 = __importDefault(__webpack_require__(/*! ./transformers/transformToggleList */ "./src/transformers/transformToggleList.ts"));
const transformColumn_1 = __importDefault(__webpack_require__(/*! ./transformers/transformColumn */ "./src/transformers/transformColumn.ts"));
const transformColumnList_1 = __importDefault(__webpack_require__(/*! ./transformers/transformColumnList */ "./src/transformers/transformColumnList.ts"));
const transformEquation_1 = __importDefault(__webpack_require__(/*! ./transformers/transformEquation */ "./src/transformers/transformEquation.ts"));
const transformCode_1 = __importDefault(__webpack_require__(/*! ./transformers/transformCode */ "./src/transformers/transformCode.ts"));
const transformAudio_1 = __importDefault(__webpack_require__(/*! ./transformers/transformAudio */ "./src/transformers/transformAudio.ts"));
const transformBookmark_1 = __importDefault(__webpack_require__(/*! ./transformers/transformBookmark */ "./src/transformers/transformBookmark.ts"));
async function transformBlock(node, apiAgent) {
    let nastNode;
    switch (node.type) {
        /** Nast.Page */
        case block_map_1.default.page: {
            nastNode = transformPage_1.default(node);
            break;
        }
        /** Nast.Collection */
        case block_map_1.default.collectionView: {
            nastNode = transformCollection_1.transformCollection(node, apiAgent);
            break;
        }
        case block_map_1.default.collectionViewPage: {
            nastNode = transformCollection_1.transformCollection(node, apiAgent);
            break;
        }
        /** Nast.Text */
        case block_map_1.default.text: {
            nastNode = transformText_1.default(node);
            break;
        }
        /** Nast.ToDoList */
        case block_map_1.default.toDo: {
            nastNode = transformToDo_1.default(node);
            break;
        }
        /** Nast.Heading */
        case block_map_1.default.header: {
            nastNode = transformHeading_1.default(node);
            break;
        }
        case block_map_1.default.subHeader: {
            nastNode = transformHeading_1.default(node);
            break;
        }
        case block_map_1.default.subSubHeader: {
            nastNode = transformHeading_1.default(node);
            break;
        }
        /** Nast.BulletedListItem */
        case block_map_1.default.bulletedList: {
            nastNode = transformBulletedListItem_1.default(node);
            break;
        }
        /** Nast.NumberedListItem */
        case block_map_1.default.numberedList: {
            nastNode = transformNumberedListItem_1.default(node);
            break;
        }
        /** Nast.ToggleList */
        case block_map_1.default.toggle: {
            nastNode = transformToggleList_1.default(node);
            break;
        }
        /** Nast.Quote */
        case block_map_1.default.quote: {
            nastNode = transformQuote_1.default(node);
            break;
        }
        /** Nast.Divider */
        case block_map_1.default.divider: {
            nastNode = transformDivider_1.default(node);
            break;
        }
        /** Nast.Callout */
        case block_map_1.default.callout: {
            nastNode = transformCallout_1.default(node);
            break;
        }
        /** Nast.Image */
        case block_map_1.default.image: {
            nastNode = transformImage_1.default(node);
            break;
        }
        /** Nast.Video */
        case block_map_1.default.video: {
            nastNode = transformEmbed_1.default(node);
            break;
        }
        /** Nast.Embed */
        case block_map_1.default.embed: {
            nastNode = transformEmbed_1.default(node);
            break;
        }
        /** Nast.Audio */
        case block_map_1.default.audio: {
            nastNode = transformAudio_1.default(node);
            break;
        }
        /** Nast.WebBookmark */
        case block_map_1.default.bookmark: {
            nastNode = transformBookmark_1.default(node);
            break;
        }
        /** Nast.Code */
        case block_map_1.default.code: {
            nastNode = transformCode_1.default(node);
            break;
        }
        /** Nast.Equation */
        case block_map_1.default.equation: {
            nastNode = transformEquation_1.default(node);
            break;
        }
        /** Nast.ColumnList */
        case block_map_1.default.columnList: {
            nastNode = transformColumnList_1.default(node);
            break;
        }
        /** Nast.Column */
        case block_map_1.default.column: {
            nastNode = transformColumn_1.default(node);
            break;
        }
        default: {
            nastNode = transformStub_1.default(node);
            utils_1.log(`Unsupported block type: ${node.type}`);
        }
    }
    return nastNode;
}
exports.transformBlock = transformBlock;


/***/ }),

/***/ "./src/transformers/transformAudio.ts":
/*!********************************************!*\
  !*** ./src/transformers/transformAudio.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformAudio(node) {
    let nastNode = {
        id: node.id,
        type: 'audio',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        source: node.properties
            ? node.properties.source
                ? node.properties.source[0][0]
                : '#'
            : '#'
    };
    return nastNode;
}
exports.default = transformAudio;


/***/ }),

/***/ "./src/transformers/transformBookmark.ts":
/*!***********************************************!*\
  !*** ./src/transformers/transformBookmark.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformBookmark(node) {
    let props = node.properties || {};
    let format = node.format || {};
    let nastNode = {
        id: node.id,
        type: 'bookmark',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        link: props.link ? props.link[0][0] : '#',
        title: props.title ? props.title[0][0] : undefined,
        description: props.description ? props.description[0][0] : undefined,
        icon: format.bookmark_icon,
        cover: format.bookmark_cover,
    };
    return nastNode;
}
exports.default = transformBookmark;


/***/ }),

/***/ "./src/transformers/transformBulletedListItem.ts":
/*!*******************************************************!*\
  !*** ./src/transformers/transformBulletedListItem.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformBulletedListItem(node) {
    let nastNode = {
        id: node.id,
        type: 'bulleted_list_item',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformBulletedListItem;


/***/ }),

/***/ "./src/transformers/transformCallout.ts":
/*!**********************************************!*\
  !*** ./src/transformers/transformCallout.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformCallout(node) {
    let nastNode = {
        id: node.id,
        type: 'callout',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        icon: utils_1.getBlockIcon(node),
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformCallout;


/***/ }),

/***/ "./src/transformers/transformCode.ts":
/*!*******************************************!*\
  !*** ./src/transformers/transformCode.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformCode(node) {
    let props = node.properties || {};
    let format = node.format || {};
    let nastNode = {
        id: node.id,
        type: 'code',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node),
        language: props.language ? props.language[0][0] : undefined,
        wrap: typeof format.code_wrap !== 'undefined'
            ? format.code_wrap : false
    };
    return nastNode;
}
exports.default = transformCode;


/***/ }),

/***/ "./src/transformers/transformCollection.ts":
/*!*************************************************!*\
  !*** ./src/transformers/transformCollection.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformPage_1 = __importDefault(__webpack_require__(/*! ./transformPage */ "./src/transformers/transformPage.ts"));
async function transformCollection(collectionBlockRecord, apiAgent) {
    /** Block ID */
    let id = collectionBlockRecord.id;
    /** Collection View IDs */
    let viewIds = collectionBlockRecord['view_ids'] || [];
    /** Collection ID */
    let collectionId = collectionBlockRecord['collection_id'] || '';
    if (collectionId.length === 0) {
        throw new Error(`Block ${id} has no collection ID.`);
    }
    if (viewIds.length === 0) {
        throw new Error(`Block ${id} - Collection ${collectionId} has no view.`);
    }
    let rawCollectionViewRecords = await getCollectionViewRecords(viewIds, apiAgent);
    let rawCollectionRecord = await getCollectionRecord(collectionId, apiAgent);
    let rawCollection = rawCollectionRecord.value;
    /**
     * Make query map: collectionViewId -> Notion.Query of the view
     */
    let queryMap = new Map();
    rawCollectionViewRecords.forEach((record) => {
        let viewId = record.value.id;
        let query = record.value.query;
        queryMap.set(viewId, query);
    });
    let rawQueryCollectionResponses = await getQueryCollectionResponses(collectionId, queryMap, apiAgent);
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
    let rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewIds[0]);
    if (!rawQueryCollectionResponse)
        throw new Error(`No rawQueryCollectionResponse for ${viewIds[0]}`);
    let blockRecordValueMap = rawQueryCollectionResponse.recordMap.block;
    let resultBlockIds = rawQueryCollectionResponse.result.blockIds;
    let nastCollection = {
        /** TS cannot assign string to 'collection' */
        type: 'collection',
        id,
        collectionId,
        createdTime: collectionBlockRecord.created_time,
        lastEditedTime: collectionBlockRecord.last_edited_time,
        icon: rawCollection.icon,
        cover: rawCollection.cover,
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
            .map((id) => {
            return transformPage_1.default(blockRecordValueMap[id].value);
        })),
        /** Use viewId to access record value maps. */
        views: viewIds.map((viewId) => {
            let viewRecord = rawCollectionViewRecords
                .find((view) => view.value.id === viewId);
            let view;
            let rawQueryCollectionResponse = rawQueryCollectionResponses.get(viewId);
            let aggregationResults;
            /** Normally, the following two "if" should not happen. */
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
                aggregate: (view.query.aggregate || [])
                    .map((prop) => {
                    let aggregationResult = aggregationResults
                        .find((res) => res.id === prop.id);
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
        defaultViewId: viewIds[0],
        children: []
    };
    return nastCollection;
}
exports.transformCollection = transformCollection;
/**
 * Get collection view records
 *
 * This is necessary to get Notion.Query object,
 * which contains sort, aggregate, filter_operator that are used to do
 * Notion.Agent.queryCollection()
 */
async function getCollectionViewRecords(viewIds, apiAgent) {
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
    return rawCollectionViewRecords;
}
exports.getCollectionViewRecords = getCollectionViewRecords;
/**
 * Get collection record
 *
 * One database only has one collection.
 */
async function getCollectionRecord(collectionId, apiAgent) {
    let collectionRequests = [{
            id: collectionId,
            table: 'collection'
        }];
    let apiRes = await apiAgent.getRecordValues(collectionRequests);
    if (apiRes.statusCode !== 200) {
        console.log(apiRes);
        throw new Error('Fail to get collectionResponses.');
    }
    let collectionResponses = apiRes.data.results;
    let rawCollectionRecord = collectionResponses[0];
    return rawCollectionRecord;
}
exports.getCollectionRecord = getCollectionRecord;
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
async function getQueryCollectionResponses(collectionId, queryMap, apiAgent) {
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
    return rawQueryCollectionResponses;
}
exports.getQueryCollectionResponses = getQueryCollectionResponses;


/***/ }),

/***/ "./src/transformers/transformColumn.ts":
/*!*********************************************!*\
  !*** ./src/transformers/transformColumn.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformColumn(node) {
    let nastNode = {
        id: node.id,
        type: 'column',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        ratio: node.format
            ? node.format.column_ratio
                ? node.format.column_ratio
                : 1
            : 1
    };
    return nastNode;
}
exports.default = transformColumn;


/***/ }),

/***/ "./src/transformers/transformColumnList.ts":
/*!*************************************************!*\
  !*** ./src/transformers/transformColumnList.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformColumnList(node) {
    let nastNode = {
        id: node.id,
        type: 'column_list',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: []
    };
    return nastNode;
}
exports.default = transformColumnList;


/***/ }),

/***/ "./src/transformers/transformDivider.ts":
/*!**********************************************!*\
  !*** ./src/transformers/transformDivider.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformDivider(node) {
    let nastNode = {
        id: node.id,
        type: 'divider',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: []
    };
    return nastNode;
}
exports.default = transformDivider;


/***/ }),

/***/ "./src/transformers/transformEmbed.ts":
/*!********************************************!*\
  !*** ./src/transformers/transformEmbed.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformEmbed(node) {
    let format = node.format || {};
    let nastNode = {
        id: node.id,
        type: node.type === 'video'
            ? 'video' : 'embed',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        width: format.block_width || 9999,
        source: format.display_source || '#',
        fullWidth: typeof format.block_full_width !== 'undefined'
            ? format.block_full_width : false,
        pageWidth: typeof format.block_page_width !== 'undefined'
            ? format.block_page_width : false,
        aspectRatio: format.block_aspect_ratio || 0.562,
        preserveScale: typeof format.block_preserve_scale !== 'undefined'
            ? format.block_preserve_scale : true
    };
    return nastNode;
}
exports.default = transformEmbed;


/***/ }),

/***/ "./src/transformers/transformEquation.ts":
/*!***********************************************!*\
  !*** ./src/transformers/transformEquation.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformEquation(node) {
    let nastNode = {
        id: node.id,
        type: 'equation',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        latex: node.properties
            ? node.properties.title
                ? node.properties.title[0][0]
                : ''
            : ''
    };
    return nastNode;
}
exports.default = transformEquation;


/***/ }),

/***/ "./src/transformers/transformHeading.ts":
/*!**********************************************!*\
  !*** ./src/transformers/transformHeading.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
const block_map_1 = __importDefault(__webpack_require__(/*! ../block-map */ "./src/block-map.ts"));
async function transformHeading(node) {
    let depth;
    switch (node.type) {
        case block_map_1.default.header:
            depth = 1;
            break;
        case block_map_1.default.subHeader:
            depth = 2;
            break;
        default:
            depth = 3;
    }
    let nastNode = {
        id: node.id,
        type: 'heading',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node),
        depth
    };
    return nastNode;
}
exports.default = transformHeading;


/***/ }),

/***/ "./src/transformers/transformImage.ts":
/*!********************************************!*\
  !*** ./src/transformers/transformImage.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformImage(node) {
    let format = node.format || {};
    let nastNode = {
        id: node.id,
        type: 'image',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        width: format.block_width || 9999,
        source: format.display_source || '#',
        fullWidth: typeof format.block_full_width !== 'undefined'
            ? format.block_full_width : false,
        pageWidth: typeof format.block_page_width !== 'undefined'
            ? format.block_page_width : false
    };
    return nastNode;
}
exports.default = transformImage;


/***/ }),

/***/ "./src/transformers/transformNumberedListItem.ts":
/*!*******************************************************!*\
  !*** ./src/transformers/transformNumberedListItem.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformNumberedListItem(node) {
    let nastNode = {
        id: node.id,
        type: 'numbered_list_item',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformNumberedListItem;


/***/ }),

/***/ "./src/transformers/transformPage.ts":
/*!*******************************************!*\
  !*** ./src/transformers/transformPage.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformPage(node) {
    let format = node.format || {};
    let nastNode = {
        id: node.id,
        type: 'page',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        title: utils_1.getBlockTitle(node)[0] ? utils_1.getBlockTitle(node)[0][0] : '',
        icon: utils_1.getBlockIcon(node),
        cover: format.page_cover || undefined,
        fullWidth: typeof format.page_full_width !== 'undefined'
            ? format.page_full_width : false,
        coverPosition: format.page_cover_position || 1,
        properties: node.properties
    };
    return nastNode;
}
exports.default = transformPage;


/***/ }),

/***/ "./src/transformers/transformQuote.ts":
/*!********************************************!*\
  !*** ./src/transformers/transformQuote.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformQuote(node) {
    let nastNode = {
        id: node.id,
        type: 'quote',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformQuote;


/***/ }),

/***/ "./src/transformers/transformStub.ts":
/*!*******************************************!*\
  !*** ./src/transformers/transformStub.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformStub(node) {
    let nastNode = {
        id: node.id,
        type: node.type,
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: []
    };
    return nastNode;
}
exports.default = transformStub;


/***/ }),

/***/ "./src/transformers/transformText.ts":
/*!*******************************************!*\
  !*** ./src/transformers/transformText.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformText(node) {
    let nastNode = {
        id: node.id,
        type: 'text',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformText;


/***/ }),

/***/ "./src/transformers/transformToDo.ts":
/*!*******************************************!*\
  !*** ./src/transformers/transformToDo.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformToDo(node) {
    let nastNode = {
        id: node.id,
        type: 'to_do',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node),
        checked: node.properties
            ? node.properties.checked
                ? node.properties.checked[0][0] === 'Yes'
                : false
            : false
    };
    return nastNode;
}
exports.default = transformToDo;


/***/ }),

/***/ "./src/transformers/transformToggleList.ts":
/*!*************************************************!*\
  !*** ./src/transformers/transformToggleList.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformToggleList(node) {
    let nastNode = {
        id: node.id,
        type: 'toggle',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformToggleList;


/***/ }),

/***/ "./src/transformers/utils.ts":
/*!***********************************!*\
  !*** ./src/transformers/utils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getBlockColor(node) {
    let color = node.format
        ? node.format['block_color']
        : undefined;
    return color;
}
exports.getBlockColor = getBlockColor;
function getBlockTitle(node) {
    let title = node.properties
        ? node.properties.title
            ? node.properties.title
            : []
        : [];
    return title;
}
exports.getBlockTitle = getBlockTitle;
function getBlockIcon(node) {
    let icon = node.format
        ? node.format.page_icon
        : undefined;
    return icon;
}
exports.getBlockIcon = getBlockIcon;


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = { log, parseJSON }

/**
 * Wrapper of console.log().
 */
function log() {
  let args = Array.from(arguments)
  args.unshift('(nast-util-from-notionapi)')
  console.log.apply(null, args)
}

/**
 * Failsafe JSON.parse() wrapper.
 * @param {*} str - Payload to parse.
 * @returns {Object} Parsed object when success, undefined when fail.
 */
function parseJSON(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return void 0
  }
}

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jsb2NrLW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybUJsb2NrLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQXVkaW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Cb29rbWFyay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1DYWxsb3V0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29kZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW5MaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRGl2aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUVtYmVkLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRXF1YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1IZWFkaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtUGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVF1b3RlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtU3R1Yi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub0RvLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVG9nZ2xlTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhc3NlcnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNB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QztBQWFDLHNDQUFhO0FBWGYsU0FBUyxZQUFZLENBQ25CLElBQXVCO0lBRXZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7UUFDdkIsQ0FBQyxDQUFDLFNBQVM7SUFDYixPQUFPLElBQUk7QUFDYixDQUFDO0FBS0Msb0NBQVk7Ozs7Ozs7Ozs7OztBQ2xDZCxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN0QkEsbUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImNvbnN0IG1hcCA9IHtcbiAgcGFnZTogJ3BhZ2UnLFxuICBoZWFkZXI6ICdoZWFkZXInLFxuICBzdWJIZWFkZXI6ICdzdWJfaGVhZGVyJyxcbiAgc3ViU3ViSGVhZGVyOiAnc3ViX3N1Yl9oZWFkZXInLFxuICB0b0RvOiAndG9fZG8nLFxuICB0b2dnbGU6ICd0b2dnbGUnLFxuICBjb2x1bW5MaXN0OiAnY29sdW1uX2xpc3QnLFxuICBjb2x1bW46ICdjb2x1bW4nLFxuICBidWxsZXRlZExpc3Q6ICdidWxsZXRlZF9saXN0JyxcbiAgbnVtYmVyZWRMaXN0OiAnbnVtYmVyZWRfbGlzdCcsXG4gIHRleHQ6ICd0ZXh0JyxcbiAgY29kZTogJ2NvZGUnLFxuICBlcXVhdGlvbjogJ2VxdWF0aW9uJyxcbiAgZGl2aWRlcjogJ2RpdmlkZXInLFxuICBxdW90ZTogJ3F1b3RlJyxcbiAgY2FsbG91dDogJ2NhbGxvdXQnLFxuICB0YWJsZU9mQ29udGVudHM6ICd0YWJsZV9vZl9jb250ZW50cycsXG4gIGJyZWFkY3J1bWI6ICdicmVhZGNydW1iJyxcbiAgaW1hZ2U6ICdpbWFnZScsXG4gIHZpZGVvOiAndmlkZW8nLFxuICBlbWJlZDogJ2VtYmVkJyxcbiAgYXVkaW86ICdhdWRpbycsXG4gIGJvb2ttYXJrOiAnYm9va21hcmsnLFxuICBjb2xsZWN0aW9uVmlldzogJ2NvbGxlY3Rpb25fdmlldycsXG4gIGNvbGxlY3Rpb25WaWV3UGFnZTogJ2NvbGxlY3Rpb25fdmlld19wYWdlJyxcbiAgdW5vcmRlcmVkTGlzdDogJ3Vub3JkZXJlZF9saXN0JyxcbiAgb3JkZXJlZExpc3Q6ICdvcmRlcmVkX2xpc3QnXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcCIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0J1xuXG5pbXBvcnQgeyB0cmFuc2Zvcm1CbG9jayB9IGZyb20gJy4vdHJhbnNmb3JtQmxvY2snXG5cbmltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uL3R5cGVzL3NyYydcblxuYXN5bmMgZnVuY3Rpb24gZ2V0T25lUGFnZUFzVHJlZShcbiAgcGFnZUlkOiBzdHJpbmcsXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8TmFzdC5CbG9jaz4ge1xuXG4gIGxldCBhbGxCbG9ja3MgPSBhd2FpdCBnZXRBbGxCbG9ja3NJbk9uZVBhZ2UocGFnZUlkLCBhcGlBZ2VudClcbiAgcmV0dXJuIG1ha2VCbG9ja3NBcnJheUludG9UcmVlKGFsbEJsb2NrcywgYXBpQWdlbnQpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbEJsb2Nrc0luT25lUGFnZShcbiAgcGFnZUlkOiBzdHJpbmcsXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8Tm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXT4ge1xuXG4gIGFzc2VydCh0eXBlb2YgcGFnZUlkID09PSAnc3RyaW5nJylcbiAgYXNzZXJ0KHR5cGVvZiBhcGlBZ2VudCA9PT0gJ29iamVjdCcpXG4gIGFzc2VydCh0eXBlb2YgYXBpQWdlbnQuZ2V0UmVjb3JkVmFsdWVzID09PSAnZnVuY3Rpb24nKVxuICBhc3NlcnQodHlwZW9mIGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbiA9PT0gJ2Z1bmN0aW9uJylcbiAgYXNzZXJ0KHR5cGVvZiBhcGlBZ2VudC5sb2FkUGFnZUNodW5rID09PSAnZnVuY3Rpb24nKVxuXG4gIC8qKlxuICAgKiBnZXRDaGlsZHJlbkJsb2NrcygpIGRvZXMgbm90IGRvd25sb2FkIGNoaWxkcmVuIG9mIGEgcGFnZSxcbiAgICogc28gd2Ugc2hvdWxkIGdldCB0aGUgcGFnZSBmaXJzdC5cbiAgICovXG4gIGxldCBwYWdlQmxvY2tSZXF1ZXN0ID0gZ2VuZXJhdGVHUlZQYXlsb2FkKFtwYWdlSWRdLCAnYmxvY2snKVxuICBsZXQgcGFnZUJsb2NrUmVzcG9uc2U6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlc1Jlc3BvbnNlID1cbiAgICBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMocGFnZUJsb2NrUmVxdWVzdClcbiAgaWYgKHBhZ2VCbG9ja1Jlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKHBhZ2VCbG9ja1Jlc3BvbnNlKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgcGFnZSBibG9jay4nKVxuICB9XG4gIGxldCBwYWdlQmxvY2sgPSBwYWdlQmxvY2tSZXNwb25zZS5kYXRhLnJlc3VsdHNbMF1cbiAgbGV0IGNoaWxkcmVuSWRzT2ZQYWdlQmxvY2sgPSBwYWdlQmxvY2sudmFsdWUuY29udGVudFxuXG4gIGxldCBhbGxSZWNvcmRzOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZVtdID0gW3BhZ2VCbG9ja11cbiAgaWYgKGNoaWxkcmVuSWRzT2ZQYWdlQmxvY2sgIT0gbnVsbCkge1xuICAgIC8qIEdldCBhbGwgcmVjb3JkcyBpbiBhIGZsYXQgYXJyYXkuICovXG4gICAgbGV0IGNoaWxkcmVuID1cbiAgICAgIGF3YWl0IGdldENoaWxkcmVuQmxvY2tzKGNoaWxkcmVuSWRzT2ZQYWdlQmxvY2ssIGFwaUFnZW50KVxuICAgIGFsbFJlY29yZHMgPSBhbGxSZWNvcmRzLmNvbmNhdChjaGlsZHJlbilcbiAgfVxuXG4gIHJldHVybiBhbGxSZWNvcmRzXG59XG5cbi8qKlxuICogR2VuZXJhdGUgcmVxdWVzdCBwYXlsb2FkIGZvciBnZXRSZWNvcmRWYWx1ZXMgQVBJLlxuICogQHBhcmFtIGlkcyAtIE5vdGlvbiByZWNvcmQgSUQgYXJyYXkuXG4gKiBAcGFyYW0gdGFibGUgLSBUaGUgdGFibGUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyBUaGUgcGF5bG9hZC5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVHUlZQYXlsb2FkKFxuICBpZHM6IHN0cmluZ1tdLFxuICB0YWJsZTogc3RyaW5nXG4pOiBOb3Rpb24uUmVjb3JkUmVxdWVzdFtdIHtcblxuICBsZXQgcmVxdWVzdHMgPSBpZHMubWFwKChpZCk6IE5vdGlvbi5SZWNvcmRSZXF1ZXN0ID0+IHtcbiAgICByZXR1cm4geyBpZCwgdGFibGUgfVxuICB9KVxuXG4gIHJldHVybiByZXF1ZXN0c1xufVxuXG4vKipcbiAqIEdldCBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZSBvZiBJRHMgYW5kIGRlc2NlbmRhbnRzIG9mIG5vbi1wYWdlIGJsb2Nrc1xuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDaGlsZHJlbkJsb2NrcyhcbiAgYmxvY2tJZHM6IHN0cmluZ1tdLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10+IHtcblxuICAvKiogR2V0IGNoaWxkcmVuIHJlY29yZHMgd2l0aCBnZXRSZWNvcmRWYWx1ZXMgKi9cbiAgbGV0IHJlcXVlc3RzID0gZ2VuZXJhdGVHUlZQYXlsb2FkKGJsb2NrSWRzLCAnYmxvY2snKVxuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMocmVxdWVzdHMpXG5cbiAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgcmVjb3Jkcy4nKVxuICB9XG5cbiAgbGV0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLmRhdGFcbiAgbGV0IGNoaWxkcmVuUmVjb3JkczogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXSA9IHJlc3BvbnNlRGF0YS5yZXN1bHRzXG4gIC8qKlxuICAgKiBGaWx0ZXIgb3V0IFwicGFnZVwiIGJsb2NrcyBhbmQgZW1wdHkgYmxvY2tzLlxuICAgKiBcbiAgICogSWYgd2UgZG8gbm90IGZpbHRlciBvdXQgXCJwYWdlXCIgYmxvY2tzLCBjaGlsZHJlbiBvZiBcIkVtYmVkZGVkIFBhZ2VcIiBhbmQgXG4gICAqIFwiTGluayB0byBQYWdlXCIgd2lsbCBiZSBjb2xsZWN0ZWQuXG4gICAqL1xuICBsZXQgY2hpbGRyZW5SZWNvcmRzTm9QYWdlID0gcmVzcG9uc2VEYXRhLnJlc3VsdHNcbiAgICAuZmlsdGVyKChyZWNvcmQ6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gcmVjb3JkLnJvbGUgIT09ICdub25lJyAmJiByZWNvcmQudmFsdWUudHlwZSAhPT0gJ3BhZ2UnXG4gICAgfSlcbiAgbGV0IGNoaWxkcmVuSURzOiBzdHJpbmdbXSA9IGNvbGxlY3RDaGlsZHJlbklEcyhjaGlsZHJlblJlY29yZHNOb1BhZ2UpXG5cbiAgLyogSWYgdGhlcmUncmUgcmVtYWluaW5nIGNoaWxkcmVuLCBkb3dubG9hZCB0aGVtLiAqL1xuICBpZiAoY2hpbGRyZW5JRHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBjaGlsZHJlblJlY29yZHMuY29uY2F0KFxuICAgICAgYXdhaXQgZ2V0Q2hpbGRyZW5CbG9ja3MoY2hpbGRyZW5JRHMsIGFwaUFnZW50KSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY2hpbGRyZW5SZWNvcmRzXG4gIH1cblxufVxuXG4vKipcbiAqIENvbGxlY3QgY2hpbGRyZW4gSURzIG9mIGFuIHJlY29yZHMgYXJyYXkuXG4gKiBAcGFyYW0gcmVjb3JkcyAtIFRoZSByZWNvcmRzIGFycmF5LlxuICogQHJldHVybnMgQW4gYXJyYXkgb2YgSURzLlxuICovXG5mdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5JRHMoXG4gIHJlY29yZHM6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW11cbik6IHN0cmluZ1tdIHtcblxuICBsZXQgY2hpbGRyZW5JRHM6IHN0cmluZ1tdID0gW11cblxuICByZWNvcmRzLmZvckVhY2goKHJlY29yZCk6IHZvaWQgPT4ge1xuICAgIGxldCBfY2hpbGRyZW5JRHMgPSBbXSBhcyBzdHJpbmdbXVxuXG4gICAgaWYgKHJlY29yZC52YWx1ZSAhPSBudWxsICYmIHJlY29yZC52YWx1ZS5jb250ZW50ICE9IG51bGwpIHtcbiAgICAgIF9jaGlsZHJlbklEcyA9IHJlY29yZC52YWx1ZS5jb250ZW50XG4gICAgfVxuXG4gICAgaWYgKF9jaGlsZHJlbklEcykge1xuICAgICAgY2hpbGRyZW5JRHMgPSBjaGlsZHJlbklEcy5jb25jYXQoX2NoaWxkcmVuSURzKVxuICAgIH1cblxuICB9KVxuXG4gIHJldHVybiBjaGlsZHJlbklEc1xuXG59XG5cbi8qKlxuICogQ29udmVydCBCbG9ja1JlY29yZFZhbHVlIGFycmF5IHRvIE5BU1QuXG4gKiBAcGFyYW0gYWxsUmVjb3JkcyAtIFRoZSBCbG9ja1JlY29yZFZhbHVlIGFycmF5LlxuICogQHJldHVybnMgTkFTVC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbWFrZUJsb2Nrc0FycmF5SW50b1RyZWUoXG4gIGFsbFJlY29yZHM6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10sXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8TmFzdC5CbG9jaz4ge1xuXG4gIC8qKiBSZW1vdmUgYmxvY2tzIHdpdGggcm9sZTogbm9uZSAqL1xuICBsZXQgbm9uRW1wdHlSZWNvcmRzID0gYWxsUmVjb3Jkc1xuICAgIC5maWx0ZXIoKHJlY29yZCk6IGJvb2xlYW4gPT4ge1xuICAgICAgcmV0dXJuIHJlY29yZC5yb2xlICE9PSAnbm9uZSdcbiAgICB9KVxuXG4gIC8qIFRyYW5mb3JtIE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlIHRvIE5hc3QuQmxvY2sgKi9cbiAgbGV0IG5hc3RMaXN0ID0gYXdhaXQgUHJvbWlzZS5hbGwobm9uRW1wdHlSZWNvcmRzXG4gICAgLm1hcCgocmVjb3JkKTogUHJvbWlzZTxOYXN0LkJsb2NrPiA9PiB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtQmxvY2socmVjb3JkLnZhbHVlLCBhcGlBZ2VudClcbiAgICB9KSlcblxuICAvKiBBIG1hcCBmb3IgcXVpY2sgSUQgLT4gaW5kZXggbG9va3VwICovXG4gIGxldCBtYXA6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vbkVtcHR5UmVjb3Jkcy5sZW5ndGg7ICsraSkge1xuICAgIG1hcFtub25FbXB0eVJlY29yZHNbaV0udmFsdWUuaWRdID0gaVxuICB9XG5cbiAgLyogVGhlIHRyZWUncyByb290IGlzIGFsd2F5cyB0aGUgZmlyc3QgcmVjb3JkICovXG4gIGxldCB0cmVlUm9vdCA9IG5hc3RMaXN0WzBdXG4gIGxldCBuYXN0QmxvY2tcblxuICAvKipcbiAgICogV2lyZSB1cCBlYWNoIGJsb2NrJ3MgY2hpbGRyZW5cbiAgICogSXRlcmF0ZSB0aHJvdWdoIGJsb2NrcyBhbmQgZ2V0IGNoaWxkcmVuIElEcyBmcm9tIFxuICAgKiBgbm9uRW1wdHlSZWNvcmRzW2ldLnZhbHVlLmNvbnRlbnRgLCB0aGVuIGZpbmQgZWFjaCBjaGlsZCdzIHJlZmVyZW5jZSBcbiAgICogYnkgSUQgdXNpbmcgYG1hcGAuXG4gICAqL1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vbkVtcHR5UmVjb3Jkcy5sZW5ndGg7ICsraSkge1xuICAgIG5hc3RCbG9jayA9IG5hc3RMaXN0W2ldXG5cbiAgICBsZXQgY2hpbGRyZW5JRHMgPSBub25FbXB0eVJlY29yZHNbaV0udmFsdWUuY29udGVudFxuICAgIGlmIChjaGlsZHJlbklEcyAhPSBudWxsKSB7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW5JRHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgbGV0IGluZGV4T2ZDaGlsZFJlZmVyZW5jZSA9IG1hcFtjaGlsZHJlbklEc1tqXV1cbiAgICAgICAgbGV0IGNoaWxkUmVmZXJlbmNlID0gbmFzdExpc3RbaW5kZXhPZkNoaWxkUmVmZXJlbmNlXVxuXG4gICAgICAgIGlmIChjaGlsZFJlZmVyZW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgbmFzdEJsb2NrLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cmVlUm9vdFxuXG59XG5cbmV4cG9ydCB7XG4gIGdldE9uZVBhZ2VBc1RyZWUsXG4gIGdldEFsbEJsb2Nrc0luT25lUGFnZVxufSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgdHJhbnNmb3JtQ29sbGVjdGlvbiB9IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbGxlY3Rpb24nXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGJsb2NrTWFwIGZyb20gJy4vYmxvY2stbWFwJ1xuXG5pbXBvcnQgdHJhbnNmb3JtUGFnZSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1QYWdlJ1xuaW1wb3J0IHRyYW5zZm9ybVN0dWIgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtU3R1YidcbmltcG9ydCB0cmFuc2Zvcm1UZXh0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRleHQnXG5pbXBvcnQgdHJhbnNmb3JtVG9EbyBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub0RvJ1xuaW1wb3J0IHRyYW5zZm9ybUhlYWRpbmcgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSGVhZGluZydcbmltcG9ydCB0cmFuc2Zvcm1CdWxsZXRlZExpc3RJdGVtIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0nXG5pbXBvcnQgdHJhbnNmb3JtTnVtYmVyZWRMaXN0SXRlbSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtJ1xuaW1wb3J0IHRyYW5zZm9ybUVtYmVkIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUVtYmVkJ1xuaW1wb3J0IHRyYW5zZm9ybUltYWdlIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUltYWdlJ1xuaW1wb3J0IHRyYW5zZm9ybUNhbGxvdXQgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ2FsbG91dCdcbmltcG9ydCB0cmFuc2Zvcm1EaXZpZGVyIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybURpdmlkZXInXG5pbXBvcnQgdHJhbnNmb3JtUXVvdGUgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtUXVvdGUnXG5pbXBvcnQgdHJhbnNmb3JtVG9nZ2xlTGlzdCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub2dnbGVMaXN0J1xuaW1wb3J0IHRyYW5zZm9ybUNvbHVtbiBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW4nXG5pbXBvcnQgdHJhbnNmb3JtQ29sdW1uTGlzdCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW5MaXN0J1xuaW1wb3J0IHRyYW5zZm9ybUVxdWF0aW9uIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUVxdWF0aW9uJ1xuaW1wb3J0IHRyYW5zZm9ybUNvZGUgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29kZSdcbmltcG9ydCB0cmFuc2Zvcm1BdWRpbyBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1BdWRpbydcbmltcG9ydCB0cmFuc2Zvcm1Cb29rbWFyayBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Cb29rbWFyaydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQmxvY2soXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5hc3QuQmxvY2s+IHtcblxuICBsZXQgbmFzdE5vZGVcblxuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIC8qKiBOYXN0LlBhZ2UgKi9cbiAgICBjYXNlIGJsb2NrTWFwLnBhZ2U6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtUGFnZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ29sbGVjdGlvbiAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY29sbGVjdGlvblZpZXc6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ29sbGVjdGlvbihub2RlLCBhcGlBZ2VudClcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNhc2UgYmxvY2tNYXAuY29sbGVjdGlvblZpZXdQYWdlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvbGxlY3Rpb24obm9kZSwgYXBpQWdlbnQpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5UZXh0ICovXG4gICAgY2FzZSBibG9ja01hcC50ZXh0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVRleHQobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlRvRG9MaXN0ICovXG4gICAgY2FzZSBibG9ja01hcC50b0RvOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVRvRG8obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkhlYWRpbmcgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmhlYWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1IZWFkaW5nKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlIGJsb2NrTWFwLnN1YkhlYWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1IZWFkaW5nKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlIGJsb2NrTWFwLnN1YlN1YkhlYWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1IZWFkaW5nKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5CdWxsZXRlZExpc3RJdGVtICovXG4gICAgY2FzZSBibG9ja01hcC5idWxsZXRlZExpc3Q6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQnVsbGV0ZWRMaXN0SXRlbShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuTnVtYmVyZWRMaXN0SXRlbSAqL1xuICAgIGNhc2UgYmxvY2tNYXAubnVtYmVyZWRMaXN0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybU51bWJlcmVkTGlzdEl0ZW0obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlRvZ2dsZUxpc3QgKi9cbiAgICBjYXNlIGJsb2NrTWFwLnRvZ2dsZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Ub2dnbGVMaXN0KG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5RdW90ZSAqL1xuICAgIGNhc2UgYmxvY2tNYXAucXVvdGU6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtUXVvdGUobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkRpdmlkZXIgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmRpdmlkZXI6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtRGl2aWRlcihub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ2FsbG91dCAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY2FsbG91dDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1DYWxsb3V0KG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5JbWFnZSAqL1xuICAgIGNhc2UgYmxvY2tNYXAuaW1hZ2U6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtSW1hZ2Uobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlZpZGVvICovXG4gICAgY2FzZSBibG9ja01hcC52aWRlbzoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1FbWJlZChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuRW1iZWQgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmVtYmVkOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUVtYmVkKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5BdWRpbyAqL1xuICAgIGNhc2UgYmxvY2tNYXAuYXVkaW86IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQXVkaW8obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LldlYkJvb2ttYXJrICovXG4gICAgY2FzZSBibG9ja01hcC5ib29rbWFyazoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Cb29rbWFyayhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ29kZSAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY29kZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2RlKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5FcXVhdGlvbiAqL1xuICAgIGNhc2UgYmxvY2tNYXAuZXF1YXRpb246IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtRXF1YXRpb24obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkNvbHVtbkxpc3QgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmNvbHVtbkxpc3Q6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ29sdW1uTGlzdChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ29sdW1uICovXG4gICAgY2FzZSBibG9ja01hcC5jb2x1bW46IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ29sdW1uKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVN0dWIobm9kZSlcbiAgICAgIGxvZyhgVW5zdXBwb3J0ZWQgYmxvY2sgdHlwZTogJHtub2RlLnR5cGV9YClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFzdE5vZGVcblxufVxuXG5leHBvcnQge1xuICB0cmFuc2Zvcm1CbG9ja1xufSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUF1ZGlvKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkF1ZGlvPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnYXVkaW8nIGFzICdhdWRpbycsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHNvdXJjZTogbm9kZS5wcm9wZXJ0aWVzXG4gICAgICA/IG5vZGUucHJvcGVydGllcy5zb3VyY2VcbiAgICAgICAgPyBub2RlLnByb3BlcnRpZXMuc291cmNlWzBdWzBdXG4gICAgICAgIDogJyMnXG4gICAgICA6ICcjJ1xuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1BdWRpbyIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUJvb2ttYXJrKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LldlYkJvb2ttYXJrPiB7XG4gIGxldCBwcm9wcyA9IG5vZGUucHJvcGVydGllcyB8fCB7fVxuICBsZXQgZm9ybWF0ID0gbm9kZS5mb3JtYXQgfHwge31cbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdib29rbWFyaycgYXMgJ2Jvb2ttYXJrJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgbGluazogcHJvcHMubGluayA/IHByb3BzLmxpbmtbMF1bMF0gOiAnIycsXG4gICAgdGl0bGU6IHByb3BzLnRpdGxlID8gcHJvcHMudGl0bGVbMF1bMF0gOiB1bmRlZmluZWQsXG4gICAgZGVzY3JpcHRpb246IHByb3BzLmRlc2NyaXB0aW9uID8gcHJvcHMuZGVzY3JpcHRpb25bMF1bMF0gOiB1bmRlZmluZWQsXG4gICAgaWNvbjogZm9ybWF0LmJvb2ttYXJrX2ljb24sXG4gICAgY292ZXI6IGZvcm1hdC5ib29rbWFya19jb3ZlcixcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQm9va21hcmsiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1CdWxsZXRlZExpc3RJdGVtKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkJ1bGxldGVkTGlzdEl0ZW0+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdidWxsZXRlZF9saXN0X2l0ZW0nIGFzICdidWxsZXRlZF9saXN0X2l0ZW0nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUsIGdldEJsb2NrSWNvbiB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNhbGxvdXQoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ2FsbG91dD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2NhbGxvdXQnIGFzICdjYWxsb3V0JyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgaWNvbjogZ2V0QmxvY2tJY29uKG5vZGUpLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQ2FsbG91dCIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvZGUoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ29kZT4ge1xuICBsZXQgcHJvcHMgPSBub2RlLnByb3BlcnRpZXMgfHwge31cbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY29kZScgYXMgJ2NvZGUnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpLFxuICAgIGxhbmd1YWdlOiBwcm9wcy5sYW5ndWFnZSA/IHByb3BzLmxhbmd1YWdlWzBdWzBdIDogdW5kZWZpbmVkLFxuICAgIHdyYXA6IHR5cGVvZiBmb3JtYXQuY29kZV93cmFwICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmb3JtYXQuY29kZV93cmFwIDogZmFsc2VcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQ29kZSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHRyYW5zZm9ybVBhZ2UgZnJvbSAnLi90cmFuc2Zvcm1QYWdlJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Db2xsZWN0aW9uKFxuICBjb2xsZWN0aW9uQmxvY2tSZWNvcmQ6IE5vdGlvbi5CbG9ja1ZhbHVlLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5hc3QuQ29sbGVjdGlvbj4ge1xuXG4gIC8qKiBCbG9jayBJRCAqL1xuICBsZXQgaWQgPSBjb2xsZWN0aW9uQmxvY2tSZWNvcmQuaWRcbiAgLyoqIENvbGxlY3Rpb24gVmlldyBJRHMgKi9cbiAgbGV0IHZpZXdJZHMgPSBjb2xsZWN0aW9uQmxvY2tSZWNvcmRbJ3ZpZXdfaWRzJ10gfHwgW11cbiAgLyoqIENvbGxlY3Rpb24gSUQgKi9cbiAgbGV0IGNvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25CbG9ja1JlY29yZFsnY29sbGVjdGlvbl9pZCddIHx8ICcnXG5cbiAgaWYgKGNvbGxlY3Rpb25JZC5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEJsb2NrICR7aWR9IGhhcyBubyBjb2xsZWN0aW9uIElELmApXG4gIH1cblxuICBpZiAodmlld0lkcy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEJsb2NrICR7aWR9IC0gQ29sbGVjdGlvbiAke2NvbGxlY3Rpb25JZH0gaGFzIG5vIHZpZXcuYClcbiAgfVxuXG4gIGxldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHMgPSBhd2FpdCBnZXRDb2xsZWN0aW9uVmlld1JlY29yZHModmlld0lkcywgYXBpQWdlbnQpXG5cbiAgbGV0IHJhd0NvbGxlY3Rpb25SZWNvcmQgPSBhd2FpdCBnZXRDb2xsZWN0aW9uUmVjb3JkKGNvbGxlY3Rpb25JZCwgYXBpQWdlbnQpXG4gIGxldCByYXdDb2xsZWN0aW9uID0gcmF3Q29sbGVjdGlvblJlY29yZC52YWx1ZVxuXG4gIC8qKlxuICAgKiBNYWtlIHF1ZXJ5IG1hcDogY29sbGVjdGlvblZpZXdJZCAtPiBOb3Rpb24uUXVlcnkgb2YgdGhlIHZpZXdcbiAgICovXG4gIGxldCBxdWVyeU1hcDogTWFwPHN0cmluZywgTm90aW9uLlF1ZXJ5PiA9IG5ldyBNYXAoKVxuICByYXdDb2xsZWN0aW9uVmlld1JlY29yZHMuZm9yRWFjaCgocmVjb3JkOiBOb3Rpb24uQ29sbGVjdGlvblZpZXdSZWNvcmRWYWx1ZSk6IHZvaWQgPT4ge1xuICAgIGxldCB2aWV3SWQgPSByZWNvcmQudmFsdWUuaWRcbiAgICBsZXQgcXVlcnkgPSByZWNvcmQudmFsdWUucXVlcnlcbiAgICBxdWVyeU1hcC5zZXQodmlld0lkLCBxdWVyeSlcbiAgfSlcblxuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzID1cbiAgICBhd2FpdCBnZXRRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXMoY29sbGVjdGlvbklkLCBxdWVyeU1hcCwgYXBpQWdlbnQpXG5cbiAgLyoqIFRyYW5zZm9ybSB0byBOYXN0ICovXG4gIC8qKiBcbiAgICogQ2hvb3NlIG9uZSBvZiByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXMgdG8gZ2V0IGJsb2Nrcywgc2luY2UgXG4gICAqIG91ciBgYXBpQWdlbnQucXVlcnlDb2xsZWN0aW9uYCBpZ25vcmVzIGBOb3Rpb24uUXVlcnkuZmlsdGVyYCwgYWxsIFxuICAgKiByZXNwb25zZXMgaW5jbHVkZXMgYWxsIGJsb2Nrcy5cbiAgICovXG4gIC8qKiBcbiAgICogYE5vdGlvbi5RdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZWNvcmRNYXAuYmxvY2tgIGhhcyBibG9ja3Mgbm90IGluIHRoZSBcbiAgICogY29sbGVjdGlvbiwgZG9uJ3Qga25vdyB3aHkuXG4gICAqIFdlIGhhdmUgdG8gdXNlIGBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UucmVzdWx0LmJsb2NrSWRzYFxuICAgKiB0byBzZWxlY3Qgb25seSB0aG9zZSB3ZSB3YW50LlxuICAgKi9cbiAgLyoqXG4gICAqIFdlIHdvbid0IGdldCB1bmRlZmluZWQgYmVsb3cgc2luY2Ugdmlld0lkcyBndWFyYW50ZWUgdGhlcmUgYXJlIHZpZXdzLlxuICAgKi9cbiAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzLmdldCh2aWV3SWRzWzBdKVxuICBpZiAoIXJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlKVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UgZm9yICR7dmlld0lkc1swXX1gKVxuXG4gIGxldCBibG9ja1JlY29yZFZhbHVlTWFwID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UucmVjb3JkTWFwLmJsb2NrXG4gIGxldCByZXN1bHRCbG9ja0lkcyA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlc3VsdC5ibG9ja0lkc1xuICBsZXQgbmFzdENvbGxlY3Rpb24gPSB7XG4gICAgLyoqIFRTIGNhbm5vdCBhc3NpZ24gc3RyaW5nIHRvICdjb2xsZWN0aW9uJyAqL1xuICAgIHR5cGU6ICdjb2xsZWN0aW9uJyBhcyAnY29sbGVjdGlvbicsXG4gICAgaWQsXG4gICAgY29sbGVjdGlvbklkLFxuICAgIGNyZWF0ZWRUaW1lOiBjb2xsZWN0aW9uQmxvY2tSZWNvcmQuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBjb2xsZWN0aW9uQmxvY2tSZWNvcmQubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBpY29uOiByYXdDb2xsZWN0aW9uLmljb24sXG4gICAgY292ZXI6IHJhd0NvbGxlY3Rpb24uY292ZXIsXG4gICAgZGVzY3JpcHRpb246IHJhd0NvbGxlY3Rpb24uZGVzY3JpcHRpb24sXG4gICAgY292ZXJQb3NpdGlvbjogcmF3Q29sbGVjdGlvbi5mb3JtYXRcbiAgICAgID8gcmF3Q29sbGVjdGlvbi5mb3JtYXQuY29sbGVjdGlvbl9jb3Zlcl9wb3NpdGlvbiB8fCAxIDogMSxcbiAgICAvKiogTmFtZSBtYXkgYmUgdW5kZWZpbmVkICovXG4gICAgbmFtZTogcmF3Q29sbGVjdGlvbi5uYW1lXG4gICAgICA/IHJhd0NvbGxlY3Rpb24ubmFtZVswXVswXSB8fCAnVW50aXRsZWQnXG4gICAgICA6ICdVbnRpdGxlZCcsXG4gICAgLyoqIEluIGNhc2Ugc2NoZW1hIGlzIHVuZGVmaW5lZCAqL1xuICAgIHNjaGVtYTogcmF3Q29sbGVjdGlvbi5zY2hlbWEgfHwge30sXG4gICAgLyoqIGJsb2NrUmVjb3JkVmFsdWVNYXBbeF0gaXMgTm90aW9uLkJsb2NrUmVjb3JkVmFsdWUgKFRoZSBvbmUgd2l0aCByb2xlKSAqL1xuICAgIGJsb2NrczogYXdhaXQgUHJvbWlzZS5hbGwocmVzdWx0QmxvY2tJZHNcbiAgICAgIC5tYXAoKGlkOiBzdHJpbmcpOiBQcm9taXNlPE5hc3QuUGFnZT4gPT4ge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtUGFnZShibG9ja1JlY29yZFZhbHVlTWFwW2lkXS52YWx1ZSlcbiAgICAgIH0pKSxcbiAgICAvKiogVXNlIHZpZXdJZCB0byBhY2Nlc3MgcmVjb3JkIHZhbHVlIG1hcHMuICovXG4gICAgdmlld3M6IHZpZXdJZHMubWFwKCh2aWV3SWQ6IHN0cmluZyk6IE5hc3QuQ29sbGVjdGlvblZpZXdNZXRhZGF0YSA9PiB7XG4gICAgICBsZXQgdmlld1JlY29yZCA9IHJhd0NvbGxlY3Rpb25WaWV3UmVjb3Jkc1xuICAgICAgICAuZmluZCgodmlldyk6IGJvb2xlYW4gPT4gdmlldy52YWx1ZS5pZCA9PT0gdmlld0lkKVxuICAgICAgbGV0IHZpZXc6IE5vdGlvbi5Db2xsZWN0aW9uVmlld1ZhbHVlXG4gICAgICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXMuZ2V0KHZpZXdJZClcbiAgICAgIGxldCBhZ2dyZWdhdGlvblJlc3VsdHM6IE5vdGlvbi5BZ2dyZWdhdGlvblJlc3VsdFtdXG5cbiAgICAgIC8qKiBOb3JtYWxseSwgdGhlIGZvbGxvd2luZyB0d28gXCJpZlwiIHNob3VsZCBub3QgaGFwcGVuLiAqL1xuICAgICAgaWYgKHZpZXdSZWNvcmQpIHtcbiAgICAgICAgdmlldyA9IHZpZXdSZWNvcmQudmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmlldyAke3ZpZXdJZH0gZG9lcyBub3QgaGF2ZSBjb2xsZWN0aW9uX3ZpZXcgcmVjb3JkLmApXG4gICAgICB9XG5cbiAgICAgIGlmIChyYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSkge1xuICAgICAgICBhZ2dyZWdhdGlvblJlc3VsdHMgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZXN1bHQuYWdncmVnYXRpb25SZXN1bHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZpZXcgJHt2aWV3SWR9IGRvZXMgbm90IGhhdmUgcXVlcnlDb2xsZWN0aW9uIHJlc3BvbnNlLmApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB2aWV3SWQsXG4gICAgICAgIHR5cGU6IHZpZXcudHlwZSxcbiAgICAgICAgbmFtZTogdmlldy5uYW1lLFxuICAgICAgICBxdWVyeTogdmlldy5xdWVyeSxcbiAgICAgICAgZm9ybWF0OiB2aWV3LmZvcm1hdCxcbiAgICAgICAgYWdncmVnYXRlOiAodmlldy5xdWVyeS5hZ2dyZWdhdGUgfHwgW10pXG4gICAgICAgICAgLm1hcCgocHJvcCk6IE5hc3QuQWdncmVnYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgYWdncmVnYXRpb25SZXN1bHQgPSBhZ2dyZWdhdGlvblJlc3VsdHNcbiAgICAgICAgICAgICAgLmZpbmQoKHJlcyk6IGJvb2xlYW4gPT4gcmVzLmlkID09PSBwcm9wLmlkKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb25UeXBlOiBwcm9wLmFnZ3JlZ2F0aW9uX3R5cGUsXG4gICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLnByb3BlcnR5LFxuICAgICAgICAgICAgICB2YWx1ZTogYWdncmVnYXRpb25SZXN1bHRcbiAgICAgICAgICAgICAgICA/IGFnZ3JlZ2F0aW9uUmVzdWx0LnZhbHVlXG4gICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KSxcbiAgICBkZWZhdWx0Vmlld0lkOiB2aWV3SWRzWzBdLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG5cbiAgcmV0dXJuIG5hc3RDb2xsZWN0aW9uXG5cbn1cblxuLyoqIFxuICogR2V0IGNvbGxlY3Rpb24gdmlldyByZWNvcmRzXG4gKiBcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGdldCBOb3Rpb24uUXVlcnkgb2JqZWN0LFxuICogd2hpY2ggY29udGFpbnMgc29ydCwgYWdncmVnYXRlLCBmaWx0ZXJfb3BlcmF0b3IgdGhhdCBhcmUgdXNlZCB0byBkb1xuICogTm90aW9uLkFnZW50LnF1ZXJ5Q29sbGVjdGlvbigpXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb25WaWV3UmVjb3JkcyhcbiAgdmlld0lkczogc3RyaW5nW10sIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8Tm90aW9uLkNvbGxlY3Rpb25WaWV3UmVjb3JkVmFsdWVbXT4ge1xuXG4gIGxldCBjb2xsZWN0aW9uVmlld1JlcXVlc3RzID0gdmlld0lkcy5tYXAoKHZpZXdJZDogc3RyaW5nKTogTm90aW9uLlJlY29yZFJlcXVlc3QgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdmlld0lkLFxuICAgICAgdGFibGU6ICdjb2xsZWN0aW9uX3ZpZXcnXG4gICAgfVxuICB9KVxuXG4gIGxldCBhcGlSZXMgPSBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMoY29sbGVjdGlvblZpZXdSZXF1ZXN0cylcbiAgaWYgKGFwaVJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhhcGlSZXMpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsIHRvIGdldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHMuJylcbiAgfVxuXG4gIGxldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHM6IE5vdGlvbi5Db2xsZWN0aW9uVmlld1JlY29yZFZhbHVlW10gPVxuICAgIGFwaVJlcy5kYXRhLnJlc3VsdHNcblxuICByZXR1cm4gcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzXG59XG5cbi8qKiBcbiAqIEdldCBjb2xsZWN0aW9uIHJlY29yZFxuICogXG4gKiBPbmUgZGF0YWJhc2Ugb25seSBoYXMgb25lIGNvbGxlY3Rpb24uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb25SZWNvcmQoXG4gIGNvbGxlY3Rpb25JZDogc3RyaW5nLCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5vdGlvbi5Db2xsZWN0aW9uUmVjb3JkVmFsdWU+IHtcblxuICBsZXQgY29sbGVjdGlvblJlcXVlc3RzID0gW3tcbiAgICBpZDogY29sbGVjdGlvbklkLFxuICAgIHRhYmxlOiAnY29sbGVjdGlvbidcbiAgfV1cbiAgbGV0IGFwaVJlcyA9IGF3YWl0IGFwaUFnZW50LmdldFJlY29yZFZhbHVlcyhjb2xsZWN0aW9uUmVxdWVzdHMpXG4gIGlmIChhcGlSZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgY29uc29sZS5sb2coYXBpUmVzKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgY29sbGVjdGlvblJlc3BvbnNlcy4nKVxuICB9XG4gIGxldCBjb2xsZWN0aW9uUmVzcG9uc2VzID0gYXBpUmVzLmRhdGEucmVzdWx0c1xuICBsZXQgcmF3Q29sbGVjdGlvblJlY29yZDogTm90aW9uLkNvbGxlY3Rpb25SZWNvcmRWYWx1ZSA9IGNvbGxlY3Rpb25SZXNwb25zZXNbMF1cblxuICByZXR1cm4gcmF3Q29sbGVjdGlvblJlY29yZFxufVxuXG4vKipcbiAqIFF1ZXJ5IGFsbCBlbnRyaWVzIGluIHRoaXMgY29sbGVjdGlvblxuICogXG4gKiBUbyBnZXQgYWxsIGVudHJpZXMsIHdlIG11c3Qgbm90IGZpbHRlciBhbnkgZW50cmllcywgdGhpcyBtZWFuc1xuICogTm90aW9uLlF1ZXJ5LmZpbHRlciBzaG91bGQgYmUgZW1wdHkuIEx1Y2tpbHksIGN1cnJlbnQgTm90aW9uLkFnZW50IFxuICogc2V0IHRoYXQgZW1wdHkgYnkgZGVmYXVsdC5cbiAqIFxuICogVGhlIHF1ZXJ5Q29sbGVjdGlvbiBBUEkgY2FuIGJlIHVzZWQgdG8gcXVlcnkgb25lIGNvbGxlY3Rpb25fdmlldyBhdFxuICogdGhlIHNhbWUgdGltZSwgdGhvdWdoIHdlIGhhdmUgcXVlcmllZCBhbGwgY29sbGVjdGlvbiB2aWV3cyBwcmV2aW91c2x5LCBcbiAqIHdlIHN0aWxsIG5lZWQgdG8gcXVlcnkgdGhlIGFnZ3JlZ2F0aW9uUmVzdWx0cyBmb3IgdGhvc2UgY29sbGVjdGlvblxuICogdmlld3MuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcyhcbiAgY29sbGVjdGlvbklkOiBzdHJpbmcsIHF1ZXJ5TWFwOiBNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnk+LCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE1hcDxzdHJpbmcsIE5vdGlvbi5RdWVyeUNvbGxlY3Rpb25SZXNwb25zZT4+IHtcblxuICBpbnRlcmZhY2UgUmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdCB7XG4gICAgY29sbGVjdGlvbklkOiBzdHJpbmdcbiAgICBjb2xsZWN0aW9uVmlld0lkOiBzdHJpbmdcbiAgICBhZ2dyZWdhdGVRdWVyaWVzOiBOb3Rpb24uQWdncmVnYXRlUXVlcnlbXVxuICB9XG5cbiAgLyoqIE1ha2UgcmVxdWVzdCBvYmplY3RzLiAqL1xuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHM6IFJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3RbXSA9IFtdXG4gIHF1ZXJ5TWFwLmZvckVhY2goKHF1ZXJ5LCB2aWV3SWQpOiB2b2lkID0+IHtcbiAgICByYXdRdWVyeUNvbGxlY3Rpb25SZXF1ZXN0cy5wdXNoKHtcbiAgICAgIGNvbGxlY3Rpb25JZCxcbiAgICAgIGNvbGxlY3Rpb25WaWV3SWQ6IHZpZXdJZCxcbiAgICAgIGFnZ3JlZ2F0ZVF1ZXJpZXM6IHF1ZXJ5LmFnZ3JlZ2F0ZSB8fCBbXVxuICAgIH0pXG4gIH0pXG5cbiAgLyoqIERvIHF1ZXJpZXMgYW5kIHJlY2VpdmUgcmVzcG9uc2VzLiAqL1xuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzOiBNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2U+ID0gbmV3IE1hcCgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHMubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgcmVxID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHNbaV1cbiAgICBsZXQgcmVzID1cbiAgICAgIGF3YWl0IGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgICAgcmVxLmNvbGxlY3Rpb25JZCxcbiAgICAgICAgcmVxLmNvbGxlY3Rpb25WaWV3SWQsXG4gICAgICAgIHJlcS5hZ2dyZWdhdGVRdWVyaWVzKVxuICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLicpXG4gICAgfVxuICAgIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5zZXQocmVxLmNvbGxlY3Rpb25WaWV3SWQsIHJlcy5kYXRhKVxuICB9XG5cbiAgcmV0dXJuIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlc1xufVxuXG5leHBvcnQge1xuICB0cmFuc2Zvcm1Db2xsZWN0aW9uLFxuICBnZXRDb2xsZWN0aW9uVmlld1JlY29yZHMsXG4gIGdldENvbGxlY3Rpb25SZWNvcmQsXG4gIGdldFF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlc1xufSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbHVtbihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5Db2x1bW4+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdjb2x1bW4nIGFzICdjb2x1bW4nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICByYXRpbzogbm9kZS5mb3JtYXRcbiAgICAgID8gbm9kZS5mb3JtYXQuY29sdW1uX3JhdGlvXG4gICAgICAgID8gbm9kZS5mb3JtYXQuY29sdW1uX3JhdGlvXG4gICAgICAgIDogMVxuICAgICAgOiAxXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUNvbHVtbiIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbHVtbkxpc3QoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ29sdW1uTGlzdD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2NvbHVtbl9saXN0JyBhcyAnY29sdW1uX2xpc3QnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Db2x1bW5MaXN0IiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtRGl2aWRlcihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5EaXZpZGVyPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnZGl2aWRlcicgYXMgJ2RpdmlkZXInLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1EaXZpZGVyIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtRW1iZWQoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuRW1iZWQ+IHtcbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiBub2RlLnR5cGUgPT09ICd2aWRlbydcbiAgICAgID8gJ3ZpZGVvJyBhcyAndmlkZW8nIDogJ2VtYmVkJyBhcyAnZW1iZWQnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB3aWR0aDogZm9ybWF0LmJsb2NrX3dpZHRoIHx8IDk5OTksXG4gICAgc291cmNlOiBmb3JtYXQuZGlzcGxheV9zb3VyY2UgfHwgJyMnLFxuICAgIGZ1bGxXaWR0aDogdHlwZW9mIGZvcm1hdC5ibG9ja19mdWxsX3dpZHRoICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmb3JtYXQuYmxvY2tfZnVsbF93aWR0aCA6IGZhbHNlLFxuICAgIHBhZ2VXaWR0aDogdHlwZW9mIGZvcm1hdC5ibG9ja19wYWdlX3dpZHRoICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmb3JtYXQuYmxvY2tfcGFnZV93aWR0aCA6IGZhbHNlLFxuICAgIGFzcGVjdFJhdGlvOiBmb3JtYXQuYmxvY2tfYXNwZWN0X3JhdGlvIHx8IDAuNTYyLCAvLyAxNjo5XG4gICAgcHJlc2VydmVTY2FsZTogdHlwZW9mIGZvcm1hdC5ibG9ja19wcmVzZXJ2ZV9zY2FsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX3ByZXNlcnZlX3NjYWxlIDogdHJ1ZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1FbWJlZCIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUVxdWF0aW9uKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkVxdWF0aW9uPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnZXF1YXRpb24nIGFzICdlcXVhdGlvbicsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGxhdGV4OiBub2RlLnByb3BlcnRpZXNcbiAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlXG4gICAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlWzBdWzBdXG4gICAgICAgIDogJydcbiAgICAgIDogJydcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtRXF1YXRpb24iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGJsb2NrTWFwIGZyb20gJy4uL2Jsb2NrLW1hcCdcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtSGVhZGluZyhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5IZWFkaW5nPiB7XG4gIGxldCBkZXB0aFxuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIGNhc2UgYmxvY2tNYXAuaGVhZGVyOlxuICAgICAgZGVwdGggPSAxXG4gICAgICBicmVha1xuICAgIGNhc2UgYmxvY2tNYXAuc3ViSGVhZGVyOlxuICAgICAgZGVwdGggPSAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBkZXB0aCA9IDNcbiAgfVxuXG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnaGVhZGluZycgYXMgJ2hlYWRpbmcnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpLFxuICAgIGRlcHRoXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUhlYWRpbmciLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1JbWFnZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5JbWFnZT4ge1xuICBsZXQgZm9ybWF0ID0gbm9kZS5mb3JtYXQgfHwge31cbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdpbWFnZScgYXMgJ2ltYWdlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgd2lkdGg6IGZvcm1hdC5ibG9ja193aWR0aCB8fCA5OTk5LFxuICAgIHNvdXJjZTogZm9ybWF0LmRpc3BsYXlfc291cmNlIHx8ICcjJyxcbiAgICBmdWxsV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfZnVsbF93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX2Z1bGxfd2lkdGggOiBmYWxzZSxcbiAgICBwYWdlV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfcGFnZV93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggOiBmYWxzZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1JbWFnZSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybU51bWJlcmVkTGlzdEl0ZW0oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuTnVtYmVyZWRMaXN0SXRlbT4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ251bWJlcmVkX2xpc3RfaXRlbScgYXMgJ251bWJlcmVkX2xpc3RfaXRlbScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtTnVtYmVyZWRMaXN0SXRlbSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSwgZ2V0QmxvY2tJY29uIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtUGFnZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5QYWdlPiB7XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3BhZ2UnIGFzICdwYWdlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGl0bGU6IGdldEJsb2NrVGl0bGUobm9kZSlbMF0gPyBnZXRCbG9ja1RpdGxlKG5vZGUpWzBdWzBdIDogJycsXG4gICAgaWNvbjogZ2V0QmxvY2tJY29uKG5vZGUpLFxuICAgIGNvdmVyOiBmb3JtYXQucGFnZV9jb3ZlciB8fCB1bmRlZmluZWQsXG4gICAgZnVsbFdpZHRoOiB0eXBlb2YgZm9ybWF0LnBhZ2VfZnVsbF93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LnBhZ2VfZnVsbF93aWR0aCA6IGZhbHNlLFxuICAgIGNvdmVyUG9zaXRpb246IGZvcm1hdC5wYWdlX2NvdmVyX3Bvc2l0aW9uIHx8IDEsXG4gICAgcHJvcGVydGllczogbm9kZS5wcm9wZXJ0aWVzXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybVBhZ2UiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1RdW90ZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5RdW90ZT4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3F1b3RlJyBhcyAncXVvdGUnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybVF1b3RlIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtU3R1YihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5CbG9jaz4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogbm9kZS50eXBlLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1TdHViIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtVGV4dChcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5UZXh0PiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAndGV4dCcgYXMgJ3RleHQnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybVRleHQiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Ub0RvKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LlRvRG9MaXN0PiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAndG9fZG8nIGFzICd0b19kbycsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSksXG4gICAgY2hlY2tlZDogbm9kZS5wcm9wZXJ0aWVzXG4gICAgICA/IG5vZGUucHJvcGVydGllcy5jaGVja2VkXG4gICAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLmNoZWNrZWRbMF1bMF0gPT09ICdZZXMnXG4gICAgICAgIDogZmFsc2VcbiAgICAgIDogZmFsc2VcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtVG9EbyIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVRvZ2dsZUxpc3QoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuVG9nZ2xlTGlzdD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3RvZ2dsZScgYXMgJ3RvZ2dsZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtVG9nZ2xlTGlzdCIsImltcG9ydCB7IE5vdGlvbiB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuZnVuY3Rpb24gZ2V0QmxvY2tDb2xvcihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGxldCBjb2xvciA9IG5vZGUuZm9ybWF0XG4gICAgPyBub2RlLmZvcm1hdFsnYmxvY2tfY29sb3InXVxuICAgIDogdW5kZWZpbmVkXG4gIHJldHVybiBjb2xvclxufVxuXG5mdW5jdGlvbiBnZXRCbG9ja1RpdGxlKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogTm90aW9uLlN0eWxlZFN0cmluZ1tdIHtcbiAgbGV0IHRpdGxlID0gbm9kZS5wcm9wZXJ0aWVzXG4gICAgPyBub2RlLnByb3BlcnRpZXMudGl0bGVcbiAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlXG4gICAgICA6IFtdIGFzIE5vdGlvbi5TdHlsZWRTdHJpbmdbXVxuICAgIDogW10gYXMgTm90aW9uLlN0eWxlZFN0cmluZ1tdXG4gIHJldHVybiB0aXRsZVxufVxuXG5mdW5jdGlvbiBnZXRCbG9ja0ljb24oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBsZXQgaWNvbiA9IG5vZGUuZm9ybWF0XG4gICAgPyBub2RlLmZvcm1hdC5wYWdlX2ljb25cbiAgICA6IHVuZGVmaW5lZFxuICByZXR1cm4gaWNvblxufVxuXG5leHBvcnQge1xuICBnZXRCbG9ja0NvbG9yLFxuICBnZXRCbG9ja1RpdGxlLFxuICBnZXRCbG9ja0ljb25cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHsgbG9nLCBwYXJzZUpTT04gfVxuXG4vKipcbiAqIFdyYXBwZXIgb2YgY29uc29sZS5sb2coKS5cbiAqL1xuZnVuY3Rpb24gbG9nKCkge1xuICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICBhcmdzLnVuc2hpZnQoJyhuYXN0LXV0aWwtZnJvbS1ub3Rpb25hcGkpJylcbiAgY29uc29sZS5sb2cuYXBwbHkobnVsbCwgYXJncylcbn1cblxuLyoqXG4gKiBGYWlsc2FmZSBKU09OLnBhcnNlKCkgd3JhcHBlci5cbiAqIEBwYXJhbSB7Kn0gc3RyIC0gUGF5bG9hZCB0byBwYXJzZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFBhcnNlZCBvYmplY3Qgd2hlbiBzdWNjZXNzLCB1bmRlZmluZWQgd2hlbiBmYWlsLlxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04oc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB2b2lkIDBcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9