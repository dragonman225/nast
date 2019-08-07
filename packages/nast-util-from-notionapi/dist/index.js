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
        createdTime: collectionBlockRecord.created_time,
        lastEditedTime: collectionBlockRecord.last_edited_time,
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
        coverPosition: format.page_cover_position || 1
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jsb2NrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybUJsb2NrLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQXVkaW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Cb29rbWFyay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1DYWxsb3V0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29kZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2x1bW5MaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRGl2aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUVtYmVkLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRXF1YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1IZWFkaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtUGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVF1b3RlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtU3R1Yi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Ub0RvLnRzIiwid2VicGFjazovLy8uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVG9nZ2xlTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJhbnNmb3JtZXJzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhc3NlcnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNB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RXZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7UUFDdkIsQ0FBQyxDQUFDLFNBQVM7SUFDYixPQUFPLElBQUk7QUFDYixDQUFDO0FBS0Msb0NBQVk7Ozs7Ozs7Ozs7OztBQ2xDZCxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN0QkEsbUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImNvbnN0IG1hcCA9IHtcbiAgcGFnZTogJ3BhZ2UnLFxuICBoZWFkZXI6ICdoZWFkZXInLFxuICBzdWJIZWFkZXI6ICdzdWJfaGVhZGVyJyxcbiAgc3ViU3ViSGVhZGVyOiAnc3ViX3N1Yl9oZWFkZXInLFxuICB0b0RvOiAndG9fZG8nLFxuICB0b2dnbGU6ICd0b2dnbGUnLFxuICBjb2x1bW5MaXN0OiAnY29sdW1uX2xpc3QnLFxuICBjb2x1bW46ICdjb2x1bW4nLFxuICBidWxsZXRlZExpc3Q6ICdidWxsZXRlZF9saXN0JyxcbiAgbnVtYmVyZWRMaXN0OiAnbnVtYmVyZWRfbGlzdCcsXG4gIHRleHQ6ICd0ZXh0JyxcbiAgY29kZTogJ2NvZGUnLFxuICBlcXVhdGlvbjogJ2VxdWF0aW9uJyxcbiAgZGl2aWRlcjogJ2RpdmlkZXInLFxuICBxdW90ZTogJ3F1b3RlJyxcbiAgY2FsbG91dDogJ2NhbGxvdXQnLFxuICB0YWJsZU9mQ29udGVudHM6ICd0YWJsZV9vZl9jb250ZW50cycsXG4gIGJyZWFkY3J1bWI6ICdicmVhZGNydW1iJyxcbiAgaW1hZ2U6ICdpbWFnZScsXG4gIHZpZGVvOiAndmlkZW8nLFxuICBlbWJlZDogJ2VtYmVkJyxcbiAgYXVkaW86ICdhdWRpbycsXG4gIGJvb2ttYXJrOiAnYm9va21hcmsnLFxuICBjb2xsZWN0aW9uVmlldzogJ2NvbGxlY3Rpb25fdmlldycsXG4gIGNvbGxlY3Rpb25WaWV3UGFnZTogJ2NvbGxlY3Rpb25fdmlld19wYWdlJyxcbiAgdW5vcmRlcmVkTGlzdDogJ3Vub3JkZXJlZF9saXN0JyxcbiAgb3JkZXJlZExpc3Q6ICdvcmRlcmVkX2xpc3QnXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcCIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0J1xuXG5pbXBvcnQgeyB0cmFuc2Zvcm1CbG9jayB9IGZyb20gJy4vdHJhbnNmb3JtQmxvY2snXG5cbmltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uL3R5cGVzL3NyYydcblxuYXN5bmMgZnVuY3Rpb24gZ2V0UGFnZVRyZWVCeUlkKFxuICByb290SUQ6IHN0cmluZyxcbiAgYWdlbnQ6IE5vdGlvbi5BZ2VudFxuKTogUHJvbWlzZTxOYXN0LkJsb2NrPiB7XG5cbiAgYXNzZXJ0KHR5cGVvZiByb290SUQgPT09ICdzdHJpbmcnKVxuICBhc3NlcnQodHlwZW9mIGFnZW50ID09PSAnb2JqZWN0JylcbiAgYXNzZXJ0KHR5cGVvZiBhZ2VudC5nZXRSZWNvcmRWYWx1ZXMgPT09ICdmdW5jdGlvbicpXG4gIGFzc2VydCh0eXBlb2YgYWdlbnQucXVlcnlDb2xsZWN0aW9uID09PSAnZnVuY3Rpb24nKVxuXG4gIGNvbnN0IGFwaSA9IGFnZW50XG5cbiAgLyoqXG4gICAqIGdldENoaWxkcmVuUmVjb3JkcygpIGRvZXMgbm90IGRvd25sb2FkIGNoaWxkcmVuIG9mIGEgcGFnZSxcbiAgICogc28gd2Ugc2hvdWxkIGdldCB0aGUgcGFnZSBmaXJzdC5cbiAgICovXG4gIGxldCBwYWdlQmxvY2tSZXF1ZXN0ID0gbWFrZVJlY29yZFJlcXVlc3RzKFtyb290SURdLCAnYmxvY2snKVxuICBsZXQgcGFnZUJsb2NrUmVzcG9uc2U6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlc1Jlc3BvbnNlID1cbiAgICBhd2FpdCBhcGkuZ2V0UmVjb3JkVmFsdWVzKHBhZ2VCbG9ja1JlcXVlc3QpXG4gIGlmIChwYWdlQmxvY2tSZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhwYWdlQmxvY2tSZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHBhZ2UgYmxvY2suJylcbiAgfVxuICBsZXQgcGFnZUJsb2NrID0gcGFnZUJsb2NrUmVzcG9uc2UuZGF0YS5yZXN1bHRzWzBdXG4gIGxldCBjaGlsZHJlbklkc09mUGFnZUJsb2NrID0gcGFnZUJsb2NrLnZhbHVlLmNvbnRlbnRcblxuICBsZXQgYWxsUmVjb3JkczogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXSA9IFtwYWdlQmxvY2tdXG4gIGlmIChjaGlsZHJlbklkc09mUGFnZUJsb2NrICE9IG51bGwpIHtcbiAgICAvKiBHZXQgYWxsIHJlY29yZHMgaW4gYSBmbGF0IGFycmF5LiAqL1xuICAgIGxldCBjaGlsZHJlbiA9IGF3YWl0IGdldENoaWxkcmVuUmVjb3JkcyhjaGlsZHJlbklkc09mUGFnZUJsb2NrLCBhcGkpXG4gICAgYWxsUmVjb3JkcyA9IGFsbFJlY29yZHMuY29uY2F0KGNoaWxkcmVuKVxuICB9XG5cbiAgaWYgKGFsbFJlY29yZHMgIT0gbnVsbClcbiAgICByZXR1cm4gbWFrZVRyZWUoYWxsUmVjb3JkcywgYXBpKVxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbWFrZSB0cmVlLCBubyByZWNvcmRzJylcbiAgLy9yZXR1cm4geyByZWNvcmRzOiBhbGxSZWNvcmRzIH1cblxufVxuXG4vKipcbiAqIE1ha2UgcmVxdWVzdCBwYXlsb2FkIGZvciBnZXRSZWNvcmRWYWx1ZXMgQVBJLlxuICogQHBhcmFtIGlkcyAtIE5vdGlvbiByZWNvcmQgSUQgYXJyYXkuXG4gKiBAcGFyYW0gdGFibGUgLSBUaGUgdGFibGUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyBUaGUgcGF5bG9hZC5cbiAqL1xuZnVuY3Rpb24gbWFrZVJlY29yZFJlcXVlc3RzKFxuICBpZHM6IHN0cmluZ1tdLFxuICB0YWJsZTogc3RyaW5nXG4pOiBOb3Rpb24uUmVjb3JkUmVxdWVzdFtdIHtcblxuICBsZXQgcmVxdWVzdHMgPSBpZHMubWFwKChpZCk6IE5vdGlvbi5SZWNvcmRSZXF1ZXN0ID0+IHtcbiAgICByZXR1cm4geyBpZCwgdGFibGUgfVxuICB9KVxuXG4gIHJldHVybiByZXF1ZXN0c1xuXG59XG5cbi8qKlxuICogQ29sbGVjdCBjaGlsZHJlbiBJRHMgb2YgYW4gcmVjb3JkcyBhcnJheS5cbiAqIEBwYXJhbSByZWNvcmRzIC0gVGhlIHJlY29yZHMgYXJyYXkuXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBJRHMuXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlbklEcyhcbiAgcmVjb3JkczogTm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXVxuKTogc3RyaW5nW10ge1xuXG4gIGxldCBjaGlsZHJlbklEczogc3RyaW5nW10gPSBbXVxuXG4gIHJlY29yZHMuZm9yRWFjaCgocmVjb3JkKTogdm9pZCA9PiB7XG4gICAgbGV0IF9jaGlsZHJlbklEcyA9IFtdIGFzIHN0cmluZ1tdXG5cbiAgICBpZiAocmVjb3JkLnZhbHVlICE9IG51bGwgJiYgcmVjb3JkLnZhbHVlLmNvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgX2NoaWxkcmVuSURzID0gcmVjb3JkLnZhbHVlLmNvbnRlbnRcbiAgICB9XG5cbiAgICBpZiAoX2NoaWxkcmVuSURzKSB7XG4gICAgICBjaGlsZHJlbklEcyA9IGNoaWxkcmVuSURzLmNvbmNhdChfY2hpbGRyZW5JRHMpXG4gICAgfVxuXG4gIH0pXG5cbiAgcmV0dXJuIGNoaWxkcmVuSURzXG5cbn1cblxuLyoqXG4gKiBHZXQgTm90aW9uLkJsb2NrUmVjb3JkVmFsdWUgb2YgSURzIGFuZCBkZXNjZW5kYW50cyBvZiBub24tcGFnZSBibG9ja3NcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q2hpbGRyZW5SZWNvcmRzKFxuICBibG9ja0lkczogc3RyaW5nW10sXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8Tm90aW9uLkJsb2NrUmVjb3JkVmFsdWVbXT4ge1xuXG4gIGxldCByZXF1ZXN0cyA9IG1ha2VSZWNvcmRSZXF1ZXN0cyhibG9ja0lkcywgJ2Jsb2NrJylcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgYXBpQWdlbnQuZ2V0UmVjb3JkVmFsdWVzKHJlcXVlc3RzKVxuXG4gIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHJlY29yZHMuJylcbiAgfVxuXG4gIGxldCByZXNwb25zZURhdGEgPSByZXNwb25zZS5kYXRhXG4gIGxldCBjaGlsZHJlblJlY29yZHM6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10gPSByZXNwb25zZURhdGEucmVzdWx0c1xuICAvKipcbiAgICogRmlsdGVyIG91dCBcInBhZ2VcIiBibG9ja3MgYW5kIGVtcHR5IGJsb2Nrcy5cbiAgICogXG4gICAqIElmIHdlIGRvIG5vdCBmaWx0ZXIgb3V0IFwicGFnZVwiIGJsb2NrcywgY2hpbGRyZW4gb2YgXCJFbWJlZGRlZCBQYWdlXCIgYW5kIFxuICAgKiBcIkxpbmsgdG8gUGFnZVwiIHdpbGwgYmUgY29sbGVjdGVkLlxuICAgKi9cbiAgbGV0IGNoaWxkcmVuUmVjb3Jkc05vUGFnZSA9IHJlc3BvbnNlRGF0YS5yZXN1bHRzXG4gICAgLmZpbHRlcigocmVjb3JkOiBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgcmV0dXJuIHJlY29yZC5yb2xlICE9PSAnbm9uZScgJiYgcmVjb3JkLnZhbHVlLnR5cGUgIT09ICdwYWdlJ1xuICAgIH0pXG4gIGxldCBjaGlsZHJlbklEczogc3RyaW5nW10gPSBjb2xsZWN0Q2hpbGRyZW5JRHMoY2hpbGRyZW5SZWNvcmRzTm9QYWdlKVxuXG4gIC8qIElmIHRoZXJlJ3JlIHJlbWFpbmluZyBjaGlsZHJlbiwgZG93bmxvYWQgdGhlbS4gKi9cbiAgaWYgKGNoaWxkcmVuSURzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gY2hpbGRyZW5SZWNvcmRzLmNvbmNhdChcbiAgICAgIGF3YWl0IGdldENoaWxkcmVuUmVjb3JkcyhjaGlsZHJlbklEcywgYXBpQWdlbnQpKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjaGlsZHJlblJlY29yZHNcbiAgfVxuXG59XG5cbi8qKlxuICogQ29udmVydCBCbG9ja1JlY29yZFZhbHVlIGFycmF5IHRvIE5BU1QuXG4gKiBAcGFyYW0gYWxsUmVjb3JkcyAtIFRoZSBCbG9ja1JlY29yZFZhbHVlIGFycmF5LlxuICogQHJldHVybnMgTkFTVC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbWFrZVRyZWUoXG4gIGFsbFJlY29yZHM6IE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlW10sXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8TmFzdC5CbG9jaz4ge1xuXG4gIC8qKiBSZW1vdmUgYmxvY2tzIHdpdGggcm9sZTogbm9uZSAqL1xuICBsZXQgbm9uRW1wdHlSZWNvcmRzID0gYWxsUmVjb3Jkc1xuICAgIC5maWx0ZXIoKHJlY29yZCk6IGJvb2xlYW4gPT4ge1xuICAgICAgcmV0dXJuIHJlY29yZC5yb2xlICE9PSAnbm9uZSdcbiAgICB9KVxuXG4gIC8qIFRyYW5mb3JtIE5vdGlvbi5CbG9ja1JlY29yZFZhbHVlIHRvIE5hc3QuQmxvY2sgKi9cbiAgbGV0IG5hc3RMaXN0ID0gYXdhaXQgUHJvbWlzZS5hbGwobm9uRW1wdHlSZWNvcmRzXG4gICAgLm1hcCgocmVjb3JkKTogUHJvbWlzZTxOYXN0LkJsb2NrPiA9PiB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtQmxvY2socmVjb3JkLnZhbHVlLCBhcGlBZ2VudClcbiAgICB9KSlcblxuICAvKiBBIG1hcCBmb3IgcXVpY2sgSUQgLT4gaW5kZXggbG9va3VwICovXG4gIGxldCBtYXA6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vbkVtcHR5UmVjb3Jkcy5sZW5ndGg7ICsraSkge1xuICAgIG1hcFtub25FbXB0eVJlY29yZHNbaV0udmFsdWUuaWRdID0gaVxuICB9XG5cbiAgLyogVGhlIHRyZWUncyByb290IGlzIGFsd2F5cyB0aGUgZmlyc3QgcmVjb3JkICovXG4gIGxldCB0cmVlUm9vdCA9IG5hc3RMaXN0WzBdXG4gIGxldCBuYXN0QmxvY2tcblxuICAvKipcbiAgICogV2lyZSB1cCBlYWNoIGJsb2NrJ3MgY2hpbGRyZW5cbiAgICogSXRlcmF0ZSB0aHJvdWdoIGJsb2NrcyBhbmQgZ2V0IGNoaWxkcmVuIElEcyBmcm9tIFxuICAgKiBgbm9uRW1wdHlSZWNvcmRzW2ldLnZhbHVlLmNvbnRlbnRgLCB0aGVuIGZpbmQgZWFjaCBjaGlsZCdzIHJlZmVyZW5jZSBcbiAgICogYnkgSUQgdXNpbmcgYG1hcGAuXG4gICAqL1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vbkVtcHR5UmVjb3Jkcy5sZW5ndGg7ICsraSkge1xuICAgIG5hc3RCbG9jayA9IG5hc3RMaXN0W2ldXG5cbiAgICBsZXQgY2hpbGRyZW5JRHMgPSBub25FbXB0eVJlY29yZHNbaV0udmFsdWUuY29udGVudFxuICAgIGlmIChjaGlsZHJlbklEcyAhPSBudWxsKSB7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW5JRHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgbGV0IGluZGV4T2ZDaGlsZFJlZmVyZW5jZSA9IG1hcFtjaGlsZHJlbklEc1tqXV1cbiAgICAgICAgbGV0IGNoaWxkUmVmZXJlbmNlID0gbmFzdExpc3RbaW5kZXhPZkNoaWxkUmVmZXJlbmNlXVxuXG4gICAgICAgIGlmIChjaGlsZFJlZmVyZW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgbmFzdEJsb2NrLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cmVlUm9vdFxuXG59XG5cbmV4cG9ydCB7XG4gIGdldFBhZ2VUcmVlQnlJZFxufVxuXG4vLyBUT0RPOiBUb28gbXVjaCBkdXBsaWNhdGUgY29kZS4gTmVlZCB0byBjbGVhbi11cC5cbi8qKlxuICogRlNNIHdpdGggMyBzdGF0ZXM6IG5vcm1hbCwgYnVsbGV0ZWQsIG51bWJlcmVkLlxuICogVG90YWwgM14yID0gOSBjYXNlcy5cbiAqL1xuLy9sZXQgc3RhdGUgPSAnbm9ybWFsJ1xuLy8gc3dpdGNoIChzdGF0ZSkge1xuLy8gICBjYXNlICdub3JtYWwnOiB7XG4vLyAgICAgaWYgKGNoaWxkUmVmZXJlbmNlLnR5cGUgPT09ICdidWxsZXRlZF9saXN0Jykge1xuLy8gICAgICAgcHNldWRvQmxvY2sgPSBuZXdQc2V1ZG9CbG9jaygndW5vcmRlcmVkX2xpc3QnKVxuLy8gICAgICAgcHNldWRvQmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChwc2V1ZG9CbG9jaylcbi8vICAgICAgIHN0YXRlID0gJ2J1bGxldGVkJ1xuLy8gICAgIH0gZWxzZSBpZiAoY2hpbGRSZWZlcmVuY2UudHlwZSA9PT0gJ251bWJlcmVkX2xpc3QnKSB7XG4vLyAgICAgICBwc2V1ZG9CbG9jayA9IG5ld1BzZXVkb0Jsb2NrKCdvcmRlcmVkX2xpc3QnKVxuLy8gICAgICAgcHNldWRvQmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChwc2V1ZG9CbG9jaylcbi8vICAgICAgIHN0YXRlID0gJ251bWJlcmVkJ1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4vLyAgICAgfVxuLy8gICAgIGJyZWFrXG4vLyAgIH1cbi8vICAgY2FzZSAnYnVsbGV0ZWQnOiB7XG4vLyAgICAgaWYgKGNoaWxkUmVmZXJlbmNlLnR5cGUgPT09ICdidWxsZXRlZF9saXN0Jykge1xuLy8gICAgICAgcHNldWRvQmxvY2suY2hpbGRyZW4ucHVzaChjaGlsZFJlZmVyZW5jZSlcbi8vICAgICB9IGVsc2UgaWYgKGNoaWxkUmVmZXJlbmNlLnR5cGUgPT09ICdudW1iZXJlZF9saXN0Jykge1xuLy8gICAgICAgcHNldWRvQmxvY2sgPSBuZXdQc2V1ZG9CbG9jaygnb3JkZXJlZF9saXN0Jylcbi8vICAgICAgIHBzZXVkb0Jsb2NrLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4vLyAgICAgICBub2RlLmNoaWxkcmVuLnB1c2gocHNldWRvQmxvY2spXG4vLyAgICAgICBzdGF0ZSA9ICdudW1iZXJlZCdcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGNoaWxkUmVmZXJlbmNlKVxuLy8gICAgICAgc3RhdGUgPSAnbm9ybWFsJ1xuLy8gICAgIH1cbi8vICAgICBicmVha1xuLy8gICB9XG4vLyAgIGNhc2UgJ251bWJlcmVkJzoge1xuLy8gICAgIGlmIChjaGlsZFJlZmVyZW5jZS50eXBlID09PSAnbnVtYmVyZWRfbGlzdCcpIHtcbi8vICAgICAgIHBzZXVkb0Jsb2NrLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4vLyAgICAgfSBlbHNlIGlmIChjaGlsZFJlZmVyZW5jZS50eXBlID09PSAnYnVsbGV0ZWRfbGlzdCcpIHtcbi8vICAgICAgIHBzZXVkb0Jsb2NrID0gbmV3UHNldWRvQmxvY2soJ3Vub3JkZXJlZF9saXN0Jylcbi8vICAgICAgIHBzZXVkb0Jsb2NrLmNoaWxkcmVuLnB1c2goY2hpbGRSZWZlcmVuY2UpXG4vLyAgICAgICBub2RlLmNoaWxkcmVuLnB1c2gocHNldWRvQmxvY2spXG4vLyAgICAgICBzdGF0ZSA9ICdidWxsZXRlZCdcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGNoaWxkUmVmZXJlbmNlKVxuLy8gICAgICAgc3RhdGUgPSAnbm9ybWFsJ1xuLy8gICAgIH1cbi8vICAgICBicmVha1xuLy8gICB9XG4vLyAgIGRlZmF1bHQ6XG4vLyB9IiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyB0cmFuc2Zvcm1Db2xsZWN0aW9uIH0gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQ29sbGVjdGlvbidcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgYmxvY2tNYXAgZnJvbSAnLi9ibG9jay1tYXAnXG5cbmltcG9ydCB0cmFuc2Zvcm1QYWdlIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVBhZ2UnXG5pbXBvcnQgdHJhbnNmb3JtU3R1YiBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1TdHViJ1xuaW1wb3J0IHRyYW5zZm9ybVRleHQgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtVGV4dCdcbmltcG9ydCB0cmFuc2Zvcm1Ub0RvIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRvRG8nXG5pbXBvcnQgdHJhbnNmb3JtSGVhZGluZyBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1IZWFkaW5nJ1xuaW1wb3J0IHRyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtQnVsbGV0ZWRMaXN0SXRlbSdcbmltcG9ydCB0cmFuc2Zvcm1OdW1iZXJlZExpc3RJdGVtIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybU51bWJlcmVkTGlzdEl0ZW0nXG5pbXBvcnQgdHJhbnNmb3JtRW1iZWQgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRW1iZWQnXG5pbXBvcnQgdHJhbnNmb3JtSW1hZ2UgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtSW1hZ2UnXG5pbXBvcnQgdHJhbnNmb3JtQ2FsbG91dCBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1DYWxsb3V0J1xuaW1wb3J0IHRyYW5zZm9ybURpdmlkZXIgZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRGl2aWRlcidcbmltcG9ydCB0cmFuc2Zvcm1RdW90ZSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1RdW90ZSdcbmltcG9ydCB0cmFuc2Zvcm1Ub2dnbGVMaXN0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVRvZ2dsZUxpc3QnXG5pbXBvcnQgdHJhbnNmb3JtQ29sdW1uIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbHVtbidcbmltcG9ydCB0cmFuc2Zvcm1Db2x1bW5MaXN0IGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUNvbHVtbkxpc3QnXG5pbXBvcnQgdHJhbnNmb3JtRXF1YXRpb24gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtRXF1YXRpb24nXG5pbXBvcnQgdHJhbnNmb3JtQ29kZSBmcm9tICcuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1Db2RlJ1xuaW1wb3J0IHRyYW5zZm9ybUF1ZGlvIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUF1ZGlvJ1xuaW1wb3J0IHRyYW5zZm9ybUJvb2ttYXJrIGZyb20gJy4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUJvb2ttYXJrJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1CbG9jayhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWUsXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8TmFzdC5CbG9jaz4ge1xuXG4gIGxldCBuYXN0Tm9kZVxuXG4gIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgLyoqIE5hc3QuUGFnZSAqL1xuICAgIGNhc2UgYmxvY2tNYXAucGFnZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1QYWdlKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Db2xsZWN0aW9uICovXG4gICAgY2FzZSBibG9ja01hcC5jb2xsZWN0aW9uVmlldzoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2xsZWN0aW9uKG5vZGUsIGFwaUFnZW50KVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSBibG9ja01hcC5jb2xsZWN0aW9uVmlld1BhZ2U6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtQ29sbGVjdGlvbihub2RlLCBhcGlBZ2VudClcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlRleHQgKi9cbiAgICBjYXNlIGJsb2NrTWFwLnRleHQ6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtVGV4dChub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuVG9Eb0xpc3QgKi9cbiAgICBjYXNlIGJsb2NrTWFwLnRvRG86IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtVG9Ebyhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuSGVhZGluZyAqL1xuICAgIGNhc2UgYmxvY2tNYXAuaGVhZGVyOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUhlYWRpbmcobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNhc2UgYmxvY2tNYXAuc3ViSGVhZGVyOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUhlYWRpbmcobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNhc2UgYmxvY2tNYXAuc3ViU3ViSGVhZGVyOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUhlYWRpbmcobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkJ1bGxldGVkTGlzdEl0ZW0gKi9cbiAgICBjYXNlIGJsb2NrTWFwLmJ1bGxldGVkTGlzdDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1CdWxsZXRlZExpc3RJdGVtKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5OdW1iZXJlZExpc3RJdGVtICovXG4gICAgY2FzZSBibG9ja01hcC5udW1iZXJlZExpc3Q6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtTnVtYmVyZWRMaXN0SXRlbShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuVG9nZ2xlTGlzdCAqL1xuICAgIGNhc2UgYmxvY2tNYXAudG9nZ2xlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybVRvZ2dsZUxpc3Qobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LlF1b3RlICovXG4gICAgY2FzZSBibG9ja01hcC5xdW90ZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1RdW90ZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuRGl2aWRlciAqL1xuICAgIGNhc2UgYmxvY2tNYXAuZGl2aWRlcjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1EaXZpZGVyKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5DYWxsb3V0ICovXG4gICAgY2FzZSBibG9ja01hcC5jYWxsb3V0OiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNhbGxvdXQobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkltYWdlICovXG4gICAgY2FzZSBibG9ja01hcC5pbWFnZToge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1JbWFnZShub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuVmlkZW8gKi9cbiAgICBjYXNlIGJsb2NrTWFwLnZpZGVvOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUVtYmVkKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5FbWJlZCAqL1xuICAgIGNhc2UgYmxvY2tNYXAuZW1iZWQ6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtRW1iZWQobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkF1ZGlvICovXG4gICAgY2FzZSBibG9ja01hcC5hdWRpbzoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1BdWRpbyhub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuV2ViQm9va21hcmsgKi9cbiAgICBjYXNlIGJsb2NrTWFwLmJvb2ttYXJrOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUJvb2ttYXJrKG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Db2RlICovXG4gICAgY2FzZSBibG9ja01hcC5jb2RlOiB7XG4gICAgICBuYXN0Tm9kZSA9IHRyYW5zZm9ybUNvZGUobm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIC8qKiBOYXN0LkVxdWF0aW9uICovXG4gICAgY2FzZSBibG9ja01hcC5lcXVhdGlvbjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1FcXVhdGlvbihub2RlKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgLyoqIE5hc3QuQ29sdW1uTGlzdCAqL1xuICAgIGNhc2UgYmxvY2tNYXAuY29sdW1uTGlzdDoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2x1bW5MaXN0KG5vZGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICAvKiogTmFzdC5Db2x1bW4gKi9cbiAgICBjYXNlIGJsb2NrTWFwLmNvbHVtbjoge1xuICAgICAgbmFzdE5vZGUgPSB0cmFuc2Zvcm1Db2x1bW4obm9kZSlcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIG5hc3ROb2RlID0gdHJhbnNmb3JtU3R1Yihub2RlKVxuICAgICAgbG9nKGBVbnN1cHBvcnRlZCBibG9jayB0eXBlOiAke25vZGUudHlwZX1gKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYXN0Tm9kZVxuXG59XG5cbmV4cG9ydCB7XG4gIHRyYW5zZm9ybUJsb2NrXG59IiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQXVkaW8oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQXVkaW8+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdhdWRpbycgYXMgJ2F1ZGlvJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgc291cmNlOiBub2RlLnByb3BlcnRpZXNcbiAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnNvdXJjZVxuICAgICAgICA/IG5vZGUucHJvcGVydGllcy5zb3VyY2VbMF1bMF1cbiAgICAgICAgOiAnIydcbiAgICAgIDogJyMnXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUF1ZGlvIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQm9va21hcmsoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuV2ViQm9va21hcms+IHtcbiAgbGV0IHByb3BzID0gbm9kZS5wcm9wZXJ0aWVzIHx8IHt9XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2Jvb2ttYXJrJyBhcyAnYm9va21hcmsnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBsaW5rOiBwcm9wcy5saW5rID8gcHJvcHMubGlua1swXVswXSA6ICcjJyxcbiAgICB0aXRsZTogcHJvcHMudGl0bGUgPyBwcm9wcy50aXRsZVswXVswXSA6IHVuZGVmaW5lZCxcbiAgICBkZXNjcmlwdGlvbjogcHJvcHMuZGVzY3JpcHRpb24gPyBwcm9wcy5kZXNjcmlwdGlvblswXVswXSA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBmb3JtYXQuYm9va21hcmtfaWNvbixcbiAgICBjb3ZlcjogZm9ybWF0LmJvb2ttYXJrX2NvdmVyLFxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Cb29rbWFyayIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUJ1bGxldGVkTGlzdEl0ZW0oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQnVsbGV0ZWRMaXN0SXRlbT4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2J1bGxldGVkX2xpc3RfaXRlbScgYXMgJ2J1bGxldGVkX2xpc3RfaXRlbScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtQnVsbGV0ZWRMaXN0SXRlbSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSwgZ2V0QmxvY2tJY29uIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQ2FsbG91dChcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5DYWxsb3V0PiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnY2FsbG91dCcgYXMgJ2NhbGxvdXQnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBpY29uOiBnZXRCbG9ja0ljb24obm9kZSksXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1DYWxsb3V0IiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtQ29kZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5Db2RlPiB7XG4gIGxldCBwcm9wcyA9IG5vZGUucHJvcGVydGllcyB8fCB7fVxuICBsZXQgZm9ybWF0ID0gbm9kZS5mb3JtYXQgfHwge31cbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdjb2RlJyBhcyAnY29kZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSksXG4gICAgbGFuZ3VhZ2U6IHByb3BzLmxhbmd1YWdlID8gcHJvcHMubGFuZ3VhZ2VbMF1bMF0gOiB1bmRlZmluZWQsXG4gICAgd3JhcDogdHlwZW9mIGZvcm1hdC5jb2RlX3dyYXAgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGZvcm1hdC5jb2RlX3dyYXAgOiBmYWxzZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Db2RlIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgdHJhbnNmb3JtUGFnZSBmcm9tICcuL3RyYW5zZm9ybVBhZ2UnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbGxlY3Rpb24oXG4gIGNvbGxlY3Rpb25CbG9ja1JlY29yZDogTm90aW9uLkJsb2NrVmFsdWUsXG4gIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8TmFzdC5Db2xsZWN0aW9uPiB7XG5cbiAgLyoqIEJsb2NrIElEICovXG4gIGxldCBpZCA9IGNvbGxlY3Rpb25CbG9ja1JlY29yZC5pZFxuICAvKiogQ29sbGVjdGlvbiBWaWV3IElEcyAqL1xuICBsZXQgdmlld0lkcyA9IGNvbGxlY3Rpb25CbG9ja1JlY29yZFsndmlld19pZHMnXSB8fCBbXVxuICAvKiogQ29sbGVjdGlvbiBJRCAqL1xuICBsZXQgY29sbGVjdGlvbklkID0gY29sbGVjdGlvbkJsb2NrUmVjb3JkWydjb2xsZWN0aW9uX2lkJ10gfHwgJydcblxuICBpZiAoY29sbGVjdGlvbklkLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQmxvY2sgJHtpZH0gaGFzIG5vIGNvbGxlY3Rpb24gSUQuYClcbiAgfVxuXG4gIGlmICh2aWV3SWRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQmxvY2sgJHtpZH0gLSBDb2xsZWN0aW9uICR7Y29sbGVjdGlvbklkfSBoYXMgbm8gdmlldy5gKVxuICB9XG5cbiAgbGV0IHJhd0NvbGxlY3Rpb25WaWV3UmVjb3JkcyA9IGF3YWl0IGdldENvbGxlY3Rpb25WaWV3UmVjb3Jkcyh2aWV3SWRzLCBhcGlBZ2VudClcblxuICBsZXQgcmF3Q29sbGVjdGlvblJlY29yZCA9IGF3YWl0IGdldENvbGxlY3Rpb25SZWNvcmQoY29sbGVjdGlvbklkLCBhcGlBZ2VudClcblxuICAvKipcbiAgICogTWFrZSBxdWVyeSBtYXA6IGNvbGxlY3Rpb25WaWV3SWQgLT4gTm90aW9uLlF1ZXJ5IG9mIHRoZSB2aWV3XG4gICAqL1xuICBsZXQgcXVlcnlNYXA6IE1hcDxzdHJpbmcsIE5vdGlvbi5RdWVyeT4gPSBuZXcgTWFwKClcbiAgcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzLmZvckVhY2goKHJlY29yZDogTm90aW9uLkNvbGxlY3Rpb25WaWV3UmVjb3JkVmFsdWUpOiB2b2lkID0+IHtcbiAgICBsZXQgdmlld0lkID0gcmVjb3JkLnZhbHVlLmlkXG4gICAgbGV0IHF1ZXJ5ID0gcmVjb3JkLnZhbHVlLnF1ZXJ5XG4gICAgcXVlcnlNYXAuc2V0KHZpZXdJZCwgcXVlcnkpXG4gIH0pXG5cbiAgbGV0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcyA9XG4gICAgYXdhaXQgZ2V0UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzKGNvbGxlY3Rpb25JZCwgcXVlcnlNYXAsIGFwaUFnZW50KVxuXG4gIC8qKiBUcmFuc2Zvcm0gdG8gTmFzdCAqL1xuICAvKiogXG4gICAqIENob29zZSBvbmUgb2YgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzIHRvIGdldCBibG9ja3MsIHNpbmNlIFxuICAgKiBvdXIgYGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbmAgaWdub3JlcyBgTm90aW9uLlF1ZXJ5LmZpbHRlcmAsIGFsbCBcbiAgICogcmVzcG9uc2VzIGluY2x1ZGVzIGFsbCBibG9ja3MuXG4gICAqL1xuICAvKiogXG4gICAqIGBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2UucmVjb3JkTWFwLmJsb2NrYCBoYXMgYmxvY2tzIG5vdCBpbiB0aGUgXG4gICAqIGNvbGxlY3Rpb24sIGRvbid0IGtub3cgd2h5LlxuICAgKiBXZSBoYXZlIHRvIHVzZSBgTm90aW9uLlF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlc3VsdC5ibG9ja0lkc2BcbiAgICogdG8gc2VsZWN0IG9ubHkgdGhvc2Ugd2Ugd2FudC5cbiAgICovXG4gIC8qKlxuICAgKiBXZSB3b24ndCBnZXQgdW5kZWZpbmVkIGJlbG93IHNpbmNlIHZpZXdJZHMgZ3VhcmFudGVlIHRoZXJlIGFyZSB2aWV3cy5cbiAgICovXG4gIGxldCByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5nZXQodmlld0lkc1swXSlcbiAgaWYgKCFyYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlIGZvciAke3ZpZXdJZHNbMF19YClcblxuICBsZXQgYmxvY2tSZWNvcmRWYWx1ZU1hcCA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLnJlY29yZE1hcC5ibG9ja1xuICBsZXQgcmVzdWx0QmxvY2tJZHMgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZXN1bHQuYmxvY2tJZHNcbiAgbGV0IG5hc3RDb2xsZWN0aW9uID0ge1xuICAgIGlkLFxuICAgIGNvbGxlY3Rpb25JZCxcbiAgICBjcmVhdGVkVGltZTogY29sbGVjdGlvbkJsb2NrUmVjb3JkLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogY29sbGVjdGlvbkJsb2NrUmVjb3JkLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgLyoqIEljb24gbWF5IGJlIHVuZGVmaW5lZCAqL1xuICAgIGljb246IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWUuaWNvblxuICAgICAgPyByYXdDb2xsZWN0aW9uUmVjb3JkLnZhbHVlLmljb25cbiAgICAgIDogJycsXG4gICAgLyoqIFRTIGNhbm5vdCBhc3NpZ24gc3RyaW5nIHRvICdjb2xsZWN0aW9uJyAqL1xuICAgIHR5cGU6ICdjb2xsZWN0aW9uJyBhcyAnY29sbGVjdGlvbicsXG4gICAgLyoqIE5hbWUgbWF5IGJlIHVuZGVmaW5lZCAqL1xuICAgIG5hbWU6IHJhd0NvbGxlY3Rpb25SZWNvcmQudmFsdWUubmFtZVxuICAgICAgPyByYXdDb2xsZWN0aW9uUmVjb3JkLnZhbHVlLm5hbWVbMF1bMF1cbiAgICAgIDogJ1VudGl0bGVkJyxcbiAgICAvKiogSW4gY2FzZSBzY2hlbWEgaXMgdW5kZWZpbmVkICovXG4gICAgc2NoZW1hOiByYXdDb2xsZWN0aW9uUmVjb3JkLnZhbHVlLnNjaGVtYVxuICAgICAgPyByYXdDb2xsZWN0aW9uUmVjb3JkLnZhbHVlLnNjaGVtYVxuICAgICAgOiB7fSxcbiAgICAvKiogYmxvY2tSZWNvcmRWYWx1ZU1hcFt4XSBpcyBOb3Rpb24uQmxvY2tSZWNvcmRWYWx1ZSAoVGhlIG9uZSB3aXRoIHJvbGUpICovXG4gICAgYmxvY2tzOiBhd2FpdCBQcm9taXNlLmFsbChyZXN1bHRCbG9ja0lkc1xuICAgICAgLm1hcCgoaWQ6IHN0cmluZyk6IFByb21pc2U8TmFzdC5QYWdlPiA9PiB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1QYWdlKGJsb2NrUmVjb3JkVmFsdWVNYXBbaWRdLnZhbHVlKVxuICAgICAgfSkpLFxuICAgIC8qKiBVc2Ugdmlld0lkIHRvIGFjY2VzcyByZWNvcmQgdmFsdWUgbWFwcy4gKi9cbiAgICB2aWV3czogdmlld0lkcy5tYXAoKHZpZXdJZDogc3RyaW5nKTogTmFzdC5Db2xsZWN0aW9uVmlld01ldGFkYXRhID0+IHtcbiAgICAgIGxldCB2aWV3UmVjb3JkID0gcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzXG4gICAgICAgIC5maW5kKCh2aWV3KTogYm9vbGVhbiA9PiB2aWV3LnZhbHVlLmlkID09PSB2aWV3SWQpXG4gICAgICBsZXQgdmlldzogTm90aW9uLkNvbGxlY3Rpb25WaWV3VmFsdWVcbiAgICAgIGxldCByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSA9IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5nZXQodmlld0lkKVxuICAgICAgbGV0IGFnZ3JlZ2F0aW9uUmVzdWx0czogTm90aW9uLkFnZ3JlZ2F0aW9uUmVzdWx0W11cblxuICAgICAgaWYgKHZpZXdSZWNvcmQpIHtcbiAgICAgICAgdmlldyA9IHZpZXdSZWNvcmQudmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmlldyAke3ZpZXdJZH0gZG9lcyBub3QgaGF2ZSBjb2xsZWN0aW9uX3ZpZXcgcmVjb3JkLmApXG4gICAgICB9XG5cbiAgICAgIGlmIChyYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZSkge1xuICAgICAgICBhZ2dyZWdhdGlvblJlc3VsdHMgPSByYXdRdWVyeUNvbGxlY3Rpb25SZXNwb25zZS5yZXN1bHQuYWdncmVnYXRpb25SZXN1bHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZpZXcgJHt2aWV3SWR9IGRvZXMgbm90IGhhdmUgcXVlcnlDb2xsZWN0aW9uIHJlc3BvbnNlLmApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB2aWV3SWQsXG4gICAgICAgIHR5cGU6IHZpZXcudHlwZSxcbiAgICAgICAgbmFtZTogdmlldy5uYW1lLFxuICAgICAgICBxdWVyeTogdmlldy5xdWVyeSxcbiAgICAgICAgZm9ybWF0OiB2aWV3LmZvcm1hdCxcbiAgICAgICAgYWdncmVnYXRlOiAodmlldy5xdWVyeS5hZ2dyZWdhdGUgfHwgW10pXG4gICAgICAgICAgLm1hcCgocHJvcCk6IE5hc3QuQWdncmVnYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgYWdncmVnYXRpb25SZXN1bHQgPSBhZ2dyZWdhdGlvblJlc3VsdHNcbiAgICAgICAgICAgICAgLmZpbmQoKHJlcyk6IGJvb2xlYW4gPT4gcmVzLmlkID09PSBwcm9wLmlkKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb25UeXBlOiBwcm9wLmFnZ3JlZ2F0aW9uX3R5cGUsXG4gICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLnByb3BlcnR5LFxuICAgICAgICAgICAgICB2YWx1ZTogYWdncmVnYXRpb25SZXN1bHRcbiAgICAgICAgICAgICAgICA/IGFnZ3JlZ2F0aW9uUmVzdWx0LnZhbHVlXG4gICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KSxcbiAgICBkZWZhdWx0Vmlld0lkOiB2aWV3SWRzWzBdLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG5cbiAgcmV0dXJuIG5hc3RDb2xsZWN0aW9uXG5cbn1cblxuLyoqIFxuICogR2V0IGNvbGxlY3Rpb24gdmlldyByZWNvcmRzXG4gKiBcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGdldCBOb3Rpb24uUXVlcnkgb2JqZWN0LFxuICogd2hpY2ggY29udGFpbnMgc29ydCwgYWdncmVnYXRlLCBmaWx0ZXJfb3BlcmF0b3IgdGhhdCBhcmUgdXNlZCB0byBkb1xuICogTm90aW9uLkFnZW50LnF1ZXJ5Q29sbGVjdGlvbigpXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb25WaWV3UmVjb3JkcyhcbiAgdmlld0lkczogc3RyaW5nW10sIGFwaUFnZW50OiBOb3Rpb24uQWdlbnRcbik6IFByb21pc2U8Tm90aW9uLkNvbGxlY3Rpb25WaWV3UmVjb3JkVmFsdWVbXT4ge1xuXG4gIGxldCBjb2xsZWN0aW9uVmlld1JlcXVlc3RzID0gdmlld0lkcy5tYXAoKHZpZXdJZDogc3RyaW5nKTogTm90aW9uLlJlY29yZFJlcXVlc3QgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdmlld0lkLFxuICAgICAgdGFibGU6ICdjb2xsZWN0aW9uX3ZpZXcnXG4gICAgfVxuICB9KVxuXG4gIGxldCBhcGlSZXMgPSBhd2FpdCBhcGlBZ2VudC5nZXRSZWNvcmRWYWx1ZXMoY29sbGVjdGlvblZpZXdSZXF1ZXN0cylcbiAgaWYgKGFwaVJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhhcGlSZXMpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsIHRvIGdldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHMuJylcbiAgfVxuXG4gIGxldCByYXdDb2xsZWN0aW9uVmlld1JlY29yZHM6IE5vdGlvbi5Db2xsZWN0aW9uVmlld1JlY29yZFZhbHVlW10gPVxuICAgIGFwaVJlcy5kYXRhLnJlc3VsdHNcblxuICByZXR1cm4gcmF3Q29sbGVjdGlvblZpZXdSZWNvcmRzXG59XG5cbi8qKiBcbiAqIEdldCBjb2xsZWN0aW9uIHJlY29yZFxuICogXG4gKiBPbmUgZGF0YWJhc2Ugb25seSBoYXMgb25lIGNvbGxlY3Rpb24uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxlY3Rpb25SZWNvcmQoXG4gIGNvbGxlY3Rpb25JZDogc3RyaW5nLCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE5vdGlvbi5Db2xsZWN0aW9uUmVjb3JkVmFsdWU+IHtcblxuICBsZXQgY29sbGVjdGlvblJlcXVlc3RzID0gW3tcbiAgICBpZDogY29sbGVjdGlvbklkLFxuICAgIHRhYmxlOiAnY29sbGVjdGlvbidcbiAgfV1cbiAgbGV0IGFwaVJlcyA9IGF3YWl0IGFwaUFnZW50LmdldFJlY29yZFZhbHVlcyhjb2xsZWN0aW9uUmVxdWVzdHMpXG4gIGlmIChhcGlSZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgY29uc29sZS5sb2coYXBpUmVzKVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBnZXQgY29sbGVjdGlvblJlc3BvbnNlcy4nKVxuICB9XG4gIGxldCBjb2xsZWN0aW9uUmVzcG9uc2VzID0gYXBpUmVzLmRhdGEucmVzdWx0c1xuICBsZXQgcmF3Q29sbGVjdGlvblJlY29yZDogTm90aW9uLkNvbGxlY3Rpb25SZWNvcmRWYWx1ZSA9IGNvbGxlY3Rpb25SZXNwb25zZXNbMF1cblxuICByZXR1cm4gcmF3Q29sbGVjdGlvblJlY29yZFxufVxuXG4vKipcbiAqIFF1ZXJ5IGFsbCBlbnRyaWVzIGluIHRoaXMgY29sbGVjdGlvblxuICogXG4gKiBUbyBnZXQgYWxsIGVudHJpZXMsIHdlIG11c3Qgbm90IGZpbHRlciBhbnkgZW50cmllcywgdGhpcyBtZWFuc1xuICogTm90aW9uLlF1ZXJ5LmZpbHRlciBzaG91bGQgYmUgZW1wdHkuIEx1Y2tpbHksIGN1cnJlbnQgTm90aW9uLkFnZW50IFxuICogc2V0IHRoYXQgZW1wdHkgYnkgZGVmYXVsdC5cbiAqIFxuICogVGhlIHF1ZXJ5Q29sbGVjdGlvbiBBUEkgY2FuIGJlIHVzZWQgdG8gcXVlcnkgb25lIGNvbGxlY3Rpb25fdmlldyBhdFxuICogdGhlIHNhbWUgdGltZSwgdGhvdWdoIHdlIGhhdmUgcXVlcmllZCBhbGwgY29sbGVjdGlvbiB2aWV3cyBwcmV2aW91c2x5LCBcbiAqIHdlIHN0aWxsIG5lZWQgdG8gcXVlcnkgdGhlIGFnZ3JlZ2F0aW9uUmVzdWx0cyBmb3IgdGhvc2UgY29sbGVjdGlvblxuICogdmlld3MuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcyhcbiAgY29sbGVjdGlvbklkOiBzdHJpbmcsIHF1ZXJ5TWFwOiBNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnk+LCBhcGlBZ2VudDogTm90aW9uLkFnZW50XG4pOiBQcm9taXNlPE1hcDxzdHJpbmcsIE5vdGlvbi5RdWVyeUNvbGxlY3Rpb25SZXNwb25zZT4+IHtcblxuICBpbnRlcmZhY2UgUmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdCB7XG4gICAgY29sbGVjdGlvbklkOiBzdHJpbmdcbiAgICBjb2xsZWN0aW9uVmlld0lkOiBzdHJpbmdcbiAgICBhZ2dyZWdhdGVRdWVyaWVzOiBOb3Rpb24uQWdncmVnYXRlUXVlcnlbXVxuICB9XG5cbiAgLyoqIE1ha2UgcmVxdWVzdCBvYmplY3RzLiAqL1xuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHM6IFJhd1F1ZXJ5Q29sbGVjdGlvblJlcXVlc3RbXSA9IFtdXG4gIHF1ZXJ5TWFwLmZvckVhY2goKHF1ZXJ5LCB2aWV3SWQpOiB2b2lkID0+IHtcbiAgICByYXdRdWVyeUNvbGxlY3Rpb25SZXF1ZXN0cy5wdXNoKHtcbiAgICAgIGNvbGxlY3Rpb25JZCxcbiAgICAgIGNvbGxlY3Rpb25WaWV3SWQ6IHZpZXdJZCxcbiAgICAgIGFnZ3JlZ2F0ZVF1ZXJpZXM6IHF1ZXJ5LmFnZ3JlZ2F0ZSB8fCBbXVxuICAgIH0pXG4gIH0pXG5cbiAgLyoqIERvIHF1ZXJpZXMgYW5kIHJlY2VpdmUgcmVzcG9uc2VzLiAqL1xuICBsZXQgcmF3UXVlcnlDb2xsZWN0aW9uUmVzcG9uc2VzOiBNYXA8c3RyaW5nLCBOb3Rpb24uUXVlcnlDb2xsZWN0aW9uUmVzcG9uc2U+ID0gbmV3IE1hcCgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHMubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgcmVxID0gcmF3UXVlcnlDb2xsZWN0aW9uUmVxdWVzdHNbaV1cbiAgICBsZXQgcmVzID1cbiAgICAgIGF3YWl0IGFwaUFnZW50LnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgICAgcmVxLmNvbGxlY3Rpb25JZCxcbiAgICAgICAgcmVxLmNvbGxlY3Rpb25WaWV3SWQsXG4gICAgICAgIHJlcS5hZ2dyZWdhdGVRdWVyaWVzKVxuICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWwgdG8gZ2V0IHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlLicpXG4gICAgfVxuICAgIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlcy5zZXQocmVxLmNvbGxlY3Rpb25WaWV3SWQsIHJlcy5kYXRhKVxuICB9XG5cbiAgcmV0dXJuIHJhd1F1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlc1xufVxuXG5leHBvcnQge1xuICB0cmFuc2Zvcm1Db2xsZWN0aW9uLFxuICBnZXRDb2xsZWN0aW9uVmlld1JlY29yZHMsXG4gIGdldENvbGxlY3Rpb25SZWNvcmQsXG4gIGdldFF1ZXJ5Q29sbGVjdGlvblJlc3BvbnNlc1xufSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbHVtbihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5Db2x1bW4+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdjb2x1bW4nIGFzICdjb2x1bW4nLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICByYXRpbzogbm9kZS5mb3JtYXRcbiAgICAgID8gbm9kZS5mb3JtYXQuY29sdW1uX3JhdGlvXG4gICAgICAgID8gbm9kZS5mb3JtYXQuY29sdW1uX3JhdGlvXG4gICAgICAgIDogMVxuICAgICAgOiAxXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUNvbHVtbiIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbHVtbkxpc3QoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuQ29sdW1uTGlzdD4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ2NvbHVtbl9saXN0JyBhcyAnY29sdW1uX2xpc3QnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Db2x1bW5MaXN0IiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtRGl2aWRlcihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5EaXZpZGVyPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnZGl2aWRlcicgYXMgJ2RpdmlkZXInLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1EaXZpZGVyIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtRW1iZWQoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuRW1iZWQ+IHtcbiAgbGV0IGZvcm1hdCA9IG5vZGUuZm9ybWF0IHx8IHt9XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiBub2RlLnR5cGUgPT09ICd2aWRlbydcbiAgICAgID8gJ3ZpZGVvJyBhcyAndmlkZW8nIDogJ2VtYmVkJyBhcyAnZW1iZWQnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB3aWR0aDogZm9ybWF0LmJsb2NrX3dpZHRoIHx8IDk5OTksXG4gICAgc291cmNlOiBmb3JtYXQuZGlzcGxheV9zb3VyY2UgfHwgJyMnLFxuICAgIGZ1bGxXaWR0aDogdHlwZW9mIGZvcm1hdC5ibG9ja19mdWxsX3dpZHRoICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmb3JtYXQuYmxvY2tfZnVsbF93aWR0aCA6IGZhbHNlLFxuICAgIHBhZ2VXaWR0aDogdHlwZW9mIGZvcm1hdC5ibG9ja19wYWdlX3dpZHRoICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBmb3JtYXQuYmxvY2tfcGFnZV93aWR0aCA6IGZhbHNlLFxuICAgIGFzcGVjdFJhdGlvOiBmb3JtYXQuYmxvY2tfYXNwZWN0X3JhdGlvIHx8IDAuNTYyLCAvLyAxNjo5XG4gICAgcHJlc2VydmVTY2FsZTogdHlwZW9mIGZvcm1hdC5ibG9ja19wcmVzZXJ2ZV9zY2FsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX3ByZXNlcnZlX3NjYWxlIDogdHJ1ZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1FbWJlZCIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybUVxdWF0aW9uKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkVxdWF0aW9uPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnZXF1YXRpb24nIGFzICdlcXVhdGlvbicsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGxhdGV4OiBub2RlLnByb3BlcnRpZXNcbiAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlXG4gICAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLnRpdGxlWzBdWzBdXG4gICAgICAgIDogJydcbiAgICAgIDogJydcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtRXF1YXRpb24iLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGJsb2NrTWFwIGZyb20gJy4uL2Jsb2NrLW1hcCdcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtSGVhZGluZyhcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5IZWFkaW5nPiB7XG4gIGxldCBkZXB0aFxuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIGNhc2UgYmxvY2tNYXAuaGVhZGVyOlxuICAgICAgZGVwdGggPSAxXG4gICAgICBicmVha1xuICAgIGNhc2UgYmxvY2tNYXAuc3ViSGVhZGVyOlxuICAgICAgZGVwdGggPSAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBkZXB0aCA9IDNcbiAgfVxuXG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAnaGVhZGluZycgYXMgJ2hlYWRpbmcnLFxuICAgIGNvbG9yOiBnZXRCbG9ja0NvbG9yKG5vZGUpLFxuICAgIGNyZWF0ZWRUaW1lOiBub2RlLmNyZWF0ZWRfdGltZSxcbiAgICBsYXN0RWRpdGVkVGltZTogbm9kZS5sYXN0X2VkaXRlZF90aW1lLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICB0ZXh0OiBnZXRCbG9ja1RpdGxlKG5vZGUpLFxuICAgIGRlcHRoXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybUhlYWRpbmciLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1JbWFnZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5JbWFnZT4ge1xuICBsZXQgZm9ybWF0ID0gbm9kZS5mb3JtYXQgfHwge31cbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICdpbWFnZScgYXMgJ2ltYWdlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgd2lkdGg6IGZvcm1hdC5ibG9ja193aWR0aCB8fCA5OTk5LFxuICAgIHNvdXJjZTogZm9ybWF0LmRpc3BsYXlfc291cmNlIHx8ICcjJyxcbiAgICBmdWxsV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfZnVsbF93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX2Z1bGxfd2lkdGggOiBmYWxzZSxcbiAgICBwYWdlV2lkdGg6IHR5cGVvZiBmb3JtYXQuYmxvY2tfcGFnZV93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LmJsb2NrX3BhZ2Vfd2lkdGggOiBmYWxzZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1JbWFnZSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybU51bWJlcmVkTGlzdEl0ZW0oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuTnVtYmVyZWRMaXN0SXRlbT4ge1xuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ251bWJlcmVkX2xpc3RfaXRlbScgYXMgJ251bWJlcmVkX2xpc3RfaXRlbScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtTnVtYmVyZWRMaXN0SXRlbSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSwgZ2V0QmxvY2tJY29uIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtUGFnZShcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5QYWdlPiB7XG4gIGxldCBmb3JtYXQgPSBub2RlLmZvcm1hdCB8fCB7fVxuICBsZXQgbmFzdE5vZGUgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogJ3BhZ2UnIGFzICdwYWdlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGl0bGU6IGdldEJsb2NrVGl0bGUobm9kZSlbMF0gPyBnZXRCbG9ja1RpdGxlKG5vZGUpWzBdWzBdIDogJycsXG4gICAgaWNvbjogZ2V0QmxvY2tJY29uKG5vZGUpLFxuICAgIGNvdmVyOiBmb3JtYXQucGFnZV9jb3ZlciB8fCB1bmRlZmluZWQsXG4gICAgZnVsbFdpZHRoOiB0eXBlb2YgZm9ybWF0LnBhZ2VfZnVsbF93aWR0aCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZm9ybWF0LnBhZ2VfZnVsbF93aWR0aCA6IGZhbHNlLFxuICAgIGNvdmVyUG9zaXRpb246IGZvcm1hdC5wYWdlX2NvdmVyX3Bvc2l0aW9uIHx8IDFcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtUGFnZSIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVF1b3RlKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LlF1b3RlPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAncXVvdGUnIGFzICdxdW90ZScsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtUXVvdGUiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1TdHViKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LkJsb2NrPiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiBub2RlLnR5cGUsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdXG4gIH1cbiAgcmV0dXJuIG5hc3ROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zZm9ybVN0dWIiLCJpbXBvcnQgeyBOb3Rpb24sIE5hc3QgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9zcmMnXG5cbmltcG9ydCB7IGdldEJsb2NrQ29sb3IsIGdldEJsb2NrVGl0bGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1UZXh0KFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogUHJvbWlzZTxOYXN0LlRleHQ+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICd0ZXh0JyBhcyAndGV4dCcsXG4gICAgY29sb3I6IGdldEJsb2NrQ29sb3Iobm9kZSksXG4gICAgY3JlYXRlZFRpbWU6IG5vZGUuY3JlYXRlZF90aW1lLFxuICAgIGxhc3RFZGl0ZWRUaW1lOiBub2RlLmxhc3RfZWRpdGVkX3RpbWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIHRleHQ6IGdldEJsb2NrVGl0bGUobm9kZSlcbiAgfVxuICByZXR1cm4gbmFzdE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmb3JtVGV4dCIsImltcG9ydCB7IE5vdGlvbiwgTmFzdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3NyYydcblxuaW1wb3J0IHsgZ2V0QmxvY2tDb2xvciwgZ2V0QmxvY2tUaXRsZSB9IGZyb20gJy4vdXRpbHMnXG5cbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybVRvRG8oXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBQcm9taXNlPE5hc3QuVG9Eb0xpc3Q+IHtcbiAgbGV0IG5hc3ROb2RlID0ge1xuICAgIGlkOiBub2RlLmlkLFxuICAgIHR5cGU6ICd0b19kbycgYXMgJ3RvX2RvJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKSxcbiAgICBjaGVja2VkOiBub2RlLnByb3BlcnRpZXNcbiAgICAgID8gbm9kZS5wcm9wZXJ0aWVzLmNoZWNrZWRcbiAgICAgICAgPyBub2RlLnByb3BlcnRpZXMuY2hlY2tlZFswXVswXSA9PT0gJ1llcydcbiAgICAgICAgOiBmYWxzZVxuICAgICAgOiBmYWxzZVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Ub0RvIiwiaW1wb3J0IHsgTm90aW9uLCBOYXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5pbXBvcnQgeyBnZXRCbG9ja0NvbG9yLCBnZXRCbG9ja1RpdGxlIH0gZnJvbSAnLi91dGlscydcblxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtVG9nZ2xlTGlzdChcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IFByb21pc2U8TmFzdC5Ub2dnbGVMaXN0PiB7XG4gIGxldCBuYXN0Tm9kZSA9IHtcbiAgICBpZDogbm9kZS5pZCxcbiAgICB0eXBlOiAndG9nZ2xlJyBhcyAndG9nZ2xlJyxcbiAgICBjb2xvcjogZ2V0QmxvY2tDb2xvcihub2RlKSxcbiAgICBjcmVhdGVkVGltZTogbm9kZS5jcmVhdGVkX3RpbWUsXG4gICAgbGFzdEVkaXRlZFRpbWU6IG5vZGUubGFzdF9lZGl0ZWRfdGltZSxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgdGV4dDogZ2V0QmxvY2tUaXRsZShub2RlKVxuICB9XG4gIHJldHVybiBuYXN0Tm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm1Ub2dnbGVMaXN0IiwiaW1wb3J0IHsgTm90aW9uIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvc3JjJ1xuXG5mdW5jdGlvbiBnZXRCbG9ja0NvbG9yKFxuICBub2RlOiBOb3Rpb24uQmxvY2tWYWx1ZVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgbGV0IGNvbG9yID0gbm9kZS5mb3JtYXRcbiAgICA/IG5vZGUuZm9ybWF0WydibG9ja19jb2xvciddXG4gICAgOiB1bmRlZmluZWRcbiAgcmV0dXJuIGNvbG9yXG59XG5cbmZ1bmN0aW9uIGdldEJsb2NrVGl0bGUoXG4gIG5vZGU6IE5vdGlvbi5CbG9ja1ZhbHVlXG4pOiBOb3Rpb24uU3R5bGVkU3RyaW5nW10ge1xuICBsZXQgdGl0bGUgPSBub2RlLnByb3BlcnRpZXNcbiAgICA/IG5vZGUucHJvcGVydGllcy50aXRsZVxuICAgICAgPyBub2RlLnByb3BlcnRpZXMudGl0bGVcbiAgICAgIDogW10gYXMgTm90aW9uLlN0eWxlZFN0cmluZ1tdXG4gICAgOiBbXSBhcyBOb3Rpb24uU3R5bGVkU3RyaW5nW11cbiAgcmV0dXJuIHRpdGxlXG59XG5cbmZ1bmN0aW9uIGdldEJsb2NrSWNvbihcbiAgbm9kZTogTm90aW9uLkJsb2NrVmFsdWVcbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGxldCBpY29uID0gbm9kZS5mb3JtYXRcbiAgICA/IG5vZGUuZm9ybWF0LnBhZ2VfaWNvblxuICAgIDogdW5kZWZpbmVkXG4gIHJldHVybiBpY29uXG59XG5cbmV4cG9ydCB7XG4gIGdldEJsb2NrQ29sb3IsXG4gIGdldEJsb2NrVGl0bGUsXG4gIGdldEJsb2NrSWNvblxufSIsIm1vZHVsZS5leHBvcnRzID0geyBsb2csIHBhcnNlSlNPTiB9XG5cbi8qKlxuICogV3JhcHBlciBvZiBjb25zb2xlLmxvZygpLlxuICovXG5mdW5jdGlvbiBsb2coKSB7XG4gIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpXG4gIGFyZ3MudW5zaGlmdCgnKG5hc3QtdXRpbC1mcm9tLW5vdGlvbmFwaSknKVxuICBjb25zb2xlLmxvZy5hcHBseShudWxsLCBhcmdzKVxufVxuXG4vKipcbiAqIEZhaWxzYWZlIEpTT04ucGFyc2UoKSB3cmFwcGVyLlxuICogQHBhcmFtIHsqfSBzdHIgLSBQYXlsb2FkIHRvIHBhcnNlLlxuICogQHJldHVybnMge09iamVjdH0gUGFyc2VkIG9iamVjdCB3aGVuIHN1Y2Nlc3MsIHVuZGVmaW5lZCB3aGVuIGZhaWwuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTihzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHZvaWQgMFxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNzZXJ0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=