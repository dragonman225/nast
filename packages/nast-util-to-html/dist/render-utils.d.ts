import Nast from 'notajs-types/nast';
import Notion from 'notajs-types/notion';
/**
 * Render children nodes.
 * @param {Nast.Block[]} nodeArray - Children nodes to render.
 * @param {Function} renderNext - Render controller that will assign a node to
 * a corresponding render function when iterating through nodeArray.
 * @returns {string} HTML.
 */
declare function renderChildren(nodeArray: Nast.Block[], renderNext: Function): string;
/**
 * Render a block.
 * @param {Nast.Block} node The block node itself.
 * @param {string} contentHTML The HTML content inside the block.
 * @param {string} tag The HTML tag to use for the block.
 * @returns {string} HTML
 */
declare function renderBlock(node: Nast.Block, contentHTML: string, tag?: string): string;
/**
 * Render styled strings.
 * @param {Notion.StyledString[]} titleTokens
 * @param {boolean} isCode Whether they should be treated as code.
 * @param {string} lang One of programming languages listed in
 * `render-utils-prismjs.ts`.
 * @returns {string} HTML
 */
declare function renderTitle(titleTokens?: Notion.StyledString[], isCode?: boolean, lang?: string): string;
/**
 * Map color string in NAST to another string that is intended to use
 * as a CSS class.
 * @param {string} str A valid color string in NAST.
 * @returns {string} The CSS class string for the color string.
 */
declare function renderColor(str: string): string;
/**
 * Escape special characters in a string.
 * @param {string} str Unescaped string.
 * @returns {string} Escaped string.
 */
declare function escapeString(str: string): string;
/**
 * Add BulletedList and NumberedList helper blocks to the tree,
 * so it's easier to render.
 * @param treeRoot
 */
declare function preRenderTransform(treeRoot: Nast.Block): Nast.Block;
export { renderChildren, renderBlock, renderTitle, renderColor, escapeString, preRenderTransform };
//# sourceMappingURL=render-utils.d.ts.map