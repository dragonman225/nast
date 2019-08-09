"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_map_1 = __importDefault(require("./block-map"));
const color_map_1 = __importDefault(require("./color-map"));
const render_utils_prismjs_1 = __importDefault(require("./render-utils-prismjs"));
const notion_utils_1 = require("./notion-utils");
const log_utils_1 = require("./log-utils");
const constants_1 = require("./constants");
/**
 * Render children nodes.
 * @param {*} nodeArray - Children nodes to render.
 * @param {*} renderNext - Render controller that will assign a node to
 * a corresponding render function when iterating through nodeArray.
 * @returns {String} HTML.
 */
function renderChildren(nodeArray, renderNext) {
    let childrenHTMLArr = nodeArray.map(node => {
        /** PseudoBlock does not have id! */
        let html = `\
<div ${node.id ? `id="${node.id}"` : ''}>
  ${renderNext(node)}
</div>`;
        return html;
    });
    return childrenHTMLArr.join('');
}
exports.renderChildren = renderChildren;
/**
 * Render a block.
 * @param {Block} node
 * @param {String} contentHTML
 * @returns {String}
 */
function renderBlock(node, contentHTML, tag = 'div') {
    let blockColorClass = node.color ? renderColor(node.color) : '';
    let html = `\
<${tag} class="${constants_1.CSS.blockClass} ${constants_1.CSS.blockClass}--${node.type} ${blockColorClass}">
  ${contentHTML}
</${tag}>`;
    return html;
}
exports.renderBlock = renderBlock;
/**
 * Render styled strings.
 * @param {StyledString[]} titleTokens
 * @returns {String} HTML
 */
function renderTitle(titleTokens = [], isCode, lang) {
    let textArr = titleTokens.map(token => {
        let text = token[0];
        if (isCode) {
            text = render_utils_prismjs_1.default(text, lang);
        }
        else {
            text = escapeString(text);
        }
        let textStyles = token[1];
        let html = text;
        if (textStyles) {
            html = styleToHTML(text, textStyles);
        }
        return html;
    });
    let html = `\
<span>${textArr.join('')}</span>`;
    return html;
}
exports.renderTitle = renderTitle;
/**
 * Render a styled string.
 * @param {String} text
 * @param {TextStyle[]} styles
 * @returns {String} HTML
 */
function styleToHTML(text, styles) {
    let html = text;
    for (let i = styles.length - 1; i >= 0; --i) {
        switch (styles[i][0]) {
            /* Bold */
            case 'b':
                html = `<strong>${html}</strong>`;
                break;
            /* Italic */
            case 'i':
                html = `<em>${html}</em>`;
                break;
            /* Strike */
            case 's':
                html = `<del>${html}</del>`;
                break;
            /* Link */
            case 'a':
                html = `<a href="${notion_utils_1.convertNotionURLToLocalLink(styles[i][1])}">${html}</a>`;
                break;
            /* Inline Code */
            case 'c':
                html = `<code>${html}</code>`;
                break;
            /* Color or Background Color */
            case 'h':
                let color = styles[i][1];
                html = `<span class="${renderColor(color)}">${html}</span>`;
                break;
            /* Inline Mention User */
            case 'u':
                html = `<span class="color-mention">@user_id:${styles[i][1]}</span>`;
                break;
            /* Inline Mention Page */
            case 'p':
                html = `<span class="color-mention">@page_id:${styles[i][1]}</span>`;
                break;
            /* Inline Mention Date */
            case 'd':
                let date = styles[i][1];
                html = `<span class="color-mention">@${date.start_date}</span>`;
                break;
            /* Comment */
            case 'm':
                html = `<span class="color-comment">${html}</span>`;
                break;
            default:
                log_utils_1.raiseWarning(`Unsupported style: ${styles[i][0]}`);
        }
    }
    return html;
}
/**
 * Map color string in NAST to another string that is intended to use
 * as a CSS class.
 * @param {String} str
 * @returns {String}
 */
function renderColor(str) {
    const colorPrefix = constants_1.CSS.colorClassPrefix;
    const colorBgPrefix = constants_1.CSS.bgColorClassPrefix;
    switch (str) {
        case color_map_1.default.gray:
            return colorPrefix + 'gray';
        case color_map_1.default.brown:
            return colorPrefix + 'brown';
        case color_map_1.default.orange:
            return colorPrefix + 'orange';
        case color_map_1.default.yellow:
            return colorPrefix + 'yellow';
        case color_map_1.default.green:
            return colorPrefix + 'green';
        case color_map_1.default.blue:
            return colorPrefix + 'blue';
        case color_map_1.default.purple:
            return colorPrefix + 'purple';
        case color_map_1.default.pink:
            return colorPrefix + 'pink';
        case color_map_1.default.red:
            return colorPrefix + 'red';
        case color_map_1.default.grayBg:
            return colorBgPrefix + 'gray';
        case color_map_1.default.brownBg:
            return colorBgPrefix + 'brown';
        case color_map_1.default.orangeBg:
            return colorBgPrefix + 'orange';
        case color_map_1.default.yellowBg:
            return colorBgPrefix + 'yellow';
        case color_map_1.default.greenBg:
            return colorBgPrefix + 'green';
        case color_map_1.default.blueBg:
            return colorBgPrefix + 'blue';
        case color_map_1.default.purpleBg:
            return colorBgPrefix + 'purple';
        case color_map_1.default.pinkBg:
            return colorBgPrefix + 'pink';
        case color_map_1.default.redBg:
            return colorBgPrefix + 'red';
        default:
            return str;
    }
}
exports.renderColor = renderColor;
/**
 * Escape special characters in a string.
 * @param {String} str
 * @returns {String}
 */
function escapeString(str) {
    let character, escapedString = '';
    for (let i = 0; i < str.length; ++i) {
        character = str.charAt(i);
        switch (character) {
            case '<':
                escapedString += '&lt;';
                break;
            case '>':
                escapedString += '&gt;';
                break;
            case '&':
                escapedString += '&amp;';
                break;
            case '/':
                escapedString += '&#x2F;';
                break;
            case '"':
                escapedString += '&quot;';
                break;
            case '\'':
                escapedString += '&#x27;';
                break;
            default:
                escapedString += character;
        }
    }
    return escapedString;
}
exports.escapeString = escapeString;
/**
 * Add BulletedList and NumberedList helper blocks to the tree,
 * so it's easier to render.
 * @param treeRoot
 */
function preRenderTransform(treeRoot) {
    let newChildren = [];
    let children = treeRoot.children;
    let list, prevState = 0;
    /**
     * State
     * normal: 0, bulleted: 1, numbered: 2
     */
    for (let i = 0; i < children.length; ++i) {
        let block = children[i];
        /**
         * Fill helper blocks with dummy property values to make
         * the new tree meet the NAST spec.
         */
        let dummyBlock = {
            id: '',
            createdTime: 0,
            lastEditedTime: 0
        };
        if (block.children.length !== 0) {
            block = preRenderTransform(block);
        }
        if (block.type === block_map_1.default.bulletedListItem) {
            if (prevState === 1) {
                if (list != null)
                    list.children.push(block);
                else
                    log_utils_1.raiseWarning(`preRenderTransform panic:\
 Push child ${block.id} to undefined list`);
            }
            else {
                list = {
                    type: block_map_1.default.bulletedList,
                    children: [block],
                    ...dummyBlock
                };
                newChildren.push(list);
            }
            prevState = 1;
        }
        else if (block.type === block_map_1.default.numberedListItem) {
            if (prevState === 2) {
                if (list != null)
                    list.children.push(block);
                else
                    log_utils_1.raiseWarning(`preRenderTransform panic:\
 Push child ${block.id} to undefined list`);
            }
            else {
                list = {
                    type: block_map_1.default.numberedList,
                    children: [block],
                    ...dummyBlock
                };
                newChildren.push(list);
            }
            prevState = 2;
        }
        else {
            newChildren.push(block);
            prevState = 0;
        }
    }
    let newTree = { ...treeRoot };
    newTree.children = newChildren;
    return newTree;
}
exports.preRenderTransform = preRenderTransform;
//# sourceMappingURL=render-utils.js.map