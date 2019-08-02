"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformCollection_1 = require("./transformers/transformCollection");
const utils_1 = require("./utils");
const block_map_1 = __importDefault(require("./block-map"));
const transformPage_1 = __importDefault(require("./transformers/transformPage"));
const transformStub_1 = __importDefault(require("./transformers/transformStub"));
const transformText_1 = __importDefault(require("./transformers/transformText"));
const transformToDo_1 = __importDefault(require("./transformers/transformToDo"));
const transformHeading_1 = __importDefault(require("./transformers/transformHeading"));
const transformBulletedList_1 = __importDefault(require("./transformers/transformBulletedList"));
const transformNumberedList_1 = __importDefault(require("./transformers/transformNumberedList"));
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
        default: {
            nastNode = transformStub_1.default(node);
            utils_1.log(`Unsupported block type: ${node.type}`);
        }
    }
    return nastNode;
}
exports.transformBlock = transformBlock;
