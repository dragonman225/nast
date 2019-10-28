"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const render_utils_prismjs_1 = __importDefault(require("./render-utils-prismjs"));
const notion_utils_1 = require("./notion-utils");
const log_utils_1 = require("./log-utils");
const constants_2 = require("./constants");
/**
 * Render children nodes.
 * @param {Nast.Block[]} nodeArray - Children nodes to render.
 * @param {Function} renderNext - Render controller that will assign a node to
 * a corresponding render function when iterating through nodeArray.
 * @returns {string} HTML.
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
 * @param {Nast.Block} node The block node itself.
 * @param {string} contentHTML The HTML content inside the block.
 * @param {string} tag The HTML tag to use for the block.
 * @returns {string} HTML
 */
function renderBlock(node, contentHTML, tag = 'div') {
    let blockColorClass = node.color ? renderColor(node.color) : '';
    let html = `\
<${tag} class="${constants_2.CSS.blockClass} ${constants_2.CSS.blockClass}--${node.type} ${blockColorClass}">
  ${contentHTML}
</${tag}>`;
    return html;
}
exports.renderBlock = renderBlock;
/**
 * Render styled strings.
 * @param {Notion.StyledString[]} titleTokens
 * @param {boolean} isCode Whether they should be treated as code.
 * @param {string} lang One of programming languages listed in
 * `render-utils-prismjs.ts`.
 * @returns {string} HTML
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
<span style="white-space: pre-wrap;">${textArr.join('')}</span>`;
    return html;
}
exports.renderTitle = renderTitle;
/**
 * Render a styled string.
 * @param {string} text
 * @param {Notion.TextStyle[]} styles Styles to be applied on the text.
 * @returns {string} HTML
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
                html = `<a href="${notion_utils_1.getBookmarkLinkFromNotionPageURL(styles[i][1])}">${html}</a>`;
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
 * @param {string} str A valid color string in NAST.
 * @returns {string} The CSS class string for the color string.
 */
function renderColor(str) {
    const colorPrefix = constants_2.CSS.colorClassPrefix;
    const colorBgPrefix = constants_2.CSS.bgColorClassPrefix;
    switch (str) {
        case constants_1.COLOR.gray:
            return colorPrefix + 'gray';
        case constants_1.COLOR.brown:
            return colorPrefix + 'brown';
        case constants_1.COLOR.orange:
            return colorPrefix + 'orange';
        case constants_1.COLOR.yellow:
            return colorPrefix + 'yellow';
        case constants_1.COLOR.green:
            return colorPrefix + 'green';
        case constants_1.COLOR.blue:
            return colorPrefix + 'blue';
        case constants_1.COLOR.purple:
            return colorPrefix + 'purple';
        case constants_1.COLOR.pink:
            return colorPrefix + 'pink';
        case constants_1.COLOR.red:
            return colorPrefix + 'red';
        case constants_1.COLOR.grayBg:
            return colorBgPrefix + 'gray';
        case constants_1.COLOR.brownBg:
            return colorBgPrefix + 'brown';
        case constants_1.COLOR.orangeBg:
            return colorBgPrefix + 'orange';
        case constants_1.COLOR.yellowBg:
            return colorBgPrefix + 'yellow';
        case constants_1.COLOR.greenBg:
            return colorBgPrefix + 'green';
        case constants_1.COLOR.blueBg:
            return colorBgPrefix + 'blue';
        case constants_1.COLOR.purpleBg:
            return colorBgPrefix + 'purple';
        case constants_1.COLOR.pinkBg:
            return colorBgPrefix + 'pink';
        case constants_1.COLOR.redBg:
            return colorBgPrefix + 'red';
        default:
            return str;
    }
}
exports.renderColor = renderColor;
/**
 * Escape special characters in a string.
 * @param {string} str Unescaped string.
 * @returns {string} Escaped string.
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
        if (block.type === constants_1.NAST_BLOCK_TYPES.bulletedListItem) {
            if (prevState === 1) {
                if (list != null)
                    list.children.push(block);
                else
                    log_utils_1.raiseWarning(`preRenderTransform panic:\
 Push child ${block.id} to undefined list`);
            }
            else {
                list = {
                    type: constants_1.NAST_BLOCK_TYPES.bulletedList,
                    children: [block],
                    ...dummyBlock
                };
                newChildren.push(list);
            }
            prevState = 1;
        }
        else if (block.type === constants_1.NAST_BLOCK_TYPES.numberedListItem) {
            if (prevState === 2) {
                if (list != null)
                    list.children.push(block);
                else
                    log_utils_1.raiseWarning(`preRenderTransform panic:\
 Push child ${block.id} to undefined list`);
            }
            else {
                list = {
                    type: constants_1.NAST_BLOCK_TYPES.numberedList,
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