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
    codepen: 'codepen',
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
        case block_map_1.default.video:
        /** Codepen is Embed */
        case block_map_1.default.codepen:
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
        children: [],
        raw: node
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jsb2NrLW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybUJsb2NrLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQXVkaW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Cb29rbWFyay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1DYWxsb3V0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29kZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW5MaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRGl2aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUVtYmVkLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRXF1YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1IZWFkaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtUGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVF1b3RlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtU3R1Yi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub0RvLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVG9nZ2xlTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhc3NlcnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNB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QUEyQjtJQUMvQixPQUFPLEtBQUs7QUFDZCxDQUFDO0FBYUMsc0NBQWE7QUFYZixTQUFTLFlBQVksQ0FDbkIsSUFBdUI7SUFFdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztRQUN2QixDQUFDLENBQUMsU0FBUztJQUNiLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFLQyxvQ0FBWTs7Ozs7Ozs7Ozs7O0FDbENkLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ3RCQSxtQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiY29uc3QgbWFwID0ge1xuICBwYWdlOiAncGFnZScsXG4gIGhlYWRlcjogJ2hlYWRlcicsXG4gIHN1YkhlYWRlcjogJ3N1Yl9oZWFkZXInLFxuICBzdWJTdWJIZWFkZXI6ICdzdWJfc3ViX2hlYWRlcicsXG4gIHRvRG86ICd0b19kbycsXG4gIHRvZ2dsZTogJ3RvZ2dsZScsXG4gIGNvbHVtbkxpc3Q6ICdjb2x1bW5fbGlzdCcsXG4gIGNvbHVtbjogJ2NvbHVtbicsXG4gIGJ1bGxldGVkTGlzdDogJ2J1bGxldGVkX2xpc3QnLFxuICBudW1iZXJlZExpc3Q6ICdudW1iZXJlZF9saXN0JyxcbiAgdGV4dDogJ3RleHQnLFxuICBjb2RlOiAnY29kZScsXG4gIGVxdWF0aW9uOiAnZXF1YXRpb24nLFxuICBkaXZpZGVyOiAnZGl2aWRlcicsXG4gIHF1b3RlOiAncXVvdGUnLFxuICBjYWxsb3V0OiAnY2FsbG91dCcsXG4gIHRhYmxlT2ZDb250ZW50czogJ3RhYmxlX29mX2NvbnRlbnRzJyxcbiAgYnJlYWRjcnVtYjogJ2JyZWFkY3J1bWInLFxuICBpbWFnZTogJ2ltYWdlJyxcbiAgdmlkZW86ICd2aWRlbycsXG4gIGVtYmVkOiAnZW1iZWQnLFxuICBjb2RlcGVuOiAnY29kZXBlbicsXG4gIGF1ZGlvOiAnYXVkaW8nLFxuICBib29rbWFyazogJ2Jvb2ttYXJrJyxcbiAgY29sbGVjdGlvblZpZXc6ICdjb2xsZWN0aW9uX3ZpZXcnLFxuICBjb2xsZWN0aW9uVmlld1BhZ2U6ICdjb2xsZWN0aW9uX3ZpZXdfcGFnZScsXG4gIHVub3JkZXJlZExpc3Q6ICd1bm9yZGVyZWRfbGlzdCcsXG4gIG9yZGVyZWRMaXN0OiAnb3JkZXJlZF9saXN0J1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXAiLCJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcblxuaW1wb3J0IHsgdHJhbnNmb3JtQmxvY2sgfSBmcm9tICcuL3RyYW5zZm9ybUJsb2NrJ1xuXG5pbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi90eXBlcy9zcmMnXG5cbmFzeW5jIGZ1bmN0aW9uIGdldE9uZVBhZ2VBc1RyZWUoXG4gIHBhZ2VJZDogc3RyaW5nLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5hc3QuQmxvY2s+IHtcblxuICBsZXQgYWxsQmxvY2tzID0gYXdhaXQgZ2V0QWxsQmxvY2tzSW5PbmVQYWdlKHBhZ2VJZCwgYXBpQWdlbnQpXG4gIHJldHVybiBtYWtlQmxvY2tzQXJyYXlJbnRvVHJlZShhbGxCbG9ja3MsIGFwaUFnZW50KVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxCbG9ja3NJbk9uZVBhZ2UoXG4gIHBhZ2VJZDogc3RyaW5nLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10+IHtcblxuICBhc3NlcnQodHlwZW9mIHBhZ2VJZCA9PT0gJ3N0cmluZycpXG4gIGFzc2VydCh0eXBlb2YgYXBpQWdlbnQgPT09ICdvYmplY3QnKVxuICBhc3NlcnQodHlwZW9mIGFwaUFnZW50LmdldFJlY29yZFZhbHVlcyA9PT0gJ2Z1bmN0aW9uJylcbiAgYXNzZXJ0KHR5cGVvZiBhcGlBZ2VudC5xdWVyeUNvbGxlY3Rpb24gPT09ICdmdW5jdGlvbicpXG4gIGFzc2VydCh0eXBlb2YgYXBpQWdlbnQubG9hZFBhZ2VDaHVuayA9PT0gJ2Z1bmN0aW9uJylcblxuICAvKipcbiAgICogZ2V0Q2hpbGRyZW5CbG9ja3MoKSBkb2VzIG5vdCBkb3dubG9hZCBjaGlsZHJlbiBvZiBhIHBhZ2UsXG4gICAqIHNvIHdlIHNob3VsZCBnZXQgdGhlIHBhZ2UgZmlyc3QuXG4gICAqL1xuICBsZXQgcGFnZUJsb2NrUmVxdWVzdCA9IGdlbmVyYXRlR1JWUGF5bG9hZChbcGFnZUlkXSwgJ2Jsb2NrJylcbiAgbGV0IHBhZ2VCbG9ja1Jlc3BvbnNlOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZXNSZXNwb25zZSA9XG4gICAgYXdhaXQgYXBpQWdlbnQuZ2V0UmVjb3JkVmFsdWVzKHBhZ2VCbG9ja1JlcXVlc3QpXG4gIGlmIChwYWdlQmxvY2tSZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhwYWdlQmxvY2tSZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHBhZ2UgYmxvY2suJylcbiAgfVxuICBsZXQgcGFnZUJsb2NrID0gcGFnZUJsb2NrUmVzcG9uc2UuZGF0YS5yZXN1bHRzWzBdXG4gIGxldCBjaGlsZHJlbklkc09mUGFnZUJsb2NrID0gcGFnZUJsb2NrLnZhbHVlLmNvbnRlbnRcblxuICBsZXQgYWxsUmVjb3JkczogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXSA9IFtwYWdlQmxvY2tdXG4gIGlmIChjaGlsZHJlbklkc09mUGFnZUJsb2NrICE9IG51bGwpIHtcbiAgICAvKiBHZXQgYWxsIHJlY29yZHMgaW4gYSBmbGF0IGFycmF5LiAqL1xuICAgIGxldCBjaGlsZHJlbiA9XG4gICAgICBhd2FpdCBnZXRDaGlsZHJlbkJsb2NrcyhjaGlsZHJlbklkc09mUGFnZUJsb2NrLCBhcGlBZ2VudClcbiAgICBhbGxSZWNvcmRzID0gYWxsUmVjb3Jkcy5jb25jYXQoY2hpbGRyZW4pXG4gIH1cblxuICByZXR1cm4gYWxsUmVjb3Jkc1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIHJlcXVlc3QgcGF5bG9hZCBmb3IgZ2V0UmVjb3JkVmFsdWVzIEFQSS5cbiAqIEBwYXJhbSBpZHMgLSBOb3Rpb24gcmVjb3JkIElEIGFycmF5LlxuICogQHBhcmFtIHRhYmxlIC0gVGhlIHRhYmxlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMgVGhlIHBheWxvYWQuXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlR1JWUGF5bG9hZChcbiAgaWRzOiBzdHJpbmdbXSxcbiAgdGFibGU6IHN0cmluZ1xuKTogTm90aW9uLlJlY29yZFJlcXVlc3RbXSB7XG5cbiAgbGV0IHJlcXVlc3RzID0gaWRzLm1hcCgoaWQpOiBOb3Rpb24uUmVjb3JkUmVxdWVzdCA9PiB7XG4gICAgcmV0dXJuIHsgaWQsIHRhYmxlIH1cbiAgfSlcblxuICByZXR1cm4gcmVxdWVzdHNcbn1cblxuLyoqXG4gKiBHZXQgTm90aW9uLkJsb2NrUmVjb3JkVmFsdWUgb2YgSURzIGFuZCBkZXNjZW5kYW50cyBvZiBub24tcGFnZSBibG9ja3NcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q2hpbGRyZW5CbG9ja3MoXG4gIGJsb2NrSWRzOiBzdHJpbmdbXSxcbiAgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZVtdPiB7XG5cbiAgLyoqIEdldCBjaGlsZHJlbiByZWNvcmRzIHdpdGggZ2V0UmVjb3JkVmFsdWVzICovXG4gIGxldCByZXF1ZXN0cyA9IGdlbmVyYXRlR1JWUGF5bG9hZChibG9ja0lkcywgJ2Jsb2NrJylcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgYXBpQWdlbnQuZ2V0UmVjb3JkVmFsdWVzKHJlcXVlc3RzKVxuXG4gIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHJlY29yZHMuJylcbiAgfVxuXG4gIGxldCByZXNwb25zZURhdGEgPSByZXNwb25zZS5kYXRhXG4gIGxldCBjaGlsZHJlblJlY29yZHM6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10gPSByZXNwb25zZURhdGEucmVzdWx0c1xuICAvKipcbiAgICogRmlsdGVyIG91dCBcInBhZ2VcIiBibG9ja3MgYW5kIGVtcHR5IGJsb2Nrcy5cbiAgICogXG4gICAqIElmIHdlIGRvIG5vdCBmaWx0ZXIgb3V0IFwicGFnZVwiIGJsb2NrcywgY2hpbGRyZW4gb2YgXCJFbWJlZGRlZCBQYWdlXCIgYW5kIFxuICAgKiBcIkxpbmsgdG8gUGFnZVwiIHdpbGwgYmUgY29sbGVjdGVkLlxuICAgKi9cbiAgbGV0IGNoaWxkcmVuUmVjb3Jkc05vUGFnZSA9IHJlc3BvbnNlRGF0YS5yZXN1bHRzXG4gICAgLmZpbHRlcigocmVjb3JkOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgcmV0dXJuIHJlY29yZC5yb2xlICE9PSAnbm9uZScgJiYgcmVjb3JkLnZhbHVlLnR5cGUgIT09ICdwYWdlJ1xuICAgIH0pXG4gIGxldCBjaGlsZHJlbklEczogc3RyaW5nW10gPSBjb2xsZWN0Q2hpbGRyZW5JRHMoY2hpbGRyZW5SZWNvcmRzTm9QYWdlKVxuXG4gIC8qIElmIHRoZXJlJ3JlIHJlbWFpbmluZyBjaGlsZHJlbiwgZG93bmxvYWQgdGhlbS4gKi9cbiAgaWYgKGNoaWxkcmVuSURzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gY2hpbGRyZW5SZWNvcmRzLmNvbmNhdChcbiAgICAgIGF3YWl0IGdldENoaWxkcmVuQmxvY2tzKGNoaWxkcmVuSURzLCBhcGlBZ2VudCkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuUmVjb3Jkc1xuICB9XG5cbn1cblxuLyoqXG4gKiBDb2xsZWN0IGNoaWxkcmVuIElEcyBvZiBhbiByZWNvcmRzIGFycmF5LlxuICogQHBhcmFtIHJlY29yZHMgLSBUaGUgcmVjb3JkcyBhcnJheS5cbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIElEcy5cbiAqL1xuZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuSURzKFxuICByZWNvcmRzOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZVtdXG4pOiBzdHJpbmdbXSB7XG5cbiAgbGV0IGNoaWxkcmVuSURzOiBzdHJpbmdbXSA9IFtdXG5cbiAgcmVjb3Jkcy5mb3JFYWNoKChyZWNvcmQpOiB2b2lkID0+IHtcbiAgICBsZXQgX2NoaWxkcmVuSURzID0gW10gYXMgc3RyaW5nW11cblxuICAgIGlmIChyZWNvcmQudmFsdWUgIT0gbnVsbCAmJiByZWNvcmQudmFsdWUuY29udGVudCAhPSBudWxsKSB7XG4gICAgICBfY2hpbGRyZW5JRHMgPSByZWNvcmQudmFsdWUuY29udGVudFxuICAgIH1cblxuICAgIGlmIChfY2hpbGRyZW5JRHMpIHtcbiAgICAgIGNoaWxkcmVuSURzID0gY2hpbGRyZW5JRHMuY29uY2F0KF9jaGlsZHJlbklEcylcbiAgICB9XG5cbiAgfSlcblxuICByZXR1cm4gY2hpbGRyZW5JRHNcblxufVxuXG4vKipcbiAqIENvbnZlcnQgQmxvY2tSZWNvcmRWYWx1ZSBhcnJheSB0byBOQVNULlxuICogQHBhcmFtIGFsbFJlY29yZHMgLSBUaGUgQmxvY2tSZWNvcmRWYWx1ZSBhcnJheS5cbiAqIEByZXR1cm5zIE5BU1QuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG1ha2VCbG9ja3NBcnJheUludG9UcmVlKFxuICBhbGxSZWNvcmRzOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZVtdLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5hc3QuQmxvY2s+IHtcblxuICAvKiogUmVtb3ZlIGJsb2NrcyB3aXRoIHJvbGU6IG5vbmUgKi9cbiAgbGV0IG5vbkVtcHR5UmVjb3JkcyA9IGFsbFJlY29yZHNcbiAgICAuZmlsdGVyKChyZWNvcmQpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiByZWNvcmQucm9sZSAhPT0gJ25vbmUnXG4gICAgfSlcblxuICAvKiBUcmFuZm9ybSBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZSB0byBOYXN0LkJsb2NrICovXG4gIGxldCBuYXN0TGlzdCA9IGF3YWl0IFByb21pc2UuYWxsKG5vbkVtcHR5UmVjb3Jkc1xuICAgIC5tYXAoKHJlY29yZCk6IFByb21pc2U8TmFzdC5CbG9jaz4gPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUJsb2NrKHJlY29yZC52YWx1ZSwgYXBpQWdlbnQpXG4gICAgfSkpXG5cbiAgLyogQSBtYXAgZm9yIHF1aWNrIElEIC0+IGluZGV4IGxvb2t1cCAqL1xuICBsZXQgbWFwOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge31cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub25FbXB0eVJlY29yZHMubGVuZ3RoOyArK2kpIHtcbiAgICBtYXBbbm9uRW1wdHlSZWNvcmRzW2ldLnZhbHVlLmlkXSA9IGlcbiAgfVxuXG4gIC8qIFRoZSB0cmVlJ3Mgcm9vdCBpcyBhbHdheXMgdGhlIGZpcnN0IHJlY29yZCAqL1xuICBsZXQgdHJlZVJvb3QgPSBuYXN0TGlzdFswXVxuICBsZXQgbmFzdEJsb2NrXG5cbiAgLyoqXG4gICAqIFdpcmUgdXAgZWFjaCBibG9jaydzIGNoaWxkcmVuXG4gICAqIEl0ZXJhdGUgdGhyb3VnaCBibG9ja3MgYW5kIGdldCBjaGlsZHJlbiBJRHMgZnJvbSBcbiAgICogYG5vbkVtcHR5UmVjb3Jkc1tpXS52YWx1ZS5jb250ZW50YCwgdGhlbiBmaW5kIGVhY2ggY2hpbGQncyByZWZlcmVuY2UgXG4gICAqIGJ5IElEIHVzaW5nIGBtYXBgLlxuICAgKi9cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub25FbXB0eVJlY29yZHMubGVuZ3RoOyArK2kpIHtcbiAgICBuYXN0QmxvY2sgPSBuYXN0TGlzdFtpXVxuXG4gICAgbGV0IGNoaWxkcmVuSURzID0gbm9uRW1wdHlSZWNvcmRzW2ldLnZhbHVlLmNvbnRlbnRcbiAgICBpZiAoY2hpbGRyZW5JRHMgIT0gbnVsbCkge1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkcmVuSURzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGxldCBpbmRleE9mQ2hpbGRSZWZlcmVuY2UgPSBtYXBbY2hpbGRyZW5JRHNbal1dXG4gICAgICAgIGxldCBjaGlsZFJlZmVyZW5jZSA9IG5hc3RMaXN0W2luZGV4T2ZDaGlsZFJlZmVyZW5jZV1cblxuICAgICAgICBpZiAoY2hpbGRSZWZlcmVuY2UgIT0gbnVsbCkge1xuICAgICAgICAgIG5hc3RCbG9jay5jaGlsZHJlbi5wdXNoKGNoaWxkUmVmZXJlbmNlKVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJlZVJvb3RcblxufVxuXG5leHBvcnQge1xuICBnZXRPbmVQYWdlQXNUcmVlLFxuICBnZXRBbGxCbG9ja3NJbk9uZVBhZ2Vcbn0iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IHRyYW5zZm9ybUNvbGxlY3Rpb24gfSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2xsZWN0aW9uJ1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBibG9ja01hcCBmcm9tICcuL2Jsb2NrLW1hcCdcblxuaW1wb3J0IHRyYW5zZm9ybVBhZ2UgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtUGFnZSdcbmltcG9ydCB0cmFuc2Zvcm1TdHViIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVN0dWInXG5pbXBvcnQgdHJhbnNmb3JtVGV4dCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1UZXh0J1xuaW1wb3J0IHRyYW5zZm9ybVRvRG8gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVG9EbydcbmltcG9ydCB0cmFuc2Zvcm1IZWFkaW5nIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUhlYWRpbmcnXG5pbXBvcnQgdHJhbnNmb3JtQnVsbGV0ZWRMaXN0SXRlbSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1CdWxsZXRlZExpc3RJdGVtJ1xuaW1wb3J0IHRyYW5zZm9ybU51bWJlcmVkTGlzdEl0ZW0gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtTnVtYmVyZWRMaXN0SXRlbSdcbmltcG9ydCB0cmFuc2Zvcm1FbWJlZCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1FbWJlZCdcbmltcG9ydCB0cmFuc2Zvcm1JbWFnZSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1JbWFnZSdcbmltcG9ydCB0cmFuc2Zvcm1DYWxsb3V0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNhbGxvdXQnXG5pbXBvcnQgdHJhbnNmb3JtRGl2aWRlciBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1EaXZpZGVyJ1xuaW1wb3J0IHRyYW5zZm9ybVF1b3RlIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVF1b3RlJ1xuaW1wb3J0IHRyYW5zZm9ybVRvZ2dsZUxpc3QgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVG9nZ2xlTGlzdCdcbmltcG9ydCB0cmFuc2Zvcm1Db2x1bW4gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29sdW1uJ1xuaW1wb3J0IHRyYW5zZm9ybUNvbHVtbkxpc3QgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29sdW1uTGlzdCdcbmltcG9ydCB0cmFuc2Zvcm1FcXVhdGlvbiBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1FcXVhdGlvbidcbmltcG9ydCB0cmFuc2Zvcm1Db2RlIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvZGUnXG5pbXBvcnQgdHJhbnNmb3JtQXVkaW8gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQXVkaW8nXG5pbXBvcnQgdHJhbnNmb3JtQm9va21hcmsgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQm9va21hcmsnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUJsb2NrKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZSxcbiAgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOYXN0LkJsb2NrPiB7XG5cbiAgbGV0IG5hc3ROb2RlXG5cbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAvKiogTmFzdC5QYWdlICovXG4gICAgY2FzZSBibG9ja01hcC5wYWdlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVBhZ2Uobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkNvbGxlY3Rpb24gKi9cbiAgICBjYXNlIGJsb2NrTWFwLmNvbGxlY3Rpb25WaWV3OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvbGxlY3Rpb24obm9kZSwgYXBpQWdlbnQpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlIGJsb2NrTWFwLmNvbGxlY3Rpb25WaWV3UGFnZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2xsZWN0aW9uKG5vZGUsIGFwaUFnZW50KVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuVGV4dCAqL1xuICAgIGNhc2UgYmxvY2tNYXAudGV4dDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1UZXh0KG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Ub0RvTGlzdCAqL1xuICAgIGNhc2UgYmxvY2tNYXAudG9Ebzoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Ub0RvKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5IZWFkaW5nICovXG4gICAgY2FzZSBibG9ja01hcC5oZWFkZXI6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtSGVhZGluZyhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSBibG9ja01hcC5zdWJIZWFkZXI6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtSGVhZGluZyhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSBibG9ja01hcC5zdWJTdWJIZWFkZXI6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtSGVhZGluZyhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQnVsbGV0ZWRMaXN0SXRlbSAqL1xuICAgIGNhc2UgYmxvY2tNYXAuYnVsbGV0ZWRMaXN0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0Lk51bWJlcmVkTGlzdEl0ZW0gKi9cbiAgICBjYXNlIGJsb2NrTWFwLm51bWJlcmVkTGlzdDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Ub2dnbGVMaXN0ICovXG4gICAgY2FzZSBibG9ja01hcC50b2dnbGU6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtVG9nZ2xlTGlzdChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuUXVvdGUgKi9cbiAgICBjYXNlIGJsb2NrTWFwLnF1b3RlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVF1b3RlKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5EaXZpZGVyICovXG4gICAgY2FzZSBibG9ja01hcC5kaXZpZGVyOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybURpdmlkZXIobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkNhbGxvdXQgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmNhbGxvdXQ6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ2FsbG91dChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuSW1hZ2UgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmltYWdlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUltYWdlKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5WaWRlbyAqL1xuICAgIGNhc2UgYmxvY2tNYXAudmlkZW86IFxuICAgIC8qKiBDb2RlcGVuIGlzIEVtYmVkICovXG4gICAgY2FzZSBibG9ja01hcC5jb2RlcGVuOlxuICAgIC8qKiBOYXN0LkVtYmVkICovXG4gICAgY2FzZSBibG9ja01hcC5lbWJlZDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1FbWJlZChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQXVkaW8gKi9cbiAgICBjYXNlIGJsb2NrTWFwLmF1ZGlvOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUF1ZGlvKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5XZWJCb29rbWFyayAqL1xuICAgIGNhc2UgYmxvY2tNYXAuYm9va21hcms6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQm9va21hcmsobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkNvZGUgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmNvZGU6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ29kZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuRXF1YXRpb24gKi9cbiAgICBjYXNlIGJsb2NrTWFwLmVxdWF0aW9uOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUVxdWF0aW9uKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Db2x1bW5MaXN0ICovXG4gICAgY2FzZSBibG9ja01hcC5jb2x1bW5MaXN0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvbHVtbkxpc3Qobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkNvbHVtbiAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY29sdW1uOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvbHVtbihub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1TdHViKG5vZGUpXG4gICAgICBsb2coYFVuc3VwcG9ydGVkIGJsb2NrIHR5cGU6ICR7bm9kZS50eXBlfWApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hc3ROb2RlXG5cbn1cblxuZXhwb3J0IHtcbiAgdHJhbnNmb3JtQmxvY2tcbn0iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1BdWRpbyhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5BdWRpbz4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2F1ZGlvJyBhcyAnYXVkaW8nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBzb3VyY2U6IG5vZGUucHJvcGVydGllc1xuICAgICAgPyBub2RlLnByb3BlcnRpZXMuc291cmNlXG4gICAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnNvdXJjZVswXVswXVxuICAgICAgICA6ICcjJ1xuICAgICAgOiAnIydcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQXVkaW8iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Cb29rbWFyayhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5XZWJCb29rbWFyaz4ge1xuICBsZXQgcHJvcHMgPSBub2RlLnByb3BlcnRpZXMgfHwge31cbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnYm9va21hcmsnIGFzICdib29rbWFyaycsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGxpbms6IHByb3BzLmxpbmsgPyBwcm9wcy5saW5rWzBdWzBdIDogJyMnLFxuICAgIHRpdGxlOiBwcm9wcy50aXRsZSA/IHByb3BzLnRpdGxlWzBdWzBdIDogdW5kZWZpbmVkLFxuICAgIGRlc2NyaXB0aW9uOiBwcm9wcy5kZXNjcmlwdGlvbiA/IHByb3BzLmRlc2NyaXB0aW9uWzBdWzBdIDogdW5kZWZpbmVkLFxuICAgIGljb246IGZvcm1hdC5ib29rbWFya19pY29uLFxuICAgIGNvdmVyOiBmb3JtYXQuYm9va21hcmtfY292ZXIsXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUJvb2ttYXJrIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQnVsbGV0ZWRMaXN0SXRlbShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5CdWxsZXRlZExpc3RJdGVtPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnYnVsbGV0ZWRfbGlzdF9pdGVtJyBhcyAnYnVsbGV0ZWRfbGlzdF9pdGVtJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1CdWxsZXRlZExpc3RJdGVtIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlLCBnZXRCbG9ja0ljb24gfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1DYWxsb3V0KFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkNhbGxvdXQ+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdjYWxsb3V0JyBhcyAnY2FsbG91dCcsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGljb246IGdldEJsb2NrSWNvbihub2RlKSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUNhbGxvdXQiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Db2RlKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkNvZGU+IHtcbiAgbGV0IHByb3BzID0gbm9kZS5wcm9wZXJ0aWVzIHx8IHt9XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2NvZGUnIGFzICdjb2RlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKSxcbiAgICBsYW5ndWFnZTogcHJvcHMubGFuZ3VhZ2UgPyBwcm9wcy5sYW5ndWFnZVswXVswXSA6IHVuZGVmaW5lZCxcbiAgICB3cmFwOiB0eXBlb2YgZm9ybWF0LmNvZGVfd3JhcCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmNvZGVfd3JhcCA6IGZhbHNlXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUNvZGUiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB0cmFuc2Zvcm1QYWdlIGZyb20gJy4vdHJhbnNmb3JtUGFnZSdcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQ29sbGVjdGlvbihcbiAgY29sbGVjdGlvbkJsb2NrUmVjb3JkOiBOb3Rpb24uQmxvY2tWYWx1ZSxcbiAgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOYXN0LkNvbGxlY3Rpb24+IHtcblxuICAvKiogQmxvY2sgSUQgKi9cbiAgbGV0IGlkID0gY29sbGVjdGlvbkJsb2NrUmVjb3JkLmlkXG4gIC8qKiBDb2xsZWN0aW9uIFZpZXcgSURzICovXG4gIGxldCB2aWV3SWRzID0gY29sbGVjdGlvbkJsb2NrUmVjb3JkWyd2aWV3X2lkcyddIHx8IFtdXG4gIC8qKiBDb2xsZWN0aW9uIElEICovXG4gIGxldCBjb2xsZWN0aW9uSWQgPSBjb2xsZWN0aW9uQmxvY2tSZWNvcmRbJ2NvbGxlY3Rpb25faWQnXSB8fCAnJ1xuXG4gIGlmIChjb2xsZWN0aW9uSWQubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBCbG9jayAke2lkfSBoYXMgbm8gY29sbGVjdGlvbiBJRC5gKVxuICB9XG5cbiAgaWYgKHZpZXdJZHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBCbG9jayAke2lkfSAtIENvbGxlY3Rpb24gJHtjb2xsZWN0aW9uSWR9IGhhcyBubyB2aWV3LmApXG4gIH1cblxuICBsZXQgcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzID0gYXdhaXQgZ2V0Q29sbGVjdGlvblZpZXdSZWNvcmRzKHZpZXdJZHMsIGFwaUFnZW50KVxuXG4gIGxldCByYXdDb2xsZWN0aW9uUmVjb3JkID0gYXdhaXQgZ2V0Q29sbGVjdGlvblJlY29yZChjb2xsZWN0aW9uSWQsIGFwaUFnZW50KVxuICBsZXQgcmF3Q29sbGVjdGlvbiA9IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWVcblxuICAvKipcbiAgICogTWFrZSBxdWVyeSBtYXA6IGNvbGxlY3Rpb25WaWV3SWQgLT4gTm90aW9uLlF1ZXJ5IG9mIHRoZSB2aWV3XG4gICAqL1xuICBsZXQgcXVlcnlNYXA6IE1hcDxzdHJpbmcsIE5vdGlvbi5RdWVyeT4gPSBuZXcgTWFwKClcbiAgcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzLmZvckVhY2goKHJlY29yZDogTm90aW9uLkNvbGxlY3Rpb25WaWV3UmVjb3JkVmFsdWUpOiB2b2lkID0+IHtcbiAgICBsZXQgdmlld0lkID0gcmVjb3JkLnZhbHVlLmlkXG4gICAgbGV0IHF1ZXJ5ID0gcmVjb3JkLnZhbHVlLnF1ZXJ5XG4gICAgcXVlcnlNYXAuc2V0KHZpZXdJZCwgcXVlcnkpXG4gIH0pXG5cbiAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcyA9XG4gICAgYXdhaXQgZ2V0UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzKGNvbGxlY3Rpb25JZCwgcXVlcnlNYXAsIGFwaUFnZW50KVxuXG4gIC8qKiBUcmFuc2Zvcm0gdG8gTmFzdCAqL1xuICAvKiogXG4gICAqIENob29zZSBvbmUgb2YgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzIHRvIGdldCBibG9ja3MsIHNpbmNlIFxuICAgKiBvdXIgYGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbmAgaWdub3JlcyBgTm90aW9uLlF1ZXJ5LmZpbHRlcmAsIGFsbCBcbiAgICogcmVzcG9uc2VzIGluY2x1ZGVzIGFsbCBibG9ja3MuXG4gICAqL1xuICAvKiogXG4gICAqIGBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UucmVjb3JkTWFwLmJsb2NrYCBoYXMgYmxvY2tzIG5vdCBpbiB0aGUgXG4gICAqIGNvbGxlY3Rpb24sIGRvbid0IGtub3cgd2h5LlxuICAgKiBXZSBoYXZlIHRvIHVzZSBgTm90aW9uLlF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlc3VsdC5ibG9ja0lkc2BcbiAgICogdG8gc2VsZWN0IG9ubHkgdGhvc2Ugd2Ugd2FudC5cbiAgICovXG4gIC8qKlxuICAgKiBXZSB3b24ndCBnZXQgdW5kZWZpbmVkIGJlbG93IHNpbmNlIHZpZXdJZHMgZ3VhcmFudGVlIHRoZXJlIGFyZSB2aWV3cy5cbiAgICovXG4gIGxldCByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5nZXQodmlld0lkc1swXSlcbiAgaWYgKCFyYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlIGZvciAke3ZpZXdJZHNbMF19YClcblxuICBsZXQgYmxvY2tSZWNvcmRWYWx1ZU1hcCA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlY29yZE1hcC5ibG9ja1xuICBsZXQgcmVzdWx0QmxvY2tJZHMgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZXN1bHQuYmxvY2tJZHNcbiAgbGV0IG5hc3RDb2xsZWN0aW9uID0ge1xuICAgIC8qKiBUUyBjYW5ub3QgYXNzaWduIHN0cmluZyB0byAnY29sbGVjdGlvbicgKi9cbiAgICB0eXBlOiAnY29sbGVjdGlvbicgYXMgJ2NvbGxlY3Rpb24nLFxuICAgIGlkLFxuICAgIGNvbGxlY3Rpb25JZCxcbiAgICBjcmVhdGVkVGltZTogY29sbGVjdGlvbkJsb2NrUmVjb3JkLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogY29sbGVjdGlvbkJsb2NrUmVjb3JkLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgaWNvbjogcmF3Q29sbGVjdGlvbi5pY29uLFxuICAgIGNvdmVyOiByYXdDb2xsZWN0aW9uLmNvdmVyLFxuICAgIGRlc2NyaXB0aW9uOiByYXdDb2xsZWN0aW9uLmRlc2NyaXB0aW9uLFxuICAgIGNvdmVyUG9zaXRpb246IHJhd0NvbGxlY3Rpb24uZm9ybWF0XG4gICAgICA/IHJhd0NvbGxlY3Rpb24uZm9ybWF0LmNvbGxlY3Rpb25fY292ZXJfcG9zaXRpb24gfHwgMSA6IDEsXG4gICAgLyoqIE5hbWUgbWF5IGJlIHVuZGVmaW5lZCAqL1xuICAgIG5hbWU6IHJhd0NvbGxlY3Rpb24ubmFtZVxuICAgICAgPyByYXdDb2xsZWN0aW9uLm5hbWVbMF1bMF0gfHwgJ1VudGl0bGVkJ1xuICAgICAgOiAnVW50aXRsZWQnLFxuICAgIC8qKiBJbiBjYXNlIHNjaGVtYSBpcyB1bmRlZmluZWQgKi9cbiAgICBzY2hlbWE6IHJhd0NvbGxlY3Rpb24uc2NoZW1hIHx8IHt9LFxuICAgIC8qKiBibG9ja1JlY29yZFZhbHVlTWFwW3hdIGlzIE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlIChUaGUgb25lIHdpdGggcm9sZSkgKi9cbiAgICBibG9ja3M6IGF3YWl0IFByb21pc2UuYWxsKHJlc3VsdEJsb2NrSWRzXG4gICAgICAubWFwKChpZDogc3RyaW5nKTogUHJvbWlzZTxOYXN0LlBhZ2U+ID0+IHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVBhZ2UoYmxvY2tSZWNvcmRWYWx1ZU1hcFtpZF0udmFsdWUpXG4gICAgICB9KSksXG4gICAgLyoqIFVzZSB2aWV3SWQgdG8gYWNjZXNzIHJlY29yZCB2YWx1ZSBtYXBzLiAqL1xuICAgIHZpZXdzOiB2aWV3SWRzLm1hcCgodmlld0lkOiBzdHJpbmcpOiBOYXN0LkNvbGxlY3Rpb25WaWV3TWV0YWRhdGEgPT4ge1xuICAgICAgbGV0IHZpZXdSZWNvcmQgPSByYXdDb2xsZWN0aW9uVmlld1JlY29yZHNcbiAgICAgICAgLmZpbmQoKHZpZXcpOiBib29sZWFuID0+IHZpZXcudmFsdWUuaWQgPT09IHZpZXdJZClcbiAgICAgIGxldCB2aWV3OiBOb3Rpb24uQ29sbGVjdGlvblZpZXdWYWx1ZVxuICAgICAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzLmdldCh2aWV3SWQpXG4gICAgICBsZXQgYWdncmVnYXRpb25SZXN1bHRzOiBOb3Rpb24uQWdncmVnYXRpb25SZXN1bHRbXVxuXG4gICAgICAvKiogTm9ybWFsbHksIHRoZSBmb2xsb3dpbmcgdHdvIFwiaWZcIiBzaG91bGQgbm90IGhhcHBlbi4gKi9cbiAgICAgIGlmICh2aWV3UmVjb3JkKSB7XG4gICAgICAgIHZpZXcgPSB2aWV3UmVjb3JkLnZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZpZXcgJHt2aWV3SWR9IGRvZXMgbm90IGhhdmUgY29sbGVjdGlvbl92aWV3IHJlY29yZC5gKVxuICAgICAgfVxuXG4gICAgICBpZiAocmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UpIHtcbiAgICAgICAgYWdncmVnYXRpb25SZXN1bHRzID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UucmVzdWx0LmFnZ3JlZ2F0aW9uUmVzdWx0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWaWV3ICR7dmlld0lkfSBkb2VzIG5vdCBoYXZlIHF1ZXJ5Q29sbGVjdGlvbiByZXNwb25zZS5gKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogdmlld0lkLFxuICAgICAgICB0eXBlOiB2aWV3LnR5cGUsXG4gICAgICAgIG5hbWU6IHZpZXcubmFtZSxcbiAgICAgICAgcXVlcnk6IHZpZXcucXVlcnksXG4gICAgICAgIGZvcm1hdDogdmlldy5mb3JtYXQsXG4gICAgICAgIGFnZ3JlZ2F0ZTogKHZpZXcucXVlcnkuYWdncmVnYXRlIHx8IFtdKVxuICAgICAgICAgIC5tYXAoKHByb3ApOiBOYXN0LkFnZ3JlZ2F0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uUmVzdWx0ID0gYWdncmVnYXRpb25SZXN1bHRzXG4gICAgICAgICAgICAgIC5maW5kKChyZXMpOiBib29sZWFuID0+IHJlcy5pZCA9PT0gcHJvcC5pZClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uVHlwZTogcHJvcC5hZ2dyZWdhdGlvbl90eXBlLFxuICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcC5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgdmFsdWU6IGFnZ3JlZ2F0aW9uUmVzdWx0XG4gICAgICAgICAgICAgICAgPyBhZ2dyZWdhdGlvblJlc3VsdC52YWx1ZVxuICAgICAgICAgICAgICAgIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgfSksXG4gICAgZGVmYXVsdFZpZXdJZDogdmlld0lkc1swXSxcbiAgICBjaGlsZHJlbjogW11cbiAgfVxuXG4gIHJldHVybiBuYXN0Q29sbGVjdGlvblxuXG59XG5cbi8qKiBcbiAqIEdldCBjb2xsZWN0aW9uIHZpZXcgcmVjb3Jkc1xuICogXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBnZXQgTm90aW9uLlF1ZXJ5IG9iamVjdCxcbiAqIHdoaWNoIGNvbnRhaW5zIHNvcnQsIGFnZ3JlZ2F0ZSwgZmlsdGVyX29wZXJhdG9yIHRoYXQgYXJlIHVzZWQgdG8gZG9cbiAqIE5vdGlvbi5BZ2VudC5xdWVyeUNvbGxlY3Rpb24oKVxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uVmlld1JlY29yZHMoXG4gIHZpZXdJZHM6IHN0cmluZ1tdLCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5vdGlvbi5Db2xsZWN0aW9uVmlld1JlY29yZFZhbHVlW10+IHtcblxuICBsZXQgY29sbGVjdGlvblZpZXdSZXF1ZXN0cyA9IHZpZXdJZHMubWFwKCh2aWV3SWQ6IHN0cmluZyk6IE5vdGlvbi5SZWNvcmRSZXF1ZXN0ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHZpZXdJZCxcbiAgICAgIHRhYmxlOiAnY29sbGVjdGlvbl92aWV3J1xuICAgIH1cbiAgfSlcblxuICBsZXQgYXBpUmVzID0gYXdhaXQgYXBpQWdlbnQuZ2V0UmVjb3JkVmFsdWVzKGNvbGxlY3Rpb25WaWV3UmVxdWVzdHMpXG4gIGlmIChhcGlSZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgY29uc29sZS5sb2coYXBpUmVzKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzLicpXG4gIH1cblxuICBsZXQgcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzOiBOb3Rpb24uQ29sbGVjdGlvblZpZXdSZWNvcmRWYWx1ZVtdID1cbiAgICBhcGlSZXMuZGF0YS5yZXN1bHRzXG5cbiAgcmV0dXJuIHJhd0NvbGxlY3Rpb25WaWV3UmVjb3Jkc1xufVxuXG4vKiogXG4gKiBHZXQgY29sbGVjdGlvbiByZWNvcmRcbiAqIFxuICogT25lIGRhdGFiYXNlIG9ubHkgaGFzIG9uZSBjb2xsZWN0aW9uLlxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uUmVjb3JkKFxuICBjb2xsZWN0aW9uSWQ6IHN0cmluZywgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOb3Rpb24uQ29sbGVjdGlvblJlY29yZFZhbHVlPiB7XG5cbiAgbGV0IGNvbGxlY3Rpb25SZXF1ZXN0cyA9IFt7XG4gICAgaWQ6IGNvbGxlY3Rpb25JZCxcbiAgICB0YWJsZTogJ2NvbGxlY3Rpb24nXG4gIH1dXG4gIGxldCBhcGlSZXMgPSBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMoY29sbGVjdGlvblJlcXVlc3RzKVxuICBpZiAoYXBpUmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKGFwaVJlcylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IGNvbGxlY3Rpb25SZXNwb25zZXMuJylcbiAgfVxuICBsZXQgY29sbGVjdGlvblJlc3BvbnNlcyA9IGFwaVJlcy5kYXRhLnJlc3VsdHNcbiAgbGV0IHJhd0NvbGxlY3Rpb25SZWNvcmQ6IE5vdGlvbi5Db2xsZWN0aW9uUmVjb3JkVmFsdWUgPSBjb2xsZWN0aW9uUmVzcG9uc2VzWzBdXG5cbiAgcmV0dXJuIHJhd0NvbGxlY3Rpb25SZWNvcmRcbn1cblxuLyoqXG4gKiBRdWVyeSBhbGwgZW50cmllcyBpbiB0aGlzIGNvbGxlY3Rpb25cbiAqIFxuICogVG8gZ2V0IGFsbCBlbnRyaWVzLCB3ZSBtdXN0IG5vdCBmaWx0ZXIgYW55IGVudHJpZXMsIHRoaXMgbWVhbnNcbiAqIE5vdGlvbi5RdWVyeS5maWx0ZXIgc2hvdWxkIGJlIGVtcHR5LiBMdWNraWx5LCBjdXJyZW50IE5vdGlvbi5BZ2VudCBcbiAqIHNldCB0aGF0IGVtcHR5IGJ5IGRlZmF1bHQuXG4gKiBcbiAqIFRoZSBxdWVyeUNvbGxlY3Rpb24gQVBJIGNhbiBiZSB1c2VkIHRvIHF1ZXJ5IG9uZSBjb2xsZWN0aW9uX3ZpZXcgYXRcbiAqIHRoZSBzYW1lIHRpbWUsIHRob3VnaCB3ZSBoYXZlIHF1ZXJpZWQgYWxsIGNvbGxlY3Rpb24gdmlld3MgcHJldmlvdXNseSwgXG4gKiB3ZSBzdGlsbCBuZWVkIHRvIHF1ZXJ5IHRoZSBhZ2dyZWdhdGlvblJlc3VsdHMgZm9yIHRob3NlIGNvbGxlY3Rpb25cbiAqIHZpZXdzLlxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXMoXG4gIGNvbGxlY3Rpb25JZDogc3RyaW5nLCBxdWVyeU1hcDogTWFwPHN0cmluZywgTm90aW9uLlF1ZXJ5PiwgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2U+PiB7XG5cbiAgaW50ZXJmYWNlIFJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3Qge1xuICAgIGNvbGxlY3Rpb25JZDogc3RyaW5nXG4gICAgY29sbGVjdGlvblZpZXdJZDogc3RyaW5nXG4gICAgYWdncmVnYXRlUXVlcmllczogTm90aW9uLkFnZ3JlZ2F0ZVF1ZXJ5W11cbiAgfVxuXG4gIC8qKiBNYWtlIHJlcXVlc3Qgb2JqZWN0cy4gKi9cbiAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3RzOiBSYXdRdWVyeUNvbGxlY3Rpb25SZXF1ZXN0W10gPSBbXVxuICBxdWVyeU1hcC5mb3JFYWNoKChxdWVyeSwgdmlld0lkKTogdm9pZCA9PiB7XG4gICAgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHMucHVzaCh7XG4gICAgICBjb2xsZWN0aW9uSWQsXG4gICAgICBjb2xsZWN0aW9uVmlld0lkOiB2aWV3SWQsXG4gICAgICBhZ2dyZWdhdGVRdWVyaWVzOiBxdWVyeS5hZ2dyZWdhdGUgfHwgW11cbiAgICB9KVxuICB9KVxuXG4gIC8qKiBEbyBxdWVyaWVzIGFuZCByZWNlaXZlIHJlc3BvbnNlcy4gKi9cbiAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlczogTWFwPHN0cmluZywgTm90aW9uLlF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlPiA9IG5ldyBNYXAoKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IHJlcSA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3RzW2ldXG4gICAgbGV0IHJlcyA9XG4gICAgICBhd2FpdCBhcGlBZ2VudC5xdWVyeUNvbGxlY3Rpb24oXG4gICAgICAgIHJlcS5jb2xsZWN0aW9uSWQsXG4gICAgICAgIHJlcS5jb2xsZWN0aW9uVmlld0lkLFxuICAgICAgICByZXEuYWdncmVnYXRlUXVlcmllcylcbiAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsIHRvIGdldCByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS4nKVxuICAgIH1cbiAgICByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXMuc2V0KHJlcS5jb2xsZWN0aW9uVmlld0lkLCByZXMuZGF0YSlcbiAgfVxuXG4gIHJldHVybiByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXNcbn1cblxuZXhwb3J0IHtcbiAgdHJhbnNmb3JtQ29sbGVjdGlvbixcbiAgZ2V0Q29sbGVjdGlvblZpZXdSZWNvcmRzLFxuICBnZXRDb2xsZWN0aW9uUmVjb3JkLFxuICBnZXRRdWVyeUNvbGxlY3Rpb25SZXNwb25zZXNcbn0iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Db2x1bW4oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ29sdW1uPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY29sdW1uJyBhcyAnY29sdW1uJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgcmF0aW86IG5vZGUuZm9ybWF0XG4gICAgICA/IG5vZGUuZm9ybWF0LmNvbHVtbl9yYXRpb1xuICAgICAgICA/IG5vZGUuZm9ybWF0LmNvbHVtbl9yYXRpb1xuICAgICAgICA6IDFcbiAgICAgIDogMVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Db2x1bW4iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Db2x1bW5MaXN0KFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkNvbHVtbkxpc3Q+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdjb2x1bW5fbGlzdCcgYXMgJ2NvbHVtbl9saXN0JyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW11cbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQ29sdW1uTGlzdCIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybURpdmlkZXIoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuRGl2aWRlcj4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2RpdmlkZXInIGFzICdkaXZpZGVyJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW11cbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtRGl2aWRlciIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUVtYmVkKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkVtYmVkPiB7XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogbm9kZS50eXBlID09PSAndmlkZW8nXG4gICAgICA/ICd2aWRlbycgYXMgJ3ZpZGVvJyA6ICdlbWJlZCcgYXMgJ2VtYmVkJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgd2lkdGg6IGZvcm1hdC5ibG9ja193aWR0aCB8fCA5OTk5LFxuICAgIHNvdXJjZTogZm9ybWF0LmRpc3BsYXlfc291cmNlIHx8ICcjJyxcbiAgICBmdWxsV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfZnVsbF93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX2Z1bGxfd2lkdGggOiBmYWxzZSxcbiAgICBwYWdlV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfcGFnZV93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggOiBmYWxzZSxcbiAgICBhc3BlY3RSYXRpbzogZm9ybWF0LmJsb2NrX2FzcGVjdF9yYXRpbyB8fCAwLjU2MiwgLy8gMTY6OVxuICAgIHByZXNlcnZlU2NhbGU6IHR5cGVvZiBmb3JtYXQuYmxvY2tfcHJlc2VydmVfc2NhbGUgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGZvcm1hdC5ibG9ja19wcmVzZXJ2ZV9zY2FsZSA6IHRydWVcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtRW1iZWQiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1FcXVhdGlvbihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5FcXVhdGlvbj4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2VxdWF0aW9uJyBhcyAnZXF1YXRpb24nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBsYXRleDogbm9kZS5wcm9wZXJ0aWVzXG4gICAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVxuICAgICAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVswXVswXVxuICAgICAgICA6ICcnXG4gICAgICA6ICcnXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUVxdWF0aW9uIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBibG9ja01hcCBmcm9tICcuLi9ibG9jay1tYXAnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUhlYWRpbmcoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuSGVhZGluZz4ge1xuICBsZXQgZGVwdGhcbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlIGJsb2NrTWFwLmhlYWRlcjpcbiAgICAgIGRlcHRoID0gMVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJsb2NrTWFwLnN1YkhlYWRlcjpcbiAgICAgIGRlcHRoID0gMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgZGVwdGggPSAzXG4gIH1cblxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2hlYWRpbmcnIGFzICdoZWFkaW5nJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKSxcbiAgICBkZXB0aFxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1IZWFkaW5nIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtSW1hZ2UoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuSW1hZ2U+IHtcbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnaW1hZ2UnIGFzICdpbWFnZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHdpZHRoOiBmb3JtYXQuYmxvY2tfd2lkdGggfHwgOTk5OSxcbiAgICBzb3VyY2U6IGZvcm1hdC5kaXNwbGF5X3NvdXJjZSB8fCAnIycsXG4gICAgZnVsbFdpZHRoOiB0eXBlb2YgZm9ybWF0LmJsb2NrX2Z1bGxfd2lkdGggIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGZvcm1hdC5ibG9ja19mdWxsX3dpZHRoIDogZmFsc2UsXG4gICAgcGFnZVdpZHRoOiB0eXBlb2YgZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGZvcm1hdC5ibG9ja19wYWdlX3dpZHRoIDogZmFsc2VcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtSW1hZ2UiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0Lk51bWJlcmVkTGlzdEl0ZW0+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdudW1iZXJlZF9saXN0X2l0ZW0nIGFzICdudW1iZXJlZF9saXN0X2l0ZW0nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybU51bWJlcmVkTGlzdEl0ZW0iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUsIGdldEJsb2NrSWNvbiB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVBhZ2UoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuUGFnZT4ge1xuICBsZXQgZm9ybWF0ID0gbm9kZS5mb3JtYXQgfHwge31cbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdwYWdlJyBhcyAncGFnZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRpdGxlOiBnZXRCbG9ja1RpdGxlKG5vZGUpWzBdID8gZ2V0QmxvY2tUaXRsZShub2RlKVswXVswXSA6ICcnLFxuICAgIGljb246IGdldEJsb2NrSWNvbihub2RlKSxcbiAgICBjb3ZlcjogZm9ybWF0LnBhZ2VfY292ZXIgfHwgdW5kZWZpbmVkLFxuICAgIGZ1bGxXaWR0aDogdHlwZW9mIGZvcm1hdC5wYWdlX2Z1bGxfd2lkdGggIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGZvcm1hdC5wYWdlX2Z1bGxfd2lkdGggOiBmYWxzZSxcbiAgICBjb3ZlclBvc2l0aW9uOiBmb3JtYXQucGFnZV9jb3Zlcl9wb3NpdGlvbiB8fCAxLFxuICAgIHByb3BlcnRpZXM6IG5vZGUucHJvcGVydGllc1xuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1QYWdlIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtUXVvdGUoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuUXVvdGU+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdxdW90ZScgYXMgJ3F1b3RlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1RdW90ZSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVN0dWIoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuU3R1Yj4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogbm9kZS50eXBlLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICByYXc6IG5vZGVcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtU3R1YiIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVRleHQoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuVGV4dD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3RleHQnIGFzICd0ZXh0JyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1UZXh0IiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtVG9EbyhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5Ub0RvTGlzdD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3RvX2RvJyBhcyAndG9fZG8nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpLFxuICAgIGNoZWNrZWQ6IG5vZGUucHJvcGVydGllc1xuICAgICAgPyBub2RlLnByb3BlcnRpZXMuY2hlY2tlZFxuICAgICAgICA/IG5vZGUucHJvcGVydGllcy5jaGVja2VkWzBdWzBdID09PSAnWWVzJ1xuICAgICAgICA6IGZhbHNlXG4gICAgICA6IGZhbHNlXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybVRvRG8iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Ub2dnbGVMaXN0KFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LlRvZ2dsZUxpc3Q+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICd0b2dnbGUnIGFzICd0b2dnbGUnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybVRvZ2dsZUxpc3QiLCJpbXBvcnQgeyBOb3Rpb24gfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmZ1bmN0aW9uIGdldEJsb2NrQ29sb3IoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBsZXQgY29sb3IgPSBub2RlLmZvcm1hdFxuICAgID8gbm9kZS5mb3JtYXRbJ2Jsb2NrX2NvbG9yJ11cbiAgICA6IHVuZGVmaW5lZFxuICByZXR1cm4gY29sb3Jcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tUaXRsZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IE5vdGlvbi5TdHlsZWRTdHJpbmdbXSB7XG4gIGxldCB0aXRsZSA9IG5vZGUucHJvcGVydGllc1xuICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlXG4gICAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVxuICAgICAgOiBbXSBhcyBOb3Rpb24uU3R5bGVkU3RyaW5nW11cbiAgICA6IFtdIGFzIE5vdGlvbi5TdHlsZWRTdHJpbmdbXVxuICByZXR1cm4gdGl0bGVcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tJY29uKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgbGV0IGljb24gPSBub2RlLmZvcm1hdFxuICAgID8gbm9kZS5mb3JtYXQucGFnZV9pY29uXG4gICAgOiB1bmRlZmluZWRcbiAgcmV0dXJuIGljb25cbn1cblxuZXhwb3J0IHtcbiAgZ2V0QmxvY2tDb2xvcixcbiAgZ2V0QmxvY2tUaXRsZSxcbiAgZ2V0QmxvY2tJY29uXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7IGxvZywgcGFyc2VKU09OIH1cblxuLyoqXG4gKiBXcmFwcGVyIG9mIGNvbnNvbGUubG9nKCkuXG4gKi9cbmZ1bmN0aW9uIGxvZygpIHtcbiAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgYXJncy51bnNoaWZ0KCcobmFzdC11dGlsLWZyb20tbm90aW9uYXBpKScpXG4gIGNvbnNvbGUubG9nLmFwcGx5KG51bGwsIGFyZ3MpXG59XG5cbi8qKlxuICogRmFpbHNhZmUgSlNPTi5wYXJzZSgpIHdyYXBwZXIuXG4gKiBAcGFyYW0geyp9IHN0ciAtIFBheWxvYWQgdG8gcGFyc2UuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYXJzZWQgb2JqZWN0IHdoZW4gc3VjY2VzcywgdW5kZWZpbmVkIHdoZW4gZmFpbC5cbiAqL1xuZnVuY3Rpb24gcGFyc2VKU09OKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN0cilcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdm9pZCAwXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3NlcnRcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==