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
const transformBulletedListItem_1 = __importDefault(require("./transformers/transformBulletedListItem"));
const transformNumberedListItem_1 = __importDefault(require("./transformers/transformNumberedListItem"));
const transformEmbed_1 = __importDefault(require("./transformers/transformEmbed"));
const transformImage_1 = __importDefault(require("./transformers/transformImage"));
const transformCallout_1 = __importDefault(require("./transformers/transformCallout"));
const transformDivider_1 = __importDefault(require("./transformers/transformDivider"));
const transformQuote_1 = __importDefault(require("./transformers/transformQuote"));
const transformToggleList_1 = __importDefault(require("./transformers/transformToggleList"));
const transformColumn_1 = __importDefault(require("./transformers/transformColumn"));
const transformColumnList_1 = __importDefault(require("./transformers/transformColumnList"));
const transformEquation_1 = __importDefault(require("./transformers/transformEquation"));
const transformCode_1 = __importDefault(require("./transformers/transformCode"));
const transformAudio_1 = __importDefault(require("./transformers/transformAudio"));
const transformBookmark_1 = __importDefault(require("./transformers/transformBookmark"));
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
//# sourceMappingURL=transformBlock.js.map