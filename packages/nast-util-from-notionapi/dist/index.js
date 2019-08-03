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

/***/ "./src/block-map.js":
/*!**************************!*\
  !*** ./src/block-map.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
}

/* harmony default export */ __webpack_exports__["default"] = (map);

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
async function getPageTreeById(rootID, agent) {
    assert_1.default(typeof rootID === 'string');
    assert_1.default(typeof agent === 'object');
    assert_1.default(typeof agent.getRecordValues === 'function');
    assert_1.default(typeof agent.queryCollection === 'function');
    const api = agent;
    /**
     * getChildrenRecords() does not download children of a page,
     * so we should get the page first.
     */
    let pageBlockRequest = makeRecordRequests([rootID], 'block');
    let pageBlockResponse = await api.getRecordValues(pageBlockRequest);
    if (pageBlockResponse.statusCode !== 200) {
        console.log(pageBlockResponse);
        throw new Error('Fail to get page block.');
    }
    let pageBlock = pageBlockResponse.data.results[0];
    let childrenIdsOfPageBlock = pageBlock.value.content;
    let allRecords = [pageBlock];
    if (childrenIdsOfPageBlock != null) {
        /* Get all records in a flat array. */
        let children = await getChildrenRecords(childrenIdsOfPageBlock, api);
        allRecords = allRecords.concat(children);
    }
    if (allRecords != null)
        return makeTree(allRecords, api);
    else
        throw new Error('Cannot make tree, no records');
    //return { records: allRecords }
}
exports.getPageTreeById = getPageTreeById;
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
 * Get Notion.BlockRecordValue of IDs and descendants of non-page blocks
 */
async function getChildrenRecords(blockIds, apiAgent) {
    let requests = makeRecordRequests(blockIds, 'block');
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
        return childrenRecords.concat(await getChildrenRecords(childrenIDs, apiAgent));
    }
    else {
        return childrenRecords;
    }
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
const block_map_1 = __importDefault(__webpack_require__(/*! ./block-map */ "./src/block-map.js"));
const transformPage_1 = __importDefault(__webpack_require__(/*! ./transformers/transformPage */ "./src/transformers/transformPage.ts"));
const transformStub_1 = __importDefault(__webpack_require__(/*! ./transformers/transformStub */ "./src/transformers/transformStub.ts"));
const transformText_1 = __importDefault(__webpack_require__(/*! ./transformers/transformText */ "./src/transformers/transformText.ts"));
const transformToDo_1 = __importDefault(__webpack_require__(/*! ./transformers/transformToDo */ "./src/transformers/transformToDo.ts"));
const transformHeading_1 = __importDefault(__webpack_require__(/*! ./transformers/transformHeading */ "./src/transformers/transformHeading.ts"));
const transformBulletedList_1 = __importDefault(__webpack_require__(/*! ./transformers/transformBulletedList */ "./src/transformers/transformBulletedList.ts"));
const transformNumberedList_1 = __importDefault(__webpack_require__(/*! ./transformers/transformNumberedList */ "./src/transformers/transformNumberedList.ts"));
const transformEmbed_1 = __importDefault(__webpack_require__(/*! ./transformers/transformEmbed */ "./src/transformers/transformEmbed.ts"));
const transformImage_1 = __importDefault(__webpack_require__(/*! ./transformers/transformImage */ "./src/transformers/transformImage.ts"));
const transformCallout_1 = __importDefault(__webpack_require__(/*! ./transformers/transformCallout */ "./src/transformers/transformCallout.ts"));
const transformDivider_1 = __importDefault(__webpack_require__(/*! ./transformers/transformDivider */ "./src/transformers/transformDivider.ts"));
const transformQuote_1 = __importDefault(__webpack_require__(/*! ./transformers/transformQuote */ "./src/transformers/transformQuote.ts"));
const transformToggleList_1 = __importDefault(__webpack_require__(/*! ./transformers/transformToggleList */ "./src/transformers/transformToggleList.ts"));
const transformColumn_1 = __importDefault(__webpack_require__(/*! ./transformers/transformColumn */ "./src/transformers/transformColumn.ts"));
const transformColumnList_1 = __importDefault(__webpack_require__(/*! ./transformers/transformColumnList */ "./src/transformers/transformColumnList.ts"));
const transformMath_1 = __importDefault(__webpack_require__(/*! ./transformers/transformMath */ "./src/transformers/transformMath.ts"));
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
        /** Nast.BulletedList */
        case block_map_1.default.bulletedList: {
            nastNode = transformBulletedList_1.default(node);
            break;
        }
        /** Nast.NumberedList */
        case block_map_1.default.numberedList: {
            nastNode = transformNumberedList_1.default(node);
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
        /** Nast.MathEquation */
        case block_map_1.default.equation: {
            nastNode = transformMath_1.default(node);
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

/***/ "./src/transformers/transformBulletedList.ts":
/*!***************************************************!*\
  !*** ./src/transformers/transformBulletedList.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformBulletedList(node) {
    let nastNode = {
        id: node.id,
        type: 'bulleted_list',
        color: utils_1.getBlockColor(node),
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformBulletedList;


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

Object.defineProperty(exports, "__esModule", { value: true });
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
        blocks: resultBlockIds.map((id) => {
            return blockRecordValueMap[id].value;
        }),
        /** Use viewId to access record value maps. */
        views: viewIds.map((viewId) => {
            let viewRecord = rawCollectionViewRecords
                .find((view) => view.value.id === viewId);
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
const block_map_1 = __importDefault(__webpack_require__(/*! ../block-map */ "./src/block-map.js"));
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

/***/ "./src/transformers/transformMath.ts":
/*!*******************************************!*\
  !*** ./src/transformers/transformMath.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformMath(node) {
    let nastNode = {
        id: node.id,
        type: 'equation',
        color: utils_1.getBlockColor(node),
        children: [],
        latex: node.properties
            ? node.properties.title
                ? node.properties.title[0][0]
                : ''
            : ''
    };
    return nastNode;
}
exports.default = transformMath;


/***/ }),

/***/ "./src/transformers/transformNumberedList.ts":
/*!***************************************************!*\
  !*** ./src/transformers/transformNumberedList.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./src/transformers/utils.ts");
async function transformNumberedList(node) {
    let nastNode = {
        id: node.id,
        type: 'numbered_list',
        color: utils_1.getBlockColor(node),
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformNumberedList;


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
    let nastNode = {
        id: node.id,
        type: 'page',
        color: utils_1.getBlockColor(node),
        children: [],
        title: utils_1.getBlockTitle(node)[0][0],
        icon: utils_1.getBlockIcon(node),
        cover: node.format
            ? node.format.page_cover
            : undefined,
        fullWidth: node.format
            ? node.format.page_full_width
            : false,
        coverPosition: node.format
            ? node.format.page_cover_position
            : 1
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
// import * as Nast from '../types/nast'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jsb2NrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybUJsb2NrLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQXVkaW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Cb29rbWFyay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUJ1bGxldGVkTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNhbGxvdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2RlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbHVtbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbHVtbkxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1EaXZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRW1iZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1IZWFkaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1NYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtTnVtYmVyZWRMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtUGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVF1b3RlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtU3R1Yi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub0RvLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVG9nZ2xlTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhc3NlcnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7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LFNBQVMsYUFBYSxDQUNwQixJQUF1QjtJQUV2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTtRQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQyxDQUFDLFNBQVM7SUFDYixPQUFPLEtBQUs7QUFDZCxDQUFDO0FBdUJDLHNDQUFhO0FBckJmLFNBQVMsYUFBYSxDQUNwQixJQUF1QjtJQUV2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVTtRQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDdkIsQ0FBQyxDQUFDLEVBQTJCO1FBQy9CLENBQUMsQ0FBQyxFQUEyQjtJQUMvQixPQUFPLEtBQUs7QUFDZCxDQUFDO0FBYUMsc0NBQWE7QUFYZixTQUFTLFlBQVksQ0FDbkIsSUFBdUI7SUFFdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztRQUN2QixDQUFDLENBQUMsU0FBUztJQUNiLE9BQU8sSUFBSTtBQUNiLENBQUM7QUFLQyxvQ0FBWTs7Ozs7Ozs7Ozs7O0FDbkNkLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ3RCQSxtQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiY29uc3QgbWFwID0ge1xuICBwYWdlOiAncGFnZScsXG4gIGhlYWRlcjogJ2hlYWRlcicsXG4gIHN1YkhlYWRlcjogJ3N1Yl9oZWFkZXInLFxuICBzdWJTdWJIZWFkZXI6ICdzdWJfc3ViX2hlYWRlcicsXG4gIHRvRG86ICd0b19kbycsXG4gIHRvZ2dsZTogJ3RvZ2dsZScsXG4gIGNvbHVtbkxpc3Q6ICdjb2x1bW5fbGlzdCcsXG4gIGNvbHVtbjogJ2NvbHVtbicsXG4gIGJ1bGxldGVkTGlzdDogJ2J1bGxldGVkX2xpc3QnLFxuICBudW1iZXJlZExpc3Q6ICdudW1iZXJlZF9saXN0JyxcbiAgdGV4dDogJ3RleHQnLFxuICBjb2RlOiAnY29kZScsXG4gIGVxdWF0aW9uOiAnZXF1YXRpb24nLFxuICBkaXZpZGVyOiAnZGl2aWRlcicsXG4gIHF1b3RlOiAncXVvdGUnLFxuICBjYWxsb3V0OiAnY2FsbG91dCcsXG4gIHRhYmxlT2ZDb250ZW50czogJ3RhYmxlX29mX2NvbnRlbnRzJyxcbiAgYnJlYWRjcnVtYjogJ2JyZWFkY3J1bWInLFxuICBpbWFnZTogJ2ltYWdlJyxcbiAgdmlkZW86ICd2aWRlbycsXG4gIGVtYmVkOiAnZW1iZWQnLFxuICBhdWRpbzogJ2F1ZGlvJyxcbiAgYm9va21hcms6ICdib29rbWFyaycsXG4gIGNvbGxlY3Rpb25WaWV3OiAnY29sbGVjdGlvbl92aWV3JyxcbiAgY29sbGVjdGlvblZpZXdQYWdlOiAnY29sbGVjdGlvbl92aWV3X3BhZ2UnLFxuICB1bm9yZGVyZWRMaXN0OiAndW5vcmRlcmVkX2xpc3QnLFxuICBvcmRlcmVkTGlzdDogJ29yZGVyZWRfbGlzdCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnXG5cbmltcG9ydCB7IHRyYW5zZm9ybUJsb2NrIH0gZnJvbSAnLi90cmFuc2Zvcm1CbG9jaydcblxuaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuL3R5cGVzL25hc3QnXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBhZ2VUcmVlQnlJZChcbiAgcm9vdElEOiBzdHJpbmcsXG4gIGFnZW50OiBOb3Rpb24uQWdlbnQpOiBQcm9taXNlPE5hc3QuQmxvY2s+IHtcblxuICBhc3NlcnQodHlwZW9mIHJvb3RJRCA9PT0gJ3N0cmluZycpXG4gIGFzc2VydCh0eXBlb2YgYWdlbnQgPT09ICdvYmplY3QnKVxuICBhc3NlcnQodHlwZW9mIGFnZW50LmdldFJlY29yZFZhbHVlcyA9PT0gJ2Z1bmN0aW9uJylcbiAgYXNzZXJ0KHR5cGVvZiBhZ2VudC5xdWVyeUNvbGxlY3Rpb24gPT09ICdmdW5jdGlvbicpXG5cbiAgY29uc3QgYXBpID0gYWdlbnRcblxuICAvKipcbiAgICogZ2V0Q2hpbGRyZW5SZWNvcmRzKCkgZG9lcyBub3QgZG93bmxvYWQgY2hpbGRyZW4gb2YgYSBwYWdlLFxuICAgKiBzbyB3ZSBzaG91bGQgZ2V0IHRoZSBwYWdlIGZpcnN0LlxuICAgKi9cbiAgbGV0IHBhZ2VCbG9ja1JlcXVlc3QgPSBtYWtlUmVjb3JkUmVxdWVzdHMoW3Jvb3RJRF0sICdibG9jaycpXG4gIGxldCBwYWdlQmxvY2tSZXNwb25zZTogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVzUmVzcG9uc2UgPVxuICAgIGF3YWl0IGFwaS5nZXRSZWNvcmRWYWx1ZXMocGFnZUJsb2NrUmVxdWVzdClcbiAgaWYgKHBhZ2VCbG9ja1Jlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKHBhZ2VCbG9ja1Jlc3BvbnNlKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgcGFnZSBibG9jay4nKVxuICB9XG4gIGxldCBwYWdlQmxvY2sgPSBwYWdlQmxvY2tSZXNwb25zZS5kYXRhLnJlc3VsdHNbMF1cbiAgbGV0IGNoaWxkcmVuSWRzT2ZQYWdlQmxvY2sgPSBwYWdlQmxvY2sudmFsdWUuY29udGVudFxuXG4gIGxldCBhbGxSZWNvcmRzOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZVtdID0gW3BhZ2VCbG9ja11cbiAgaWYgKGNoaWxkcmVuSWRzT2ZQYWdlQmxvY2sgIT0gbnVsbCkge1xuICAgIC8qIEdldCBhbGwgcmVjb3JkcyBpbiBhIGZsYXQgYXJyYXkuICovXG4gICAgbGV0IGNoaWxkcmVuID0gYXdhaXQgZ2V0Q2hpbGRyZW5SZWNvcmRzKGNoaWxkcmVuSWRzT2ZQYWdlQmxvY2ssIGFwaSlcbiAgICBhbGxSZWNvcmRzID0gYWxsUmVjb3Jkcy5jb25jYXQoY2hpbGRyZW4pXG4gIH1cblxuICBpZiAoYWxsUmVjb3JkcyAhPSBudWxsKVxuICAgIHJldHVybiBtYWtlVHJlZShhbGxSZWNvcmRzLCBhcGkpXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBtYWtlIHRyZWUsIG5vIHJlY29yZHMnKVxuICAvL3JldHVybiB7IHJlY29yZHM6IGFsbFJlY29yZHMgfVxuXG59XG5cbi8qKlxuICogTWFrZSByZXF1ZXN0IHBheWxvYWQgZm9yIGdldFJlY29yZFZhbHVlcyBBUEkuXG4gKiBAcGFyYW0gaWRzIC0gTm90aW9uIHJlY29yZCBJRCBhcnJheS5cbiAqIEBwYXJhbSB0YWJsZSAtIFRoZSB0YWJsZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIFRoZSBwYXlsb2FkLlxuICovXG5mdW5jdGlvbiBtYWtlUmVjb3JkUmVxdWVzdHMoaWRzOiBzdHJpbmdbXSwgdGFibGU6IHN0cmluZyk6IE5vdGlvbi5SZWNvcmRSZXF1ZXN0W10ge1xuXG4gIGxldCByZXF1ZXN0cyA9IGlkcy5tYXAoKGlkKTogTm90aW9uLlJlY29yZFJlcXVlc3QgPT4ge1xuICAgIHJldHVybiB7IGlkLCB0YWJsZSB9XG4gIH0pXG5cbiAgcmV0dXJuIHJlcXVlc3RzXG5cbn1cblxuLyoqXG4gKiBDb2xsZWN0IGNoaWxkcmVuIElEcyBvZiBhbiByZWNvcmRzIGFycmF5LlxuICogQHBhcmFtIHJlY29yZHMgLSBUaGUgcmVjb3JkcyBhcnJheS5cbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIElEcy5cbiAqL1xuZnVuY3Rpb24gY29sbGVjdENoaWxkcmVuSURzKHJlY29yZHM6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10pOiBzdHJpbmdbXSB7XG5cbiAgbGV0IGNoaWxkcmVuSURzOiBzdHJpbmdbXSA9IFtdXG5cbiAgcmVjb3Jkcy5mb3JFYWNoKChyZWNvcmQpOiB2b2lkID0+IHtcbiAgICBsZXQgX2NoaWxkcmVuSURzID0gW10gYXMgc3RyaW5nW11cblxuICAgIGlmIChyZWNvcmQudmFsdWUgIT0gbnVsbCAmJiByZWNvcmQudmFsdWUuY29udGVudCAhPSBudWxsKSB7XG4gICAgICBfY2hpbGRyZW5JRHMgPSByZWNvcmQudmFsdWUuY29udGVudFxuICAgIH1cblxuICAgIGlmIChfY2hpbGRyZW5JRHMpIHtcbiAgICAgIGNoaWxkcmVuSURzID0gY2hpbGRyZW5JRHMuY29uY2F0KF9jaGlsZHJlbklEcylcbiAgICB9XG5cbiAgfSlcblxuICByZXR1cm4gY2hpbGRyZW5JRHNcblxufVxuXG4vKipcbiAqIEdldCBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZSBvZiBJRHMgYW5kIGRlc2NlbmRhbnRzIG9mIG5vbi1wYWdlIGJsb2Nrc1xuICovXG5hc3luYyBmdW5jdGlvbiBnZXRDaGlsZHJlblJlY29yZHMoXG4gIGJsb2NrSWRzOiBzdHJpbmdbXSxcbiAgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZVtdPiB7XG5cbiAgbGV0IHJlcXVlc3RzID0gbWFrZVJlY29yZFJlcXVlc3RzKGJsb2NrSWRzLCAnYmxvY2snKVxuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMocmVxdWVzdHMpXG5cbiAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgcmVjb3Jkcy4nKVxuICB9XG5cbiAgbGV0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLmRhdGFcbiAgbGV0IGNoaWxkcmVuUmVjb3JkczogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXSA9IHJlc3BvbnNlRGF0YS5yZXN1bHRzXG4gIC8qKlxuICAgKiBGaWx0ZXIgb3V0IFwicGFnZVwiIGJsb2NrcyBhbmQgZW1wdHkgYmxvY2tzLlxuICAgKiBcbiAgICogSWYgd2UgZG8gbm90IGZpbHRlciBvdXQgXCJwYWdlXCIgYmxvY2tzLCBjaGlsZHJlbiBvZiBcIkVtYmVkZGVkIFBhZ2VcIiBhbmQgXG4gICAqIFwiTGluayB0byBQYWdlXCIgd2lsbCBiZSBjb2xsZWN0ZWQuXG4gICAqL1xuICBsZXQgY2hpbGRyZW5SZWNvcmRzTm9QYWdlID0gcmVzcG9uc2VEYXRhLnJlc3VsdHNcbiAgICAuZmlsdGVyKChyZWNvcmQ6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gcmVjb3JkLnJvbGUgIT09ICdub25lJyAmJiByZWNvcmQudmFsdWUudHlwZSAhPT0gJ3BhZ2UnXG4gICAgfSlcbiAgbGV0IGNoaWxkcmVuSURzOiBzdHJpbmdbXSA9IGNvbGxlY3RDaGlsZHJlbklEcyhjaGlsZHJlblJlY29yZHNOb1BhZ2UpXG5cbiAgLyogSWYgdGhlcmUncmUgcmVtYWluaW5nIGNoaWxkcmVuLCBkb3dubG9hZCB0aGVtLiAqL1xuICBpZiAoY2hpbGRyZW5JRHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBjaGlsZHJlblJlY29yZHMuY29uY2F0KFxuICAgICAgYXdhaXQgZ2V0Q2hpbGRyZW5SZWNvcmRzKGNoaWxkcmVuSURzLCBhcGlBZ2VudCkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuUmVjb3Jkc1xuICB9XG5cbn1cblxuLyoqXG4gKiBDb252ZXJ0IEJsb2NrUmVjb3JkVmFsdWUgYXJyYXkgdG8gTkFTVC5cbiAqIEBwYXJhbSBhbGxSZWNvcmRzIC0gVGhlIEJsb2NrUmVjb3JkVmFsdWUgYXJyYXkuXG4gKiBAcmV0dXJucyBOQVNULlxuICovXG5hc3luYyBmdW5jdGlvbiBtYWtlVHJlZShcbiAgYWxsUmVjb3JkczogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXSxcbiAgYXBpQWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOYXN0LkJsb2NrPiB7XG5cbiAgLyoqIFJlbW92ZSBibG9ja3Mgd2l0aCByb2xlOiBub25lICovXG4gIGxldCBub25FbXB0eVJlY29yZHMgPSBhbGxSZWNvcmRzXG4gICAgLmZpbHRlcigocmVjb3JkKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gcmVjb3JkLnJvbGUgIT09ICdub25lJ1xuICAgIH0pXG5cbiAgLyogVHJhbmZvcm0gTm90aW9uLkJsb2NrUmVjb3JkVmFsdWUgdG8gTmFzdC5CbG9jayAqL1xuICBsZXQgbmFzdExpc3QgPSBhd2FpdCBQcm9taXNlLmFsbChub25FbXB0eVJlY29yZHNcbiAgICAubWFwKChyZWNvcmQpOiBQcm9taXNlPE5hc3QuQmxvY2s+ID0+IHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1CbG9jayhyZWNvcmQudmFsdWUsIGFwaUFnZW50KVxuICAgIH0pKVxuXG4gIC8qIEEgbWFwIGZvciBxdWljayBJRCAtPiBpbmRleCBsb29rdXAgKi9cbiAgbGV0IG1hcDogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9uRW1wdHlSZWNvcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgbWFwW25vbkVtcHR5UmVjb3Jkc1tpXS52YWx1ZS5pZF0gPSBpXG4gIH1cblxuICAvKiBUaGUgdHJlZSdzIHJvb3QgaXMgYWx3YXlzIHRoZSBmaXJzdCByZWNvcmQgKi9cbiAgbGV0IHRyZWVSb290ID0gbmFzdExpc3RbMF1cbiAgbGV0IG5hc3RCbG9ja1xuXG4gIC8qKlxuICAgKiBXaXJlIHVwIGVhY2ggYmxvY2sncyBjaGlsZHJlblxuICAgKiBJdGVyYXRlIHRocm91Z2ggYmxvY2tzIGFuZCBnZXQgY2hpbGRyZW4gSURzIGZyb20gXG4gICAqIGBub25FbXB0eVJlY29yZHNbaV0udmFsdWUuY29udGVudGAsIHRoZW4gZmluZCBlYWNoIGNoaWxkJ3MgcmVmZXJlbmNlIFxuICAgKiBieSBJRCB1c2luZyBgbWFwYC5cbiAgICovXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9uRW1wdHlSZWNvcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgbmFzdEJsb2NrID0gbmFzdExpc3RbaV1cblxuICAgIGxldCBjaGlsZHJlbklEcyA9IG5vbkVtcHR5UmVjb3Jkc1tpXS52YWx1ZS5jb250ZW50XG4gICAgaWYgKGNoaWxkcmVuSURzICE9IG51bGwpIHtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbklEcy5sZW5ndGg7ICsraikge1xuICAgICAgICBsZXQgaW5kZXhPZkNoaWxkUmVmZXJlbmNlID0gbWFwW2NoaWxkcmVuSURzW2pdXVxuICAgICAgICBsZXQgY2hpbGRSZWZlcmVuY2UgPSBuYXN0TGlzdFtpbmRleE9mQ2hpbGRSZWZlcmVuY2VdXG5cbiAgICAgICAgaWYgKGNoaWxkUmVmZXJlbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBuYXN0QmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRyZWVSb290XG5cbn1cblxuZXhwb3J0IHtcbiAgZ2V0UGFnZVRyZWVCeUlkXG59XG5cbi8vIFRPRE86IFRvbyBtdWNoIGR1cGxpY2F0ZSBjb2RlLiBOZWVkIHRvIGNsZWFuLXVwLlxuLyoqXG4gKiBGU00gd2l0aCAzIHN0YXRlczogbm9ybWFsLCBidWxsZXRlZCwgbnVtYmVyZWQuXG4gKiBUb3RhbCAzXjIgPSA5IGNhc2VzLlxuICovXG4vL2xldCBzdGF0ZSA9ICdub3JtYWwnXG4vLyBzd2l0Y2ggKHN0YXRlKSB7XG4vLyAgIGNhc2UgJ25vcm1hbCc6IHtcbi8vICAgICBpZiAoY2hpbGRSZWZlcmVuY2UudHlwZSA9PT0gJ2J1bGxldGVkX2xpc3QnKSB7XG4vLyAgICAgICBwc2V1ZG9CbG9jayA9IG5ld1BzZXVkb0Jsb2NrKCd1bm9yZGVyZWRfbGlzdCcpXG4vLyAgICAgICBwc2V1ZG9CbG9jay5jaGlsZHJlbi5wdXNoKGNoaWxkUmVmZXJlbmNlKVxuLy8gICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKHBzZXVkb0Jsb2NrKVxuLy8gICAgICAgc3RhdGUgPSAnYnVsbGV0ZWQnXG4vLyAgICAgfSBlbHNlIGlmIChjaGlsZFJlZmVyZW5jZS50eXBlID09PSAnbnVtYmVyZWRfbGlzdCcpIHtcbi8vICAgICAgIHBzZXVkb0Jsb2NrID0gbmV3UHNldWRvQmxvY2soJ29yZGVyZWRfbGlzdCcpXG4vLyAgICAgICBwc2V1ZG9CbG9jay5jaGlsZHJlbi5wdXNoKGNoaWxkUmVmZXJlbmNlKVxuLy8gICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKHBzZXVkb0Jsb2NrKVxuLy8gICAgICAgc3RhdGUgPSAnbnVtYmVyZWQnXG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICB9XG4vLyAgICAgYnJlYWtcbi8vICAgfVxuLy8gICBjYXNlICdidWxsZXRlZCc6IHtcbi8vICAgICBpZiAoY2hpbGRSZWZlcmVuY2UudHlwZSA9PT0gJ2J1bGxldGVkX2xpc3QnKSB7XG4vLyAgICAgICBwc2V1ZG9CbG9jay5jaGlsZHJlbi5wdXNoKGNoaWxkUmVmZXJlbmNlKVxuLy8gICAgIH0gZWxzZSBpZiAoY2hpbGRSZWZlcmVuY2UudHlwZSA9PT0gJ251bWJlcmVkX2xpc3QnKSB7XG4vLyAgICAgICBwc2V1ZG9CbG9jayA9IG5ld1BzZXVkb0Jsb2NrKCdvcmRlcmVkX2xpc3QnKVxuLy8gICAgICAgcHNldWRvQmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChwc2V1ZG9CbG9jaylcbi8vICAgICAgIHN0YXRlID0gJ251bWJlcmVkJ1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4vLyAgICAgICBzdGF0ZSA9ICdub3JtYWwnXG4vLyAgICAgfVxuLy8gICAgIGJyZWFrXG4vLyAgIH1cbi8vICAgY2FzZSAnbnVtYmVyZWQnOiB7XG4vLyAgICAgaWYgKGNoaWxkUmVmZXJlbmNlLnR5cGUgPT09ICdudW1iZXJlZF9saXN0Jykge1xuLy8gICAgICAgcHNldWRvQmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICB9IGVsc2UgaWYgKGNoaWxkUmVmZXJlbmNlLnR5cGUgPT09ICdidWxsZXRlZF9saXN0Jykge1xuLy8gICAgICAgcHNldWRvQmxvY2sgPSBuZXdQc2V1ZG9CbG9jaygndW5vcmRlcmVkX2xpc3QnKVxuLy8gICAgICAgcHNldWRvQmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChwc2V1ZG9CbG9jaylcbi8vICAgICAgIHN0YXRlID0gJ2J1bGxldGVkJ1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4vLyAgICAgICBzdGF0ZSA9ICdub3JtYWwnXG4vLyAgICAgfVxuLy8gICAgIGJyZWFrXG4vLyAgIH1cbi8vICAgZGVmYXVsdDpcbi8vIH0iLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi90eXBlcy9hcGknXG5pbXBvcnQgKiBhcyBOYXN0IGZyb20gJy4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgdHJhbnNmb3JtQ29sbGVjdGlvbiB9IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbGxlY3Rpb24nXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGJsb2NrTWFwIGZyb20gJy4vYmxvY2stbWFwJ1xuXG5pbXBvcnQgdHJhbnNmb3JtUGFnZSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1QYWdlJ1xuaW1wb3J0IHRyYW5zZm9ybVN0dWIgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtU3R1YidcbmltcG9ydCB0cmFuc2Zvcm1UZXh0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRleHQnXG5pbXBvcnQgdHJhbnNmb3JtVG9EbyBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub0RvJ1xuaW1wb3J0IHRyYW5zZm9ybUhlYWRpbmcgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSGVhZGluZydcbmltcG9ydCB0cmFuc2Zvcm1CdWxsZXRlZExpc3QgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQnVsbGV0ZWRMaXN0J1xuaW1wb3J0IHRyYW5zZm9ybU51bWJlcmVkTGlzdCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1OdW1iZXJlZExpc3QnXG5pbXBvcnQgdHJhbnNmb3JtRW1iZWQgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRW1iZWQnXG5pbXBvcnQgdHJhbnNmb3JtSW1hZ2UgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSW1hZ2UnXG5pbXBvcnQgdHJhbnNmb3JtQ2FsbG91dCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1DYWxsb3V0J1xuaW1wb3J0IHRyYW5zZm9ybURpdmlkZXIgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRGl2aWRlcidcbmltcG9ydCB0cmFuc2Zvcm1RdW90ZSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1RdW90ZSdcbmltcG9ydCB0cmFuc2Zvcm1Ub2dnbGVMaXN0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRvZ2dsZUxpc3QnXG5pbXBvcnQgdHJhbnNmb3JtQ29sdW1uIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbHVtbidcbmltcG9ydCB0cmFuc2Zvcm1Db2x1bW5MaXN0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbHVtbkxpc3QnXG5pbXBvcnQgdHJhbnNmb3JtTWF0aCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1NYXRoJ1xuaW1wb3J0IHRyYW5zZm9ybUNvZGUgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29kZSdcbmltcG9ydCB0cmFuc2Zvcm1BdWRpbyBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1BdWRpbydcbmltcG9ydCB0cmFuc2Zvcm1Cb29rbWFyayBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Cb29rbWFyaydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQmxvY2soXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlLFxuICBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5hc3QuQmxvY2s+IHtcblxuICBsZXQgbmFzdE5vZGVcblxuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIC8qKiBOYXN0LlBhZ2UgKi9cbiAgICBjYXNlIGJsb2NrTWFwLnBhZ2U6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtUGFnZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ29sbGVjdGlvbiAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY29sbGVjdGlvblZpZXc6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ29sbGVjdGlvbihub2RlLCBhcGlBZ2VudClcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNhc2UgYmxvY2tNYXAuY29sbGVjdGlvblZpZXdQYWdlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvbGxlY3Rpb24obm9kZSwgYXBpQWdlbnQpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5UZXh0ICovXG4gICAgY2FzZSBibG9ja01hcC50ZXh0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVRleHQobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlRvRG9MaXN0ICovXG4gICAgY2FzZSBibG9ja01hcC50b0RvOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVRvRG8obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkhlYWRpbmcgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmhlYWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1IZWFkaW5nKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlIGJsb2NrTWFwLnN1YkhlYWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1IZWFkaW5nKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlIGJsb2NrTWFwLnN1YlN1YkhlYWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1IZWFkaW5nKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5CdWxsZXRlZExpc3QgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmJ1bGxldGVkTGlzdDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1CdWxsZXRlZExpc3Qobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0Lk51bWJlcmVkTGlzdCAqL1xuICAgIGNhc2UgYmxvY2tNYXAubnVtYmVyZWRMaXN0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybU51bWJlcmVkTGlzdChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuVG9nZ2xlTGlzdCAqL1xuICAgIGNhc2UgYmxvY2tNYXAudG9nZ2xlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVRvZ2dsZUxpc3Qobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlF1b3RlICovXG4gICAgY2FzZSBibG9ja01hcC5xdW90ZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1RdW90ZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuRGl2aWRlciAqL1xuICAgIGNhc2UgYmxvY2tNYXAuZGl2aWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1EaXZpZGVyKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5DYWxsb3V0ICovXG4gICAgY2FzZSBibG9ja01hcC5jYWxsb3V0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNhbGxvdXQobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkltYWdlICovXG4gICAgY2FzZSBibG9ja01hcC5pbWFnZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1JbWFnZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuVmlkZW8gKi9cbiAgICBjYXNlIGJsb2NrTWFwLnZpZGVvOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUVtYmVkKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5FbWJlZCAqL1xuICAgIGNhc2UgYmxvY2tNYXAuZW1iZWQ6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtRW1iZWQobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkF1ZGlvICovXG4gICAgY2FzZSBibG9ja01hcC5hdWRpbzoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1BdWRpbyhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuV2ViQm9va21hcmsgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmJvb2ttYXJrOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUJvb2ttYXJrKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Db2RlICovXG4gICAgY2FzZSBibG9ja01hcC5jb2RlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvZGUobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0Lk1hdGhFcXVhdGlvbiAqL1xuICAgIGNhc2UgYmxvY2tNYXAuZXF1YXRpb246IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtTWF0aChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ29sdW1uTGlzdCAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY29sdW1uTGlzdDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2x1bW5MaXN0KG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Db2x1bW4gKi9cbiAgICBjYXNlIGJsb2NrTWFwLmNvbHVtbjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2x1bW4obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtU3R1Yihub2RlKVxuICAgICAgbG9nKGBVbnN1cHBvcnRlZCBibG9jayB0eXBlOiAke25vZGUudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYXN0Tm9kZVxuXG59XG5cbmV4cG9ydCB7XG4gIHRyYW5zZm9ybUJsb2NrXG59IiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUF1ZGlvKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkF1ZGlvPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnYXVkaW8nIGFzICdhdWRpbycsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHNvdXJjZTogbm9kZS5wcm9wZXJ0aWVzXG4gICAgICA/IG5vZGUucHJvcGVydGllcy5zb3VyY2VcbiAgICAgICAgPyBub2RlLnByb3BlcnRpZXMuc291cmNlWzBdWzBdXG4gICAgICAgIDogJyMnXG4gICAgICA6ICcjJ1xuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1BdWRpbyIsImltcG9ydCAqIGFzIE5vdGlvbiBmcm9tICcuLi90eXBlcy9hcGknXG5pbXBvcnQgKiBhcyBOYXN0IGZyb20gJy4uL3R5cGVzL25hc3QnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Cb29rbWFyayhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5XZWJCb29rbWFyaz4ge1xuICBsZXQgcHJvcHMgPSBub2RlLnByb3BlcnRpZXMgfHwge31cbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnYm9va21hcmsnIGFzICdib29rbWFyaycsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGxpbms6IHByb3BzLmxpbmsgPyBwcm9wcy5saW5rWzBdWzBdIDogJyMnLFxuICAgIHRpdGxlOiBwcm9wcy50aXRsZSA/IHByb3BzLnRpdGxlWzBdWzBdIDogdW5kZWZpbmVkLFxuICAgIGRlc2NyaXB0aW9uOiBwcm9wcy5kZXNjcmlwdGlvbiA/IHByb3BzLmRlc2NyaXB0aW9uWzBdWzBdIDogdW5kZWZpbmVkLFxuICAgIGljb246IGZvcm1hdC5ib29rbWFya19pY29uLFxuICAgIGNvdmVyOiBmb3JtYXQuYm9va21hcmtfY292ZXIsXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUJvb2ttYXJrIiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUJ1bGxldGVkTGlzdChcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5CdWxsZXRlZExpc3Q+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdidWxsZXRlZF9saXN0JyBhcyAnYnVsbGV0ZWRfbGlzdCcsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQnVsbGV0ZWRMaXN0IiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSwgZ2V0QmxvY2tJY29uIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQ2FsbG91dChcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5DYWxsb3V0PiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY2FsbG91dCcgYXMgJ2NhbGxvdXQnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBpY29uOiBnZXRCbG9ja0ljb24obm9kZSksXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1DYWxsb3V0IiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvZGUoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ29kZT4ge1xuICBsZXQgcHJvcHMgPSBub2RlLnByb3BlcnRpZXMgfHwge31cbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY29kZScgYXMgJ2NvZGUnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpLFxuICAgIGxhbmd1YWdlOiBwcm9wcy5sYW5ndWFnZSA/IHByb3BzLmxhbmd1YWdlWzBdWzBdIDogdW5kZWZpbmVkLFxuICAgIHdyYXA6IHR5cGVvZiBmb3JtYXQuY29kZV93cmFwICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmb3JtYXQuY29kZV93cmFwIDogZmFsc2VcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQ29kZSIsImltcG9ydCAqIGFzIE5vdGlvbiBmcm9tICcuLi90eXBlcy9hcGknXG5pbXBvcnQgKiBhcyBOYXN0IGZyb20gJy4uL3R5cGVzL25hc3QnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbGxlY3Rpb24oXG4gIGNvbGxlY3Rpb25CbG9ja1JlY29yZDogTm90aW9uLkJsb2NrVmFsdWUsXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8TmFzdC5Db2xsZWN0aW9uPiB7XG5cbiAgLyoqIEJsb2NrIElEICovXG4gIGxldCBpZCA9IGNvbGxlY3Rpb25CbG9ja1JlY29yZC5pZFxuICAvKiogQ29sbGVjdGlvbiBWaWV3IElEcyAqL1xuICBsZXQgdmlld0lkcyA9IGNvbGxlY3Rpb25CbG9ja1JlY29yZFsndmlld19pZHMnXSB8fCBbXVxuICAvKiogQ29sbGVjdGlvbiBJRCAqL1xuICBsZXQgY29sbGVjdGlvbklkID0gY29sbGVjdGlvbkJsb2NrUmVjb3JkWydjb2xsZWN0aW9uX2lkJ10gfHwgJydcblxuICBpZiAoY29sbGVjdGlvbklkLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQmxvY2sgJHtpZH0gaGFzIG5vIGNvbGxlY3Rpb24gSUQuYClcbiAgfVxuXG4gIGlmICh2aWV3SWRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQmxvY2sgJHtpZH0gLSBDb2xsZWN0aW9uICR7Y29sbGVjdGlvbklkfSBoYXMgbm8gdmlldy5gKVxuICB9XG5cbiAgbGV0IHJhd0NvbGxlY3Rpb25WaWV3UmVjb3JkcyA9IGF3YWl0IGdldENvbGxlY3Rpb25WaWV3UmVjb3Jkcyh2aWV3SWRzLCBhcGlBZ2VudClcblxuICBsZXQgcmF3Q29sbGVjdGlvblJlY29yZCA9IGF3YWl0IGdldENvbGxlY3Rpb25SZWNvcmQoY29sbGVjdGlvbklkLCBhcGlBZ2VudClcblxuICAvKipcbiAgICogTWFrZSBxdWVyeSBtYXA6IGNvbGxlY3Rpb25WaWV3SWQgLT4gTm90aW9uLlF1ZXJ5IG9mIHRoZSB2aWV3XG4gICAqL1xuICBsZXQgcXVlcnlNYXA6IE1hcDxzdHJpbmcsIE5vdGlvbi5RdWVyeT4gPSBuZXcgTWFwKClcbiAgcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzLmZvckVhY2goKHJlY29yZDogTm90aW9uLkNvbGxlY3Rpb25WaWV3UmVjb3JkVmFsdWUpOiB2b2lkID0+IHtcbiAgICBsZXQgdmlld0lkID0gcmVjb3JkLnZhbHVlLmlkXG4gICAgbGV0IHF1ZXJ5ID0gcmVjb3JkLnZhbHVlLnF1ZXJ5XG4gICAgcXVlcnlNYXAuc2V0KHZpZXdJZCwgcXVlcnkpXG4gIH0pXG5cbiAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcyA9XG4gICAgYXdhaXQgZ2V0UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzKGNvbGxlY3Rpb25JZCwgcXVlcnlNYXAsIGFwaUFnZW50KVxuXG4gIC8qKiBUcmFuc2Zvcm0gdG8gTmFzdCAqL1xuICAvKiogXG4gICAqIENob29zZSBvbmUgb2YgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzIHRvIGdldCBibG9ja3MsIHNpbmNlIFxuICAgKiBvdXIgYGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbmAgaWdub3JlcyBgTm90aW9uLlF1ZXJ5LmZpbHRlcmAsIGFsbCBcbiAgICogcmVzcG9uc2VzIGluY2x1ZGVzIGFsbCBibG9ja3MuXG4gICAqL1xuICAvKiogXG4gICAqIGBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UucmVjb3JkTWFwLmJsb2NrYCBoYXMgYmxvY2tzIG5vdCBpbiB0aGUgXG4gICAqIGNvbGxlY3Rpb24sIGRvbid0IGtub3cgd2h5LlxuICAgKiBXZSBoYXZlIHRvIHVzZSBgTm90aW9uLlF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlc3VsdC5ibG9ja0lkc2BcbiAgICogdG8gc2VsZWN0IG9ubHkgdGhvc2Ugd2Ugd2FudC5cbiAgICovXG4gIC8qKlxuICAgKiBXZSB3b24ndCBnZXQgdW5kZWZpbmVkIGJlbG93IHNpbmNlIHZpZXdJZHMgZ3VhcmFudGVlIHRoZXJlIGFyZSB2aWV3cy5cbiAgICovXG4gIGxldCByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5nZXQodmlld0lkc1swXSlcbiAgaWYgKCFyYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlIGZvciAke3ZpZXdJZHNbMF19YClcblxuICBsZXQgYmxvY2tSZWNvcmRWYWx1ZU1hcCA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlY29yZE1hcC5ibG9ja1xuICBsZXQgcmVzdWx0QmxvY2tJZHMgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZXN1bHQuYmxvY2tJZHNcbiAgbGV0IG5hc3RDb2xsZWN0aW9uID0ge1xuICAgIGlkLFxuICAgIGNvbGxlY3Rpb25JZCxcbiAgICAvKiogSWNvbiBtYXkgYmUgdW5kZWZpbmVkICovXG4gICAgaWNvbjogcmF3Q29sbGVjdGlvblJlY29yZC52YWx1ZS5pY29uXG4gICAgICA/IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWUuaWNvblxuICAgICAgOiAnJyxcbiAgICAvKiogVFMgY2Fubm90IGFzc2lnbiBzdHJpbmcgdG8gJ2NvbGxlY3Rpb24nICovXG4gICAgdHlwZTogJ2NvbGxlY3Rpb24nIGFzICdjb2xsZWN0aW9uJyxcbiAgICAvKiogTmFtZSBtYXkgYmUgdW5kZWZpbmVkICovXG4gICAgbmFtZTogcmF3Q29sbGVjdGlvblJlY29yZC52YWx1ZS5uYW1lXG4gICAgICA/IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWUubmFtZVswXVswXVxuICAgICAgOiAnVW50aXRsZWQnLFxuICAgIC8qKiBJbiBjYXNlIHNjaGVtYSBpcyB1bmRlZmluZWQgKi9cbiAgICBzY2hlbWE6IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWUuc2NoZW1hXG4gICAgICA/IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWUuc2NoZW1hXG4gICAgICA6IHt9LFxuICAgIC8qKiBibG9ja1JlY29yZFZhbHVlTWFwW3hdIGlzIE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlIChUaGUgb25lIHdpdGggcm9sZSkgKi9cbiAgICBibG9ja3M6IHJlc3VsdEJsb2NrSWRzLm1hcCgoaWQ6IHN0cmluZyk6IE5vdGlvbi5CbG9ja1ZhbHVlID0+IHtcbiAgICAgIHJldHVybiBibG9ja1JlY29yZFZhbHVlTWFwW2lkXS52YWx1ZVxuICAgIH0pLFxuICAgIC8qKiBVc2Ugdmlld0lkIHRvIGFjY2VzcyByZWNvcmQgdmFsdWUgbWFwcy4gKi9cbiAgICB2aWV3czogdmlld0lkcy5tYXAoKHZpZXdJZDogc3RyaW5nKTogTmFzdC5Db2xsZWN0aW9uVmlld01ldGFkYXRhID0+IHtcbiAgICAgIGxldCB2aWV3UmVjb3JkID0gcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzXG4gICAgICAgIC5maW5kKCh2aWV3KTogYm9vbGVhbiA9PiB2aWV3LnZhbHVlLmlkID09PSB2aWV3SWQpXG4gICAgICBsZXQgdmlldzogTm90aW9uLkNvbGxlY3Rpb25WaWV3VmFsdWVcbiAgICAgIGxldCByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5nZXQodmlld0lkKVxuICAgICAgbGV0IGFnZ3JlZ2F0aW9uUmVzdWx0czogTm90aW9uLkFnZ3JlZ2F0aW9uUmVzdWx0W11cblxuICAgICAgaWYgKHZpZXdSZWNvcmQpIHtcbiAgICAgICAgdmlldyA9IHZpZXdSZWNvcmQudmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmlldyAke3ZpZXdJZH0gZG9lcyBub3QgaGF2ZSBjb2xsZWN0aW9uX3ZpZXcgcmVjb3JkLmApXG4gICAgICB9XG5cbiAgICAgIGlmIChyYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSkge1xuICAgICAgICBhZ2dyZWdhdGlvblJlc3VsdHMgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZXN1bHQuYWdncmVnYXRpb25SZXN1bHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZpZXcgJHt2aWV3SWR9IGRvZXMgbm90IGhhdmUgcXVlcnlDb2xsZWN0aW9uIHJlc3BvbnNlLmApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB2aWV3SWQsXG4gICAgICAgIHR5cGU6IHZpZXcudHlwZSxcbiAgICAgICAgbmFtZTogdmlldy5uYW1lLFxuICAgICAgICBxdWVyeTogdmlldy5xdWVyeSxcbiAgICAgICAgZm9ybWF0OiB2aWV3LmZvcm1hdCxcbiAgICAgICAgYWdncmVnYXRlOiAodmlldy5xdWVyeS5hZ2dyZWdhdGUgfHwgW10pXG4gICAgICAgICAgLm1hcCgocHJvcCk6IE5hc3QuQWdncmVnYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgYWdncmVnYXRpb25SZXN1bHQgPSBhZ2dyZWdhdGlvblJlc3VsdHNcbiAgICAgICAgICAgICAgLmZpbmQoKHJlcyk6IGJvb2xlYW4gPT4gcmVzLmlkID09PSBwcm9wLmlkKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb25UeXBlOiBwcm9wLmFnZ3JlZ2F0aW9uX3R5cGUsXG4gICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLnByb3BlcnR5LFxuICAgICAgICAgICAgICB2YWx1ZTogYWdncmVnYXRpb25SZXN1bHRcbiAgICAgICAgICAgICAgICA/IGFnZ3JlZ2F0aW9uUmVzdWx0LnZhbHVlXG4gICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KSxcbiAgICBkZWZhdWx0Vmlld0lkOiB2aWV3SWRzWzBdLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG5cbiAgcmV0dXJuIG5hc3RDb2xsZWN0aW9uXG5cbn1cblxuLyoqIFxuICogR2V0IGNvbGxlY3Rpb24gdmlldyByZWNvcmRzXG4gKiBcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGdldCBOb3Rpb24uUXVlcnkgb2JqZWN0LFxuICogd2hpY2ggY29udGFpbnMgc29ydCwgYWdncmVnYXRlLCBmaWx0ZXJfb3BlcmF0b3IgdGhhdCBhcmUgdXNlZCB0byBkb1xuICogTm90aW9uLkFnZW50LnF1ZXJ5Q29sbGVjdGlvbigpXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb25WaWV3UmVjb3JkcyhcbiAgdmlld0lkczogc3RyaW5nW10sIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8Tm90aW9uLkNvbGxlY3Rpb25WaWV3UmVjb3JkVmFsdWVbXT4ge1xuXG4gIGxldCBjb2xsZWN0aW9uVmlld1JlcXVlc3RzID0gdmlld0lkcy5tYXAoKHZpZXdJZDogc3RyaW5nKTogTm90aW9uLlJlY29yZFJlcXVlc3QgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdmlld0lkLFxuICAgICAgdGFibGU6ICdjb2xsZWN0aW9uX3ZpZXcnXG4gICAgfVxuICB9KVxuXG4gIGxldCBhcGlSZXMgPSBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMoY29sbGVjdGlvblZpZXdSZXF1ZXN0cylcbiAgaWYgKGFwaVJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhhcGlSZXMpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsIHRvIGdldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHMuJylcbiAgfVxuXG4gIGxldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHM6IE5vdGlvbi5Db2xsZWN0aW9uVmlld1JlY29yZFZhbHVlW10gPVxuICAgIGFwaVJlcy5kYXRhLnJlc3VsdHNcblxuICByZXR1cm4gcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzXG59XG5cbi8qKiBcbiAqIEdldCBjb2xsZWN0aW9uIHJlY29yZFxuICogXG4gKiBPbmUgZGF0YWJhc2Ugb25seSBoYXMgb25lIGNvbGxlY3Rpb24uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb25SZWNvcmQoXG4gIGNvbGxlY3Rpb25JZDogc3RyaW5nLCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5vdGlvbi5Db2xsZWN0aW9uUmVjb3JkVmFsdWU+IHtcblxuICBsZXQgY29sbGVjdGlvblJlcXVlc3RzID0gW3tcbiAgICBpZDogY29sbGVjdGlvbklkLFxuICAgIHRhYmxlOiAnY29sbGVjdGlvbidcbiAgfV1cbiAgbGV0IGFwaVJlcyA9IGF3YWl0IGFwaUFnZW50LmdldFJlY29yZFZhbHVlcyhjb2xsZWN0aW9uUmVxdWVzdHMpXG4gIGlmIChhcGlSZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgY29uc29sZS5sb2coYXBpUmVzKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgY29sbGVjdGlvblJlc3BvbnNlcy4nKVxuICB9XG4gIGxldCBjb2xsZWN0aW9uUmVzcG9uc2VzID0gYXBpUmVzLmRhdGEucmVzdWx0c1xuICBsZXQgcmF3Q29sbGVjdGlvblJlY29yZDogTm90aW9uLkNvbGxlY3Rpb25SZWNvcmRWYWx1ZSA9IGNvbGxlY3Rpb25SZXNwb25zZXNbMF1cblxuICByZXR1cm4gcmF3Q29sbGVjdGlvblJlY29yZFxufVxuXG4vKipcbiAqIFF1ZXJ5IGFsbCBlbnRyaWVzIGluIHRoaXMgY29sbGVjdGlvblxuICogXG4gKiBUbyBnZXQgYWxsIGVudHJpZXMsIHdlIG11c3Qgbm90IGZpbHRlciBhbnkgZW50cmllcywgdGhpcyBtZWFuc1xuICogTm90aW9uLlF1ZXJ5LmZpbHRlciBzaG91bGQgYmUgZW1wdHkuIEx1Y2tpbHksIGN1cnJlbnQgTm90aW9uLkFnZW50IFxuICogc2V0IHRoYXQgZW1wdHkgYnkgZGVmYXVsdC5cbiAqIFxuICogVGhlIHF1ZXJ5Q29sbGVjdGlvbiBBUEkgY2FuIGJlIHVzZWQgdG8gcXVlcnkgb25lIGNvbGxlY3Rpb25fdmlldyBhdFxuICogdGhlIHNhbWUgdGltZSwgdGhvdWdoIHdlIGhhdmUgcXVlcmllZCBhbGwgY29sbGVjdGlvbiB2aWV3cyBwcmV2aW91c2x5LCBcbiAqIHdlIHN0aWxsIG5lZWQgdG8gcXVlcnkgdGhlIGFnZ3JlZ2F0aW9uUmVzdWx0cyBmb3IgdGhvc2UgY29sbGVjdGlvblxuICogdmlld3MuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcyhcbiAgY29sbGVjdGlvbklkOiBzdHJpbmcsIHF1ZXJ5TWFwOiBNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnk+LCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE1hcDxzdHJpbmcsIE5vdGlvbi5RdWVyeUNvbGxlY3Rpb25SZXNwb25zZT4+IHtcblxuICBpbnRlcmZhY2UgUmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdCB7XG4gICAgY29sbGVjdGlvbklkOiBzdHJpbmdcbiAgICBjb2xsZWN0aW9uVmlld0lkOiBzdHJpbmdcbiAgICBhZ2dyZWdhdGVRdWVyaWVzOiBOb3Rpb24uQWdncmVnYXRlUXVlcnlbXVxuICB9XG5cbiAgLyoqIE1ha2UgcmVxdWVzdCBvYmplY3RzLiAqL1xuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHM6IFJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3RbXSA9IFtdXG4gIHF1ZXJ5TWFwLmZvckVhY2goKHF1ZXJ5LCB2aWV3SWQpOiB2b2lkID0+IHtcbiAgICByYXdRdWVyeUNvbGxlY3Rpb25SZXF1ZXN0cy5wdXNoKHtcbiAgICAgIGNvbGxlY3Rpb25JZCxcbiAgICAgIGNvbGxlY3Rpb25WaWV3SWQ6IHZpZXdJZCxcbiAgICAgIGFnZ3JlZ2F0ZVF1ZXJpZXM6IHF1ZXJ5LmFnZ3JlZ2F0ZSB8fCBbXVxuICAgIH0pXG4gIH0pXG5cbiAgLyoqIERvIHF1ZXJpZXMgYW5kIHJlY2VpdmUgcmVzcG9uc2VzLiAqL1xuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzOiBNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2U+ID0gbmV3IE1hcCgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHMubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgcmVxID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHNbaV1cbiAgICBsZXQgcmVzID1cbiAgICAgIGF3YWl0IGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgICAgcmVxLmNvbGxlY3Rpb25JZCxcbiAgICAgICAgcmVxLmNvbGxlY3Rpb25WaWV3SWQsXG4gICAgICAgIHJlcS5hZ2dyZWdhdGVRdWVyaWVzKVxuICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLicpXG4gICAgfVxuICAgIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5zZXQocmVxLmNvbGxlY3Rpb25WaWV3SWQsIHJlcy5kYXRhKVxuICB9XG5cbiAgcmV0dXJuIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlc1xufVxuXG5leHBvcnQge1xuICB0cmFuc2Zvcm1Db2xsZWN0aW9uLFxuICBnZXRDb2xsZWN0aW9uVmlld1JlY29yZHMsXG4gIGdldENvbGxlY3Rpb25SZWNvcmQsXG4gIGdldFF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlc1xufSIsImltcG9ydCAqIGFzIE5vdGlvbiBmcm9tICcuLi90eXBlcy9hcGknXG5pbXBvcnQgKiBhcyBOYXN0IGZyb20gJy4uL3R5cGVzL25hc3QnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1Db2x1bW4oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ29sdW1uPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY29sdW1uJyBhcyAnY29sdW1uJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgcmF0aW86IG5vZGUuZm9ybWF0XG4gICAgICA/IG5vZGUuZm9ybWF0LmNvbHVtbl9yYXRpb1xuICAgICAgICA/IG5vZGUuZm9ybWF0LmNvbHVtbl9yYXRpb1xuICAgICAgICA6IDFcbiAgICAgIDogMVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Db2x1bW4iLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuLi90eXBlcy9uYXN0J1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQ29sdW1uTGlzdChcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5Db2x1bW5MaXN0PiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY29sdW1uX2xpc3QnIGFzICdjb2x1bW5fbGlzdCcsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUNvbHVtbkxpc3QiLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuLi90eXBlcy9uYXN0J1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtRGl2aWRlcihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5EaXZpZGVyPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnZGl2aWRlcicgYXMgJ2RpdmlkZXInLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1EaXZpZGVyIiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUVtYmVkKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkVtYmVkPiB7XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogbm9kZS50eXBlID09PSAndmlkZW8nXG4gICAgICA/ICd2aWRlbycgYXMgJ3ZpZGVvJyA6ICdlbWJlZCcgYXMgJ2VtYmVkJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgd2lkdGg6IGZvcm1hdC5ibG9ja193aWR0aCB8fCA5OTk5LFxuICAgIHNvdXJjZTogZm9ybWF0LmRpc3BsYXlfc291cmNlIHx8ICcjJyxcbiAgICBmdWxsV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfZnVsbF93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX2Z1bGxfd2lkdGggOiBmYWxzZSxcbiAgICBwYWdlV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfcGFnZV93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggOiBmYWxzZSxcbiAgICBhc3BlY3RSYXRpbzogZm9ybWF0LmJsb2NrX2FzcGVjdF9yYXRpbyB8fCAwLjU2MiwgLy8gMTY6OVxuICAgIHByZXNlcnZlU2NhbGU6IHR5cGVvZiBmb3JtYXQuYmxvY2tfcHJlc2VydmVfc2NhbGUgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGZvcm1hdC5ibG9ja19wcmVzZXJ2ZV9zY2FsZSA6IHRydWVcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtRW1iZWQiLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuLi90eXBlcy9uYXN0J1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBibG9ja01hcCBmcm9tICcuLi9ibG9jay1tYXAnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUhlYWRpbmcoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuSGVhZGluZz4ge1xuICBsZXQgZGVwdGhcbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlIGJsb2NrTWFwLmhlYWRlcjpcbiAgICAgIGRlcHRoID0gMVxuICAgICAgYnJlYWtcbiAgICBjYXNlIGJsb2NrTWFwLnN1YkhlYWRlcjpcbiAgICAgIGRlcHRoID0gMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgZGVwdGggPSAzXG4gIH1cblxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2hlYWRpbmcnIGFzICdoZWFkaW5nJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKSxcbiAgICBkZXB0aFxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1IZWFkaW5nIiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUltYWdlKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkltYWdlPiB7XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2ltYWdlJyBhcyAnaW1hZ2UnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB3aWR0aDogZm9ybWF0LmJsb2NrX3dpZHRoIHx8IDk5OTksXG4gICAgc291cmNlOiBmb3JtYXQuZGlzcGxheV9zb3VyY2UgfHwgJyMnLFxuICAgIGZ1bGxXaWR0aDogdHlwZW9mIGZvcm1hdC5ibG9ja19mdWxsX3dpZHRoICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGZvcm1hdC5ibG9ja19mdWxsX3dpZHRoIDogZmFsc2UsXG4gICAgcGFnZVdpZHRoOiB0eXBlb2YgZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggOiBmYWxzZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1JbWFnZSIsImltcG9ydCAqIGFzIE5vdGlvbiBmcm9tICcuLi90eXBlcy9hcGknXG5pbXBvcnQgKiBhcyBOYXN0IGZyb20gJy4uL3R5cGVzL25hc3QnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1NYXRoKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0Lk1hdGhFcXVhdGlvbj4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2VxdWF0aW9uJyBhcyAnZXF1YXRpb24nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBsYXRleDogbm9kZS5wcm9wZXJ0aWVzXG4gICAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVxuICAgICAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVswXVswXVxuICAgICAgICA6ICcnXG4gICAgICA6ICcnXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybU1hdGgiLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuLi90eXBlcy9uYXN0J1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtTnVtYmVyZWRMaXN0KFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0Lk51bWJlcmVkTGlzdD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ251bWJlcmVkX2xpc3QnIGFzICdudW1iZXJlZF9saXN0JyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1OdW1iZXJlZExpc3QiLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuLi90eXBlcy9uYXN0J1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlLCBnZXRCbG9ja0ljb24gfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1QYWdlKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LlBhZ2U+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdwYWdlJyBhcyAncGFnZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRpdGxlOiBnZXRCbG9ja1RpdGxlKG5vZGUpWzBdWzBdLCBcbiAgICBpY29uOiBnZXRCbG9ja0ljb24obm9kZSksXG4gICAgY292ZXI6IG5vZGUuZm9ybWF0XG4gICAgICA/IG5vZGUuZm9ybWF0LnBhZ2VfY292ZXJcbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIGZ1bGxXaWR0aDogbm9kZS5mb3JtYXRcbiAgICAgID8gbm9kZS5mb3JtYXQucGFnZV9mdWxsX3dpZHRoXG4gICAgICA6IGZhbHNlLFxuICAgIGNvdmVyUG9zaXRpb246IG5vZGUuZm9ybWF0XG4gICAgICA/IG5vZGUuZm9ybWF0LnBhZ2VfY292ZXJfcG9zaXRpb25cbiAgICAgIDogMVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1QYWdlIiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVF1b3RlKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LlF1b3RlPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAncXVvdGUnIGFzICdxdW90ZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtUXVvdGUiLCJpbXBvcnQgKiBhcyBOb3Rpb24gZnJvbSAnLi4vdHlwZXMvYXBpJ1xuaW1wb3J0ICogYXMgTmFzdCBmcm9tICcuLi90eXBlcy9uYXN0J1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtU3R1YihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5CbG9jaz4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogbm9kZS50eXBlLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1TdHViIiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVRleHQoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuVGV4dD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3RleHQnIGFzICd0ZXh0JyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1UZXh0IiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVRvRG8oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuVG9Eb0xpc3Q+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICd0b19kbycgYXMgJ3RvX2RvJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKSxcbiAgICBjaGVja2VkOiBub2RlLnByb3BlcnRpZXNcbiAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLmNoZWNrZWRcbiAgICAgICAgPyBub2RlLnByb3BlcnRpZXMuY2hlY2tlZFswXVswXSA9PT0gJ1llcydcbiAgICAgICAgOiBmYWxzZVxuICAgICAgOiBmYWxzZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Ub0RvIiwiaW1wb3J0ICogYXMgTm90aW9uIGZyb20gJy4uL3R5cGVzL2FwaSdcbmltcG9ydCAqIGFzIE5hc3QgZnJvbSAnLi4vdHlwZXMvbmFzdCdcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVRvZ2dsZUxpc3QoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuVG9nZ2xlTGlzdD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3RvZ2dsZScgYXMgJ3RvZ2dsZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtVG9nZ2xlTGlzdCIsImltcG9ydCAqIGFzIE5vdGlvbiBmcm9tICcuLi90eXBlcy9hcGknXG4vLyBpbXBvcnQgKiBhcyBOYXN0IGZyb20gJy4uL3R5cGVzL25hc3QnXG5cbmZ1bmN0aW9uIGdldEJsb2NrQ29sb3IoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBsZXQgY29sb3IgPSBub2RlLmZvcm1hdFxuICAgID8gbm9kZS5mb3JtYXRbJ2Jsb2NrX2NvbG9yJ11cbiAgICA6IHVuZGVmaW5lZFxuICByZXR1cm4gY29sb3Jcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tUaXRsZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IE5vdGlvbi5TdHlsZWRTdHJpbmdbXSB7XG4gIGxldCB0aXRsZSA9IG5vZGUucHJvcGVydGllc1xuICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlXG4gICAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVxuICAgICAgOiBbXSBhcyBOb3Rpb24uU3R5bGVkU3RyaW5nW11cbiAgICA6IFtdIGFzIE5vdGlvbi5TdHlsZWRTdHJpbmdbXVxuICByZXR1cm4gdGl0bGVcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tJY29uKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgbGV0IGljb24gPSBub2RlLmZvcm1hdFxuICAgID8gbm9kZS5mb3JtYXQucGFnZV9pY29uXG4gICAgOiB1bmRlZmluZWRcbiAgcmV0dXJuIGljb25cbn1cblxuZXhwb3J0IHtcbiAgZ2V0QmxvY2tDb2xvcixcbiAgZ2V0QmxvY2tUaXRsZSxcbiAgZ2V0QmxvY2tJY29uXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7IGxvZywgcGFyc2VKU09OIH1cblxuLyoqXG4gKiBXcmFwcGVyIG9mIGNvbnNvbGUubG9nKCkuXG4gKi9cbmZ1bmN0aW9uIGxvZygpIHtcbiAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgYXJncy51bnNoaWZ0KCcobmFzdC11dGlsLWZyb20tbm90aW9uYXBpKScpXG4gIGNvbnNvbGUubG9nLmFwcGx5KG51bGwsIGFyZ3MpXG59XG5cbi8qKlxuICogRmFpbHNhZmUgSlNPTi5wYXJzZSgpIHdyYXBwZXIuXG4gKiBAcGFyYW0geyp9IHN0ciAtIFBheWxvYWQgdG8gcGFyc2UuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYXJzZWQgb2JqZWN0IHdoZW4gc3VjY2VzcywgdW5kZWZpbmVkIHdoZW4gZmFpbC5cbiAqL1xuZnVuY3Rpb24gcGFyc2VKU09OKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN0cilcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdm9pZCAwXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3NlcnRcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==